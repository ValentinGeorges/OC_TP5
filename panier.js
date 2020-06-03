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
    arrayLocalStorage.forEach(function(key) {
        // Création d'une balise article par articles
        let articlesElt = document.createElement("article");
        // Ajout du titre et du contenu de chaque article
        let imageDiv = document.createElement("div");
        let imageElt = document.createElement("img");
        imageElt.src = key.imageUrl;
        let infosDiv = document.createElement("div");
        let nameElt = document.createElement("h2");
        nameElt.textContent = key.name;
        let colorElt = document.createElement("p");
        colorElt.textContent = key.colors;
        colorElt.style.fontStyle = "italic";
        let numberOfArticles = document.createElement("p");
        let compteurArticles = 1;
        let prixTotalElt = document.createElement("p");
        prixTotalElt.textContent = "Prix : " + key.price*compteurArticles + " €";
        let buttonsDiv = document.createElement("div");
        let buttonAdd = document.createElement("button");
        /* buttonAdd.textContent = "Ajouter un article";
        buttonAdd.setAttribute("class", "buttonsAdd");
        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Supprimer un article";
        buttonRemove.setAttribute("class", "buttonsDelete"); */
        imageDiv.appendChild(imageElt);
        articlesElt.appendChild(imageDiv);
        infosDiv.appendChild(nameElt);
        infosDiv.appendChild(colorElt);
        infosDiv.appendChild(numberOfArticles);
        infosDiv.appendChild(prixTotalElt);
        articlesElt.appendChild(infosDiv);
        /* buttonsDiv.appendChild(buttonAdd);
        buttonsDiv.appendChild(buttonRemove);
        articlesElt.appendChild(buttonsDiv); */
        teddiesElt.appendChild(articlesElt);

        if (compteurArticles <= 1) {
            numberOfArticles.textContent = compteurArticles + " article";
        } else {
            numberOfArticles.textContent = compteurArticles + " articles";
        };
    });
        let infosArticles = document.getElementById("infosArticles");

        // Ajout du prix total de la commande
        let prixTotalCommande = 0;
        for (let i = 0; i<arrayLocalStorage.length; i++) {
            prixTotalCommande += arrayLocalStorage[i].price;
        };
        let prixCommandePanel = document.createElement("p");
        prixCommandePanel.textContent ="Total de votre commande : " + prixTotalCommande + " €";
        prixCommandePanel.setAttribute("id", "prixTotalCommande");
        infosArticles.appendChild(prixCommandePanel);

        // Création du bouton pour vider le panier
        let buttonDeleteCart = document.createElement("a");
        buttonDeleteCart.textContent = "Vider le panier";
        buttonDeleteCart.setAttribute("id", "buttonDeleteCart");
        infosArticles.appendChild(buttonDeleteCart);
        buttonDeleteCart.addEventListener("click", () => {
            event.preventDefault();
            localStorage.clear();
            location.reload();
        });

        // Apparition du formulaire de commande
        let commandePanel = document.getElementById("commande");
        commandePanel.style.visibility = "visible";

        // Event lors du click sur "COnfirmer la commande"
        let submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", () => {

            event.preventDefault();

            // Récupération des input du formulaire
            let firstName = document.getElementById('firstName');
            let lastName = document.getElementById('lastName');
            let address = document.getElementById('address');
            let city = document.getElementById('city');
            let email = document.getElementById('email');

            // Création d'une regex pour les champs
            let regexText = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
            let regexLocation = /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
            let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let isValid = true;


            // Vérification que le formulaire est correctement rempli
            if (!regexText.test(firstName.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Merci d'indiquer votre nom avant de confirmer votre commande",
                }) 
                isValid = false;
            } 
            else if (!regexText.test(lastName.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Merci d'indiquer votre prénom avant de confirmer votre commande",
                })
                isValid = false;
            } 
            else if (!regexLocation.test(address.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Merci d'indiquer votre adresse avant de confirmer votre commande.",
                })
                isValid = false;
            } 
            else if (!regexLocation.test(city.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Merci d'indiquer votre ville avant de confirmer votre commande.",
                })
                isValid = false;
            } 
            else if (!regexEmail.test(email.value)) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Merci d'indiquer votre email complet avant de confirmer votre commande.",
                })
                isValid = false;
                console.log(isValid);
            } else if (isValid) {
                // Les champs sont validés, on récupère les id des produits
                const products = [];
                for (let i = 0; i<arrayLocalStorage.length; i++) {
                    let product = arrayLocalStorage[i].id;
                    products.push(product);
                };

                // Ensuite on créez l'objet contact contenant toutes les infos
                const contact = {
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "address": address.value,
                    "city": city.value,
                    "email": email.value
                  };

                // Et on envoie les infos au serveur
                fetch("http://localhost:3000/api/teddies/order", {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({contact, products})
                    })
                    .then(
                        function(response) {
                            if (response.status >= 200 || response.status <= 299) {
                            // Examine the text in the response
                            response.json().then(function(data) {
                            // Stockage des données de la commande
                            const orderInfos = {
                                "orderId" : data.orderId,
                                "prixTotal" : prixTotalCommande
                            };
                            localStorage.setItem("order", JSON.stringify(orderInfos));
                            window.open("confCommande.html", "_self");
                            });
                            }
                    
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                            return;
                            }
                    )
                    .catch(function(err) {
                        console.log('Fetch Error :-S', err);
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: "Une erreur est survenue lors de l'enregistrement de votre commande, veuillez réessayer.",
                })
            };
        });
};

/*

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