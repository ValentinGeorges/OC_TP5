// Récupération des données stockées dans le localStorage
let teddiesInCart = JSON.parse(localStorage.getItem("key"));

// Récupération du contenu du localStorage
const arrayLocalStorage = JSON.parse(localStorage.getItem("key"));

if (arrayLocalStorage == null) {
    // Affichage du message du panier vide
    let blocPage = document.getElementById("bloc-panier");
    let infosPanel = document.createElement("p");
    infosPanel.textContent = "Votre panier est vide, veuillez ajouter un produit !";
    blocPage.appendChild(infosPanel);
    
} else {
    // Boucle pour afficher tous les produits dans le panier
    let teddiesElt = document.getElementById("panier");
    teddiesInCart.forEach(function(key) {
        // Création d'une balise article par articles
        let articlesElt = document.createElement("article");
        // Ajout du titre et du contenu de chaque article
        let imageDiv = document.createElement("div");
        let imageElt = document.createElement("img");
        imageElt.src = key.imageUrl;
        let infosDiv = document.createElement("div");
        let nameElt = document.createElement("h2");
        nameElt.textContent = key.name;
        let numberOfArticles = document.createElement("p");
        let compteurArticles = 1;
        numberOfArticles.innerHTML = "Nbr d'articles : " + compteurArticles;
        let prixTotalElt = document.createElement("p");
        prixTotalElt.textContent = "Prix total : " + key.price*compteurArticles + " €";
        let buttonsDiv = document.createElement("div");
        let buttonAdd = document.createElement("button");
        buttonAdd.textContent = "Ajouter un article";
        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Supprimer un article";
        buttonRemove.setAttribute("class", "buttonsDelete");
        imageDiv.appendChild(imageElt);
        articlesElt.appendChild(imageDiv);
        infosDiv.appendChild(nameElt);
        infosDiv.appendChild(numberOfArticles);
        infosDiv.appendChild(prixTotalElt);
        articlesElt.appendChild(infosDiv);
        buttonsDiv.appendChild(buttonAdd);
        buttonsDiv.appendChild(buttonRemove);
        articlesElt.appendChild(buttonsDiv);
        teddiesElt.appendChild(articlesElt);
    });
        // Ajout du prix total de la commmande
        let prixTotalCommande = 0;
        for (let i = 0; i<arrayLocalStorage.length; i++) {
            prixTotalCommande += arrayLocalStorage[i].price;
        };
        let prixCommandePanel = document.createElement("p");
        prixCommandePanel.textContent ="Total de votre commande : " + prixTotalCommande + " €";
        prixCommandePanel.setAttribute("id", "prixTotalCommande");
        teddiesElt.appendChild(prixCommandePanel);

        // Création du bouton pour vider le panier
        let buttonDeleteCart = document.createElement("button");
        buttonDeleteCart.textContent = "Vider le panier";
        buttonDeleteCart.setAttribute("id", "buttonDeleteCart");
        teddiesElt.appendChild(buttonDeleteCart);
        buttonDeleteCart.addEventListener("click", () => {
            event.preventDefault();
            localStorage.clear();
            location.reload();
        });
        // Apparition du formulaire de commande
        let commandePanel = document.getElementById("commande");
        commandePanel.style.visibility = "visible";
};

/*
// Récupération du contenu du localStorage
const arrayLocalStorage = JSON.parse(localStorage.getItem("key"));

// Création d'un array contenant tous les produits affichés sur la page "Panier"
const fullCart = [...document.getElementsByTagName("article")];

// Création d'un array contenant les boutons "Supprimer" de chaque produit
const buttonsDelete = [...document.getElementsByClassName("buttonsDelete")];
    
for(let i = 0; i < fullCart.length; i++) {
// Récupération et stockage dans des variables de l'ID et de la couleur du produit à supprimer
        const id = fullCart[i].dataset.id;
        const color = fullCart[i].dataset.color;

        for(let n = 0; n < arrayLocalStorage.length; n++) {
            if(arrayLocalStorage[n].id == id && arrayLocalStorage[n].color == color) {
                let deleteIndex = n;

                buttonsDelete[i].addEventListener("click", () => {
                // On retire l'index du produit à supprimer
                arrayLocalStorage.splice(deleteIndex, 1);
        
                // Puis on renvoie le panier mis à jour au localStorage
                localStorage.setItem("key", JSON.stringify(arrayLocalStorage));
                });
            
        };
    };
};
*/