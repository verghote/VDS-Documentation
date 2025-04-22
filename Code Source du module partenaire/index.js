"use strict";

/* global prochaineEdition, lesPartenaires*/


let contenuCadreInformation = document.getElementById('contenuCadreInformation');
let detailClassement = document.getElementById('detailClassement');
let detailProchaineEdition = document.getElementById('detailProchaineEdition');
let detailPartenaire = document.getElementById('detailPartenaire');
let dateEpreuve = document.getElementById('dateEpreuve');
let descriptionEpreuve = document.getElementById('descriptionEpreuve');
let documentPublic = document.getElementById('documentPublic');
let document4Saisons = document.getElementById('document4Saisons');
let documentClub = document.getElementById('documentClub');
let contenuCadreMembre = document.getElementById('contenuCadreMembre');

// les informations


// affichage de la prochaine épreuve
dateEpreuve.innerText = prochaineEdition.dateFr;
descriptionEpreuve.innerHTML = prochaineEdition.description;
// affichage de la période d'inscription
if (prochaineEdition.dateJour <= prochaineEdition.dateFermeture) {
    let a = document.createElement('a');
    a.href = prochaineEdition.urlInscription;
    a.innerText = "S'inscrire";
    a.classList.add('m-1', 'btn', 'btn-danger', 'text-center');
    detailProchaineEdition.appendChild(a);
    a = document.createElement('a');
    a.href = prochaineEdition.urlInscrit;
    a.innerText = "Voir les inscrits";
    a.classList.add('m-1', 'btn', 'btn-danger', 'text-center');
    detailProchaineEdition.appendChild(a);
} else {
    let a = document.createElement('a');
    a.href = prochaineEdition.urlInscrit;
    a.innerText = "Voir les inscrits";
    a.classList.add('m-1', 'btn', 'btn-danger', 'text-center');
    detailProchaineEdition.appendChild(a);
}


// affichage des documents dans les différentes cadres en fonction de leur type (Public, 4 saisons, Club)


// afficher les documents réservés aux membres



// affichage des liens vers les partenaires
for (const element of lesPartenaires) {
    if (element.present === 1) {
        let a = document.createElement('a');
        a.href = element.url;
        a.target = "lien";
        let img = document.createElement('img');
        img.src = "/data/partenaire/" + element.src;
        img.classList.add('logo');
        img.title = element.nom;
        img.style.maxHeight = '80px';
        a.appendChild(img);
        detailPartenaire.appendChild(a);
    }
}



