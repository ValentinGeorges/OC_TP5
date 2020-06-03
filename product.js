// Récupère l'ID produit indiqué dans la fenêtre
let urlProduct = window.location.search.substr(4);

// Affiche le produit sélectionné auparavant
let productsElt = document.getElementById("products");

fetch("http://localhost:3000/api/teddies/" + urlProduct)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine le texte dans la response
      response.json().then(function(data) {
        // Création et ajout des éléments de l'article
        let articleElt = document.createElement("article");
        let imageElt = document.createElement("img");
        imageElt.src = data.imageUrl;
        let pLabel = document.createElement("p");
        let label = document.createElement("label");
        label.textContent = "Couleur : ";
        label.setAttribute("for", "color");
        let select = document.createElement("select");
        select.setAttribute("name", "color");
        select.setAttribute("id", "color");
        let option = document.createElement("option");
        const colors = data.colors;
        colors.forEach(function (color) {
            let option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });
        pLabel.appendChild(label);
        pLabel.appendChild(select);
        let nameElt = document.createElement("h2");
        nameElt.textContent = data.name;
        let priceElt = document.createElement("p");
        priceElt.textContent = data.price/100 + " €";
        let buttonAdd = document.createElement("a");
        buttonAdd.setAttribute("id", "btnAddToCart");
        buttonAdd.textContent = "Ajouter au panier";
        articleElt.appendChild(imageElt);
        articleElt.appendChild(pLabel);
        articleElt.appendChild(nameElt);
        articleElt.appendChild(priceElt);
        articleElt.appendChild(buttonAdd);
        productsElt.appendChild(articleElt);


        // Ajout du produit dans la panier avec les infos
        buttonAdd.addEventListener("click", () => {
          event.preventDefault();
          let selectedColor = document.getElementById("color");

          const infosTeddy = {
            "id": data._id,
            "imageUrl": data.imageUrl,
            "name": data.name,
            "price": data.price/100,
            "colors": selectedColor.options[selectedColor.selectedIndex].text
          };

          const cart = JSON.parse(localStorage.getItem('key')) || [];
          cart.push(infosTeddy);
          localStorage.setItem('key', JSON.stringify(cart));
          window.open("panier.html", "_self");
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });