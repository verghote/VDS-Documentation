"use strict";

import {
    afficherErreur,
    afficherErreurSaisie,
    configurerFormulaire,
    donneesValides,
    effacerLesErreurs,
    fichierValide,
    filtrerLaSaisie,
    retournerVers,
} from "https://verghote.github.io/composant/fonction.js";

/* global lesParametres, token */

// variable globale

// fichier téléversé
let leFichier = null;

// récupération des élements sur l'interface
const fichier = document.getElementById('fichier');
const nomFichier = document.getElementById('nomFichier');
const cible = document.getElementById('cible');
const btnAjouter = document.getElementById('btnAjouter');

const nom = document.getElementById('nom');
const url = document.getElementById('url');

// procédures événementielles

// Déclencher le clic sur le champ de type file lors d'un clic dans la zone cible
cible.onclick = () => fichier.click();

// // ajout du glisser déposer dans la zone cible
cible.ondragover = (e) => e.preventDefault();
cible.ondrop = (e) => {
    e.preventDefault();
    controlerFichier(e.dataTransfer.files[0]);
};

// Lancer la fonction controlerFichier si un fichier a été sélectionné dans l'explorateur
fichier.onchange = () => {
    if (fichier.files.length > 0) {
        controlerFichier(fichier.files[0]);
    }
};

btnAjouter.onclick = () => {
    effacerLesErreurs();
    if (leFichier === null) {
        afficherErreurSaisie('fichier', 'Veuillez sélectionner ou faire glisser un fichier pdf');
    }
    if (donneesValides() && leFichier !== null) {
        ajouter();
    }
};

// controle des données
configurerFormulaire();
filtrerLaSaisie('nom', /[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]/);
nom.focus();

// traitements associés au champ prenom
filtrerLaSaisie('url', /[A-Za-z0-9-_/]/);


/**
 * Contrôle le fichier sélectionné au niveau de son extension et de sa taille
 * @param file {object} fichier à ajouter
 */
function controlerFichier(file) {
    // mise en forme de l'interface
    afficherErreurSaisie('fichier', '');
    leFichier = null;
    nomFichier.innerText = '';
    cible.innerHTML = "";
    // définition des contraintes sur le fichier téléversé
    const controle = {
        taille: lesParametres.maxSize,
        lesExtensions: lesParametres.extensions,
    };
    if (!fichierValide(file, controle)) {
        afficherErreurSaisie('fichier', controle.reponse);
        return false;
    }
    // vérification des dimensions
    // création d'un objet image
    let img = new Image();
    // chargement de l'image
    img.src = window.URL.createObjectURL(file);
    // il faut attendre que l'image soit chargée pour effectuer les contrôles
    img.onload = function () {
        if (img.width > lesParametres.width || img.height > lesParametres.height) {
            let msg = "Les dimensions de l'image (" + img.width + " * " + img.height + ") dépassent les dimensions autorisées (" + lesParametres.width + " * " + lesParametres.height + ")";
            afficherErreurSaisie('fichier', msg);
        } else {
            nomFichier.innerText = file.name;
            leFichier = file;
            cible.appendChild(img);
        }
    };
    // si l'image n'est pas chargée (cas d'un fichier non image)
    img.onerror = function () {
        afficherErreurSaisie('fichier', "Il ne s'agit pas d'un fichier image");
    };
}

/**
 * Demande d'ajout d'un lien
 * Le logo est obligatoire
 */
function ajouter() {
    let monFormulaire = new FormData();
    monFormulaire.append('table', 'partenaire');
    monFormulaire.append('fichier', leFichier);
    monFormulaire.append('nom', nom.value);
    monFormulaire.append('url', url.value);
    monFormulaire.append('token', token);
    $.ajax({
        url: '/ajax/ajouter.php',
        method: 'POST',
        async: false,
        data: monFormulaire,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: (data) => {
            if (data.success) {
                retournerVers("Partenaire ajouté", '.');
            } else {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        afficherErreur(message);
                    } else {
                        afficherErreurSaisie(key, message);
                    }
                }
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}

