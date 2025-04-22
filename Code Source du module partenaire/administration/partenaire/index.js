"use strict";

import {
    verifier,
    afficherErreur,
    fichierValide,
    confirmer, afficherErreurSaisie, afficherSucces
} from "https://verghote.github.io/composant/fonction.js";

// variable globale
/* global lesPartenaires, lesParametres, token */

// id du partenaire en cours de modification
let idPartenaire;

// conserver le nom du fichier à remplacer
let nomFichier;

const listePartenaires = document.getElementById('listePartenaires');
const fichier = document.getElementById('fichier');

// traitement du champ file associé aux modifications de photos
fichier.onchange = function () {
    if (this.files.length > 0) {
        controlerFichier(this.files[0]);
    }
};

afficher();

/**
 * Affichage des coordfonées des étudiants et de leur photo dans des cadres
 * Utilisation de balises input pour permettre la modification des coordonnées
 */
function afficher() {
    listePartenaires.innerHTML = '';
    const row = document.createElement('div');
    row.classList.add('row');
   
   
        const col = document.createElement('div');
        col.classList.add('col-xl-4', 'col-lg-6', 'col-md-6', 'col-sm-12', 'col-12');
        const carte = document.createElement('div');
        carte.classList.add('card', 'mb-3');

        // génération de l'entête : comprenant une icone pour supprimer le partenaire 
        const entete = document.createElement('div');
        entete.classList.add('card-header', 'bg-text-center', 'd-flex', 'justify-content-around');
   
        // ajout de l'icône de suppression en haut à droite du cadre : déclenche l'appel de la fonction supprimer si confirmation
        let i = document.createElement('i');
        i.classList.add('bi', 'bi-x', 'text-danger', 'float-end', 'fs-2');
        i.title = 'Supprimer  le partenaire';


   
        carte.appendChild(entete);

        // génération du corps de la carte : comprenant 2 balises input pour le nom et l'url
        const corps = document.createElement('div');
        corps.classList.add('card-body', 'p-3', 'd-flex', 'flex-column', 'align-items-center');

        // ajout d'une balise input pour la modification du nom
        const inputNom = document.createElement('input');
        inputNom.classList.add('form-control');




        inputNom.pattern = '^[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ](?:[\' \\-]?[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])*$';
        
		
		
		
        corps.appendChild(inputNom);

        // ajout d'uine balise imput pour la modification de l'url
        const inputUrl = document.createElement('input');
        inputUrl.classList.add('form-control', "mt-2");
       
	   
	   
	   
        corps.appendChild(inputUrl);

        // Ajout de la zone d'upload
        let div = document.createElement('div');

        div.classList.add('upload');
        div.style.width = '200px';
        div.style.weight = '200px';
        // Si la photo existe on la place dans la zone
        
		
		
        // définition des événements pour gérer le téléversement et le glisser déposer
        div.onclick = function () {
            
			
        };
        div.ondragover = function (e) {
            
			
        };
        div.ondrop = function (e) {
           
		   
		   
        };
        corps.appendChild(div);
        carte.appendChild(corps);
        col.appendChild(carte);
        row.appendChild(col);
        listePartenaires.appendChild(row);
    }
}

function modifierColonne(colonne, input, id) {
    $.ajax({
       
        success: data => {
            if (data.success) {
                
				
            } else if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur("Erreur système détectée, contacter l'administrateur du site");
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

/**
 * Suppression du partenaire dans la table partenaire et suppression du fichier associé dans le répertoire data/partenaire
 * @param id  identifiant du partenaire à supprimer
 */
function supprimer(id) {
    $.ajax({
        
		
		
		
        success: data => {
            if (data.success) {
                // Mise à jour de l'interface : on retire le partenaire dans la liste et on relance l'affichage
             
            } else if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur("Erreur système détectée, contacter l'administrateur du site");
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


function controlerFichier(file) {
    // définition des contraintes sur le fichier téléversé
    const controle = {
        taille: lesParametres.maxSize,
        lesExtensions: lesParametres.extensions,
    };
    if (!fichierValide(file, controle)) {
        afficherErreur(controle.reponse);
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
            afficherErreur(msg);
            return false;
        } else {
            remplacer(file, img);
        }
    };
    // si l'image n'est pas chargée (cas d'un fichier non image)
    img.onerror = function () {
        afficherErreur("Il ne s'agit pas d'un fichier image");
    };
}

/**
 * @param   {object} file objet de type file contenant l'image à contrôler
 * @param   {object} img objet de type image contenant l'image à afficher
 */
function remplacer(file, img) {
    const monFormulaire = new FormData();
    monFormulaire.append('fichier', file);
    monFormulaire.append('id', idPartenaire);
    monFormulaire.append('token', token);
    $.ajax({
        url: 'photo/remplacer.php',
        type: 'POST',
        data: monFormulaire,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                // on place la nouvelle photo dans le cadre cible correspondant
                const cible = document.getElementById('photo' + idPartenaire);
                cible.innerHTML = '';
                cible.appendChild(img);
            } else if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur("Erreur système détectée, contacter l'administrateur du site");
                    } else if (key === 'global') {
                        afficherErreur(message);
                    } else {
                        afficherErreurSaisie(key, message);
                    }
                }
            }
        },
        error: (reponse) => {
            console.log(reponse.responseText);
        }
    });
}




