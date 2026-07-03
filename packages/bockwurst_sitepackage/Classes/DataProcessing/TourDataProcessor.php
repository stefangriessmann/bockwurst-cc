<?php

declare(strict_types=1);

namespace Bockwurst\Sitepackage\DataProcessing;

use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * Liest die aus Strava beschafften Tourdaten (data/touren/<strava-id>.json) und
 * stellt sie den Tour-CEs (Tour-Stats, Tour-Map) als Fluid-Variablen bereit.
 *
 * Bewusst nah am Core: ein einziger, wiederverwendbarer DataProcessor, keine
 * Extbase-Domäne, kein eigenes Record-Modell (siehe UMSETZUNGS-KONZEPT.md §5).
 */
final class TourDataProcessor implements DataProcessorInterface
{
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ): array {
        $stravaId = (string)($processedData['data']['tx_bockwurst_strava_id'] ?? '');
        // Nur Ziffern zulassen – schützt vor Path-Traversal beim Dateizugriff.
        $stravaId = preg_replace('/\D+/', '', $stravaId) ?? '';

        $processedData['tour'] = null;
        $processedData['tourError'] = null;
        $processedData['tourMapDataJson'] = '{}';

        if ($stravaId === '') {
            $processedData['tourError'] = 'Keine Strava-Activity-ID gesetzt.';
            return $processedData;
        }

        $file = Environment::getPublicPath() . '/data/touren/' . $stravaId . '.json';
        if (!is_file($file)) {
            $processedData['tourError'] = 'Keine Tourdatei gefunden: data/touren/' . $stravaId . '.json';
            return $processedData;
        }

        $tour = json_decode((string)file_get_contents($file), true);
        if (!is_array($tour)) {
            $processedData['tourError'] = 'Tourdatei ist kein gültiges JSON: ' . $stravaId . '.json';
            return $processedData;
        }

        $processedData['tour'] = $tour;

        // Kompaktes JSON nur mit dem, was die Karte/das Höhenprofil im Frontend braucht.
        $route = $tour['route'] ?? [];
        $elevation = $tour['elevation'] ?? null;
        $distanceKm = $elevation['distance_km'] ?? [];
        $processedData['tourMapDataJson'] = json_encode([
            'name' => $tour['display_name'] ?? '',
            'route' => $route,
            'start' => $route[0] ?? null,
            'elevation' => $elevation,
            'totalKm' => is_array($distanceKm) && $distanceKm !== [] ? end($distanceKm) : ($tour['stats']['distance_km'] ?? null),
            'elevationGain' => $tour['stats']['elevation_gain_m'] ?? null,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?: '{}';

        return $processedData;
    }
}
