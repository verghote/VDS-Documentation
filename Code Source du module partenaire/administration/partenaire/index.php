<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès


// génération d'un token pour garantir l'origine des appels vers les autres scripts du module


// chargement des données



$head =<<<EOD
<script >

</script>
EOD;

// chargement interface
require RACINE . '/include/interface.php';


