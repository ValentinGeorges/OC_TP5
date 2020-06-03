fetch("http://localhost:3000/api/teddies")
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine le texte dans la réponse
      response.json().then(function(data) {
        // Parcours les données pour créer un article par index
        data.forEach(function (teddy) {
            let teddiesElt = document.getElementById("articles"); // Récupération de la balise "articles"
            let articlesElt = document.createElement("article"); // Création d'une balise article par articles
            // Ajout du titre et du contenu de chaque article
            let nameElt = document.createElement("h2");
            nameElt.textContent = teddy.name;
            let imageElt = document.createElement("img");
            imageElt.src = teddy.imageUrl;
            let prixElt = document.createElement("p");
            prixElt.textContent = teddy.price/100 + " €";
            let seeArticleElt = document.createElement("a");
            seeArticleElt.textContent = "Voir l'article";
            seeArticleElt.setAttribute("class", "btnProduct");
            seeArticleElt.setAttribute("data-id", teddy._id);
            seeArticleElt.setAttribute("href", "product.html?id=" + teddy._id); // Ouvrir la page de l'article
            articlesElt.appendChild(imageElt);
            articlesElt.appendChild(nameElt);
            articlesElt.appendChild(prixElt);
            articlesElt.appendChild(seeArticleElt);
            teddiesElt.appendChild(articlesElt);
            });
        });
      })

  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });