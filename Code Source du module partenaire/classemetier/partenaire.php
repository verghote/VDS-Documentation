<?php

/**
 * Classe regroupant toutes les méthodes utilisables dans l'ensemble des modules du site
 */
class Partenaire extends Table
{
    const DIR = RACINE . "/data/partenaire/";

    public function __construct()
    {
        // appel du contructeur de la classe parent
        parent::__construct('partenaire');

        // le nom du partenaire doit être renseigné
        // Lettres, lettres accentuées, chiffres séparés éventuellement par un espace, une apostrophe ou un tiret
        // contenir entre 3 et 50 caractères
        $input = new InputText();
        $input->Pattern = "^[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ](?:[' \-]?[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])*$";
        $input->MinLength = 3;
        $input->MaxLength = 50;
        $this->columns['nom'] = $input;

        // url du partenaire
        $input = new InputUrl();
        $input->Require = true;
        $input->VerifierExistence = true;
        $this->columns['url'] = $input;

        // fichier : nom du fichier image représentant le logo du partenaire
        // la valeur est alimentée par celle de l'objet InputFile
        $lesParametres = require RACINE . '/.config/partenaire.php';
        $input = new InputFileImg($lesParametres);
        $input->Directory = self::DIR;
        $this->columns['fichier'] = $input;
      

        // Définition des colonnes pouvant être modifiée unitairement
        $this->listOfColumns->Values = ['nom', 'url', 'fichier'];
    }


    public static function getAll()
    {
        $sql = "Select id, nom, url, fichier from partenaire;";
        $select = new Select();
        $lesLignes = $select->getRows($sql);
        // vérification de l'existence de l'image et solution au problème de non rafraichissement du cache
        $nb = count($lesLignes);
        for ($i = 0; $i < $nb; $i++) {
            $nomFichier = $lesLignes[$i]['fichier'];
            if (file_exists(self::DIR . $nomFichier)) {
                $lesLignes[$i]['present'] = 1;
                $lesLignes[$i]['src'] = "$nomFichier?v=" . filemtime(self::DIR . $nomFichier);
            } else {
                $lesLignes[$i]['present'] = 0;
            }
        }
        return $lesLignes;
    }

    /**
     * Retourne les informations sur le partenaire dont l'id est passé en paramètre
     *
     * @param int $id L'id du partenaire
     * @return array | null
     */
    public static function getById($id)
    {
        // récupération des informations sur l'étudiant
        $sql = <<<EOD
            SELECT id, nom, url, fichier
            FROM partenaire
            Where id = :id
EOD;
        $select = new Select();
        return $select->getRow($sql, ['id' => $id]);
    }

    // ------------------------------------------------------------------------------------------------
    // Méthodes relatives aux opérations de mise à jour
    // ------------------------------------------------------------------------------------------------

    // mise à jour du champ fichier
    public static function modifierLogo(int $id, $nomFichier): void
    {
        $sql = <<<EOD
            update partenaire
            set fichier = :nomFichier
            where id = :id
EOD;
        $db = Database::getInstance();
        $curseur = $db->prepare($sql);
        $curseur->bindValue('id', $id);
        $curseur->bindValue('nomFichier', $nomFichier);
        $curseur->execute();
    }
}
