<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// chargement des données

// Prochaine édition des 4 saisons
$prochaineEdition = json_encode(Epreuve::getProchaineEpreuve());

// récupération des informations : astuce si membre connecté % permet de voir toutes les informations (donc ajout des informations privées)


// les logos des partenaires
$lesPartenaires = json_encode(Partenaire::getAll());

// récupération des documents consultables par tous


// transmission des données à l'interface
$head = <<<EOD
    <script>

        let lesPartenaires = $lesPartenaires;

    </script>
EOD;



// chargement de l'interface
require RACINE . "/include/interface.php";


