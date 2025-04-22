<?php
// paramètres de l'upload
return [
    'repertoire' => '/data/partenaire/',
    'extensions' => ["jpg", "png", "webp", "avif"],
    'types' => ["image/pjpeg", "image/jpeg", "x-png", "image/png", "image/webp", "image/avif"],
    'maxSize' => 150 * 1024,
    'require' => true,
    'rename' => false,
    'sansAccent' => true,
    'redimensionner' => false,
    'height' => 150,
    'width' => 300,
    'accept' => '.jpg, .png, .webp, .avif'
];
