// Récupère l'ID produit indiqué dans la fenêtre
let urlProduct = window.location.search.substr(4);

// Affiche le produit sélectionné auparavant
let productsElt = document.getElementById("products");
ajaxGet("http://localhost:3000/api/teddies/" + urlProduct, function (reponse) {
    // Transforme la réponse en un tableau d'articles
    let teddy = JSON.parse(reponse);
    let articleElt = document.createElement("article");
    let imageElt = document.createElement("img");
    imageElt.src = teddy.imageUrl;
    let pLabel = document.createElement("p");
    let label = document.createElement("label");
    label.textContent = "Couleur : ";
    label.setAttribute("for", "color");
    let select = document.createElement("select");
    select.setAttribute("name", "color");
    select.setAttribute("id", "color");
    const colors = teddy.colors;
    colors.forEach(function (color) {
        let option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        select.appendChild(option);
    });
    pLabel.appendChild(label);
    pLabel.appendChild(select);
    let nameElt = document.createElement("h2");
    nameElt.textContent = teddy.name;
    let priceElt = document.createElement("p");
    priceElt.textContent = teddy.price/100 + " €";
    let buttonAdd = document.createElement("button");
    buttonAdd.setAttribute("id", "btnAddToCart");
    buttonAdd.textContent = "Ajouter au panier";
    buttonAdd.setAttribute("onclick", "window.location='panier.html'")
    articleElt.appendChild(imageElt);
    articleElt.appendChild(pLabel);
    articleElt.appendChild(nameElt);
    articleElt.appendChild(priceElt);
    articleElt.appendChild(buttonAdd);
    productsElt.appendChild(articleElt);

    // Création de la variable contenant les infos du produit
    const infosTeddy = {
        "id": teddy._id,
        "imageUrl": teddy.imageUrl,
        "name": teddy.name,
        "price": teddy.price/100,
        "colors": color // TROUVER COMMENT CHOPER LA BONNE VALEUR !
      };
    
    // Récupération des informations du produit pour les mettre en localStorage
    let btnAdd = document.getElementById("btnAddToCart");
    
    btnAdd.addEventListener("click", () => {
        event.preventDefault();
        const cart = JSON.parse(localStorage.getItem('key')) || [];
        cart.push(infosTeddy);
        localStorage.setItem('key', JSON.stringify(cart));
      })
      
});