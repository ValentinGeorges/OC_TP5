let furnituresElt = document.getElementById("article");
ajaxGet("http://localhost:3000/api/furniture", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    let furnitures = JSON.parse(reponse);
    furnitures.forEach(function (furniture) {
        // Ajout du titre et du contenu de chaque article
        let nameElt = document.createElement("h2");
        nameElt.textContent = furniture.name;
        let descriptionElt = document.createElement("p");
        descriptionElt.textContent = furniture.description;
        furnituresElt.appendChild(nameElt);
        furnituresElt.appendChild(descriptionElt);
    });
});