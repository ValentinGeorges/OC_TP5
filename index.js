let teddiesElt = document.getElementById("articles");
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    let teddies = JSON.parse(reponse);
    teddies.forEach(function (teddy) {
        // Création d'une balise article par articles
        let articlesElt = document.createElement("article");
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
        seeArticleElt.setAttribute("href", "product.html?id=" + teddy._id);
        articlesElt.appendChild(imageElt);
        articlesElt.appendChild(nameElt);
        articlesElt.appendChild(prixElt);
        articlesElt.appendChild(seeArticleElt);
        teddiesElt.appendChild(articlesElt);
    });
});