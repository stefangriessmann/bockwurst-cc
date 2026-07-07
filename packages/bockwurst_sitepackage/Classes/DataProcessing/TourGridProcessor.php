<?php

declare(strict_types=1);

namespace Bockwurst\Sitepackage\DataProcessing;

use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Domain\Repository\PageRepository;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * Baut das Touren-Raster der Startseite: listet die Kind-Seiten der aktuellen
 * Seite, die eine Strava-Activity-ID tragen (= Tour-Detailseiten), und reichert
 * jede um die kompakten Kartendaten aus data/touren/<strava-id>.json an
 * (Titel, Region, km, Schwierigkeit, Video-Marker, Hero-Bild).
 *
 * Bewusst nah am Core: PageRepository::getMenu() respektiert Enable-Fields,
 * Zugriff und Sprach-Overlay; kein eigenes Record-Modell (siehe
 * UMSETZUNGS-KONZEPT.md §4, „kuratiertes Touren-Grid" aus den Tour-Seiten).
 */
final class TourGridProcessor implements DataProcessorInterface
{
    private const DIFFICULTY_MODIFIER = [
        'leicht' => 'leicht',
        'mittel' => 'mittel',
        'schwer' => 'schwer',
    ];

    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ): array {
        $as = (string)($processorConfiguration['as'] ?? 'tourGrid');
        $processedData[$as] = [];

        // Elternseite, deren Tour-Kinder gelistet werden. Standard: aktuelle
        // Seite (Startseite listet ihre Tour-Kinder). Für die Touren-Übersicht
        // wird per TypoScript parentPage = Startseite gesetzt (die Tour-Seiten
        // sind dort Geschwister der Übersicht).
        $pageUid = (int)($processorConfiguration['parentPage'] ?? 0);
        if ($pageUid === 0) {
            $pageUid = (int)($processedData['data']['uid'] ?? 0);
        }
        if ($pageUid === 0) {
            return $processedData;
        }

        $pageRepository = GeneralUtility::makeInstance(PageRepository::class);

        $tours = [];
        foreach ($pageRepository->getMenu($pageUid) as $page) {
            $stravaId = preg_replace('/\D+/', '', (string)($page['tx_bockwurst_strava_id'] ?? '')) ?? '';
            if ($stravaId === '') {
                continue;
            }

            $tour = $this->readTour($stravaId);
            $stats = $tour['stats'] ?? [];
            $difficulty = trim((string)($tour['difficulty'] ?? ''));

            $tours[] = [
                'uid' => (int)$page['uid'],
                'title' => (string)($page['nav_title'] ?: $page['title']),
                'region' => (string)($tour['region'] ?? ''),
                'distanceKm' => isset($stats['distance_km']) ? (int)round((float)$stats['distance_km']) : null,
                'difficulty' => $difficulty,
                'difficultyModifier' => self::DIFFICULTY_MODIFIER[mb_strtolower($difficulty)] ?? 'mittel',
                'hasVideo' => trim((string)($tour['youtube_id'] ?? '')) !== '',
                'image' => $this->safeImagePath((string)($tour['hero_image'] ?? '')),
            ];
        }

        $processedData[$as] = $tours;
        return $processedData;
    }

    /**
     * Liest die Tour-JSON; fehlt sie oder ist sie ungültig, wird die Karte
     * trotzdem (mit Seiten-Titel, ohne Stats) gerendert.
     */
    private function readTour(string $stravaId): array
    {
        $file = Environment::getPublicPath() . '/data/touren/' . $stravaId . '.json';
        if (!is_file($file)) {
            return [];
        }
        $tour = json_decode((string)file_get_contents($file), true);
        return is_array($tour) ? $tour : [];
    }

    /**
     * Nur website-relative Bildpfade zulassen (die JSON stammt aus unserem
     * eigenen Fetch, aber wir geben nur eindeutig lokale Pfade als <img src> aus).
     */
    private function safeImagePath(string $path): ?string
    {
        $path = trim($path);
        return str_starts_with($path, '/fileadmin/') ? $path : null;
    }
}
