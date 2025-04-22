<?php
// remplacer le fichier pdf associé à un document

// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Vérification du jeton
Jeton::verifier();

// vérification de la transmission des données attendues
if (!Std::existe('id') || !isset($_FILES['fichier'])) {
    Erreur::envoyerReponse('Tous les paramètres attendus ne sont pas transmis', 'global');
}

// récupération des données
$id = trim($_POST['id']);

// Récupération des paramètres du téléversement
$lesParametres = require RACINE . '/.config/partenaire.php';

// instanciation et paramétrage d'un objet InputFile
$file = new InputFileImg($lesParametres);
$file->Directory = RACINE . $lesParametres['repertoire'];

// contrôle de l'objet $file
if (!$file->checkValidity()) {
    Erreur::envoyerReponse($file->getValidationMessage(), 'global');
}

// contrôle de l'identifiant du partenaire : renseigné avec un format conforme
if (empty($id)) {
    Erreur::envoyerReponse("L'identifiant du partenaire n'est pas renseigné" , 'global');
} elseif (!preg_match("/^[0-9]{1,2}$/", $id)) {
    Erreur::envoyerReponse("L'identifiant du partenaire n'est pas valide : $id ", 'global');
}

// vérifier l'existence du partenaire
$ligne = Partenaire::getById($id);
if (!$ligne) {
    Erreur::envoyerReponse("Le partenaire $id n'existe pas", 'global');
}

// suppression de l'ancien logo
@unlink($file->Directory  . $ligne['fichier']);

// copie du nouveau logo
if (!$file->copy()) {
    Erreur::envoyerReponse('Une erreur inattendue est survenue lors de la copie du logo');
}

Partenaire::modifierLogo($id, $file->Value);

// réponse du serveur
echo json_encode(['success' => "La nouveau logo a été enregistré"]);
