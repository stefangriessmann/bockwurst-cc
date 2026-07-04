<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

(static function (): void {
    $table = 'tt_content';

    // ------------------------------------------------------------------
    // Feld: Strava-Activity-ID (Redakteur setzt sie je Tour-CE; der Rest
    // kommt aus data/touren/<ID>.json über den TourDataProcessor).
    // ------------------------------------------------------------------
    $GLOBALS['TCA'][$table]['columns']['tx_bockwurst_strava_id'] = [
        'label' => 'Strava-Activity-ID',
        'description' => 'Numerische Strava-Aktivitäts-ID. Die Tourdaten (Stats, Route, Höhenprofil) werden aus data/touren/<ID>.json gelesen.',
        'config' => [
            'type' => 'input',
            'size' => 20,
            'max' => 32,
            'eval' => 'trim',
            'placeholder' => 'z. B. 18715623879',
        ],
    ];

    // Eigene Gruppe im CType-Auswahlfeld / Wizard.
    $GLOBALS['TCA'][$table]['columns']['CType']['config']['itemGroups']['bockwurst'] = 'bockwurst.cc';

    // ------------------------------------------------------------------
    // Zwei Content-Element-Typen registrieren.
    // ------------------------------------------------------------------
    ExtensionManagementUtility::addTcaSelectItem($table, 'CType', [
        'label' => 'Tour: Highlights entlang der Strecke',
        'description' => 'Karten mit km-Marke, Titel und Kurztext (aus der Tour-JSON, Feld „highlights"). Direkt unter dem Hero.',
        'value' => 'bockwurst_tourhighlights',
        'icon' => 'content-bullets',
        'group' => 'bockwurst',
    ]);

    ExtensionManagementUtility::addTcaSelectItem($table, 'CType', [
        'label' => 'Tour: Eckdaten (Strava)',
        'description' => 'Stat-Leiste: Distanz, Höhenmeter, Fahrzeit, Ø-Tempo, Leistung – automatisch aus den Strava-Daten.',
        'value' => 'bockwurst_tourstats',
        'icon' => 'content-text',
        'group' => 'bockwurst',
    ]);

    ExtensionManagementUtility::addTcaSelectItem($table, 'CType', [
        'label' => 'Tour: Karte + Höhenprofil (Strava)',
        'description' => 'Leaflet-Streckenkarte und Höhenprofil – automatisch aus den Strava-Daten.',
        'value' => 'bockwurst_tourmap',
        'icon' => 'content-image',
        'group' => 'bockwurst',
    ]);

    ExtensionManagementUtility::addTcaSelectItem($table, 'CType', [
        'label' => 'Tour: Video (YouTube, Click-to-Load)',
        'description' => 'Video-Vorschau; lädt das youtube-nocookie-Embed erst auf Klick (kein Drittabruf vorher). YouTube-ID aus den Strava-Tourdaten.',
        'value' => 'bockwurst_tourvideo',
        'icon' => 'content-media',
        'group' => 'bockwurst',
    ]);

    ExtensionManagementUtility::addTcaSelectItem($table, 'CType', [
        'label' => 'Tour: Soundtrack (Spotify, Click-to-Load)',
        'description' => 'Soundtrack-Karte; lädt den Spotify-Player erst auf Klick (kein Drittabruf vorher). Playlist-ID aus den Tourdaten.',
        'value' => 'bockwurst_toursound',
        'icon' => 'content-audio',
        'group' => 'bockwurst',
    ]);

    ExtensionManagementUtility::addTcaSelectItem($table, 'CType', [
        'label' => 'Tour: Galerie (Fotos + Lightbox)',
        'description' => 'Bildergalerie mit Lightbox und Bildunterschriften (aus der Tour-JSON, Feld „gallery"). Fotos liegen in fileadmin.',
        'value' => 'bockwurst_tourgallery',
        'icon' => 'content-image',
        'group' => 'bockwurst',
    ]);

    $showitem = '--palette--;;general,'
        . 'header;Überschrift (optional),'
        . 'tx_bockwurst_strava_id,'
        . '--div--;Erscheinungsbild,'
        . '--palette--;;frames,--palette--;;appearanceLinks,'
        . '--div--;Zugriff,'
        . '--palette--;;hidden,--palette--;;access';

    $GLOBALS['TCA'][$table]['types']['bockwurst_tourhighlights']['showitem'] = $showitem;
    $GLOBALS['TCA'][$table]['types']['bockwurst_tourstats']['showitem'] = $showitem;
    $GLOBALS['TCA'][$table]['types']['bockwurst_tourmap']['showitem'] = $showitem;
    $GLOBALS['TCA'][$table]['types']['bockwurst_tourvideo']['showitem'] = $showitem;
    $GLOBALS['TCA'][$table]['types']['bockwurst_toursound']['showitem'] = $showitem;
    $GLOBALS['TCA'][$table]['types']['bockwurst_tourgallery']['showitem'] = $showitem;

    // Typ-Icons im Backend.
    $GLOBALS['TCA'][$table]['ctrl']['typeicon_classes']['bockwurst_tourhighlights'] = 'content-bullets';
    $GLOBALS['TCA'][$table]['ctrl']['typeicon_classes']['bockwurst_tourstats'] = 'content-text';
    $GLOBALS['TCA'][$table]['ctrl']['typeicon_classes']['bockwurst_tourmap'] = 'content-image';
    $GLOBALS['TCA'][$table]['ctrl']['typeicon_classes']['bockwurst_tourvideo'] = 'content-media';
    $GLOBALS['TCA'][$table]['ctrl']['typeicon_classes']['bockwurst_toursound'] = 'content-audio';
    $GLOBALS['TCA'][$table]['ctrl']['typeicon_classes']['bockwurst_tourgallery'] = 'content-image';
})();
