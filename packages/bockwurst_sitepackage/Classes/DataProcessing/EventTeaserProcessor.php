<?php

declare(strict_types=1);

namespace Bockwurst\Sitepackage\DataProcessing;

use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * Liefert den Event-Teaser der Startseite: die nächsten kommenden Termine aus
 * dem kleinen Snapshot data/events/upcoming.json (aus dem Event-Guide-Bestand).
 *
 * Render-seitig wird nochmals auf „ab heute" gefiltert – so werden nie
 * vergangene Events gezeigt, und der Snapshot degradiert sauber (weniger
 * Karten), bis er neu erzeugt wird. Bewusst nah am Core: ein DataProcessor,
 * kein eigenes Record-Modell (analog TourGridProcessor).
 */
final class EventTeaserProcessor implements DataProcessorInterface
{
    private const MONTHS_DE = [
        1 => 'Jan', 2 => 'Feb', 3 => 'Mrz', 4 => 'Apr', 5 => 'Mai', 6 => 'Jun',
        7 => 'Jul', 8 => 'Aug', 9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Dez',
    ];
    private const SPORTS = ['rad', 'tri', 'lauf', 'swim'];

    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ): array {
        $as = (string)($processorConfiguration['as'] ?? 'eventTeaser');
        $limit = (int)($processorConfiguration['limit'] ?? 5);
        $processedData[$as] = [];

        $file = Environment::getPublicPath() . '/data/events/upcoming.json';
        if (!is_file($file)) {
            return $processedData;
        }
        $events = json_decode((string)file_get_contents($file), true);
        if (!is_array($events)) {
            return $processedData;
        }

        $today = date('Y-m-d');
        $cards = [];
        foreach ($events as $e) {
            $iso = (string)($e['date_iso'] ?? '');
            if ($iso === '' || $iso < $today) {
                continue;
            }
            $ts = strtotime($iso);
            $month = $ts ? (int)date('n', $ts) : 0;
            $sport = (string)($e['sport'] ?? '');

            $cards[] = [
                'day' => $ts ? date('d', $ts) : '',
                'month' => self::MONTHS_DE[$month] ?? '',
                'title' => (string)($e['titel'] ?? ''),
                'ort' => (string)($e['ort'] ?? ''),
                'lv' => (string)($e['lv'] ?? ''),
                'art' => (string)($e['art'] ?? ''),
                'sport' => in_array($sport, self::SPORTS, true) ? $sport : 'rad',
                'km' => is_numeric($e['km'] ?? null) ? (int)round((float)$e['km']) : null,
            ];
            if (count($cards) >= $limit) {
                break;
            }
        }

        $processedData[$as] = $cards;
        return $processedData;
    }
}
