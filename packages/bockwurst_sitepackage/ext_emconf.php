<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'bockwurst.cc Sitepackage',
    'description' => 'bockwurst brand theme on top of Bootstrap Package (TYPO3 v14).',
    'category' => 'templates',
    'author' => 'Stefan Grießmann',
    'author_email' => 'stefan.griessmann@web.de',
    'state' => 'beta',
    'version' => '0.1.0',
    'constraints' => [
        'depends' => [
            'typo3' => '14.3.0-14.99.99',
            'bootstrap_package' => '16.0.0-16.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
