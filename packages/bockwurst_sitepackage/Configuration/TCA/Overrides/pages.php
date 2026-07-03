<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

(static function (): void {
    // Strava-Activity-ID als Seiteneigenschaft der Tour-Detailseite.
    // Speist Hero, JSON-LD und (per Fallback) die Tour-CEs aus data/touren/<ID>.json.
    $GLOBALS['TCA']['pages']['columns']['tx_bockwurst_strava_id'] = [
        'label' => 'Strava-Activity-ID (Tour)',
        'description' => 'Numerische Strava-Aktivitäts-ID dieser Tour. Speist Hero + strukturierte Daten; Tourdaten aus data/touren/<ID>.json.',
        'config' => [
            'type' => 'input',
            'size' => 20,
            'max' => 32,
            'eval' => 'trim',
            'placeholder' => 'z. B. 18715623879',
        ],
    ];

    ExtensionManagementUtility::addToAllTCAtypes(
        'pages',
        'tx_bockwurst_strava_id',
        '',
        'after:subtitle'
    );
})();
