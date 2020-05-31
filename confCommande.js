// Récupération du contenu du localStorage
const arrayLocalStorage = JSON.parse(localStorage.getItem("order"));

// Récupération de la balise section
let sectionConfCommande = document.getElementById("confCommande");

// Création d'un article contenant toutes les infos
let articlesElt = document.createElement("article");
let paraPrix = document.createElement("p");
paraPrix.textContent = "Merci pour votre commande de : " + arrayLocalStorage.prixTotal + " € d'oursons en peluches faits à la main.";
let paraId = document.createElement("p");
paraId.textContent = "Votre commande a été enregistrée et porte le numéro d'identification : ";
let paraId2 = document.createElement("p");
paraId2.textContent = arrayLocalStorage.orderId;
paraId2.style.fontWeight = "bold";
let paraThanks = document.createElement("p");
paraThanks.textContent = "Nous vous prions d'utiliser ce numéro dans toutes vos requêtes concernant cette commande.";
let btnBackToIndex = document.createElement("a");
btnBackToIndex.textContent = "Retour à l'accueil";
btnBackToIndex.href = "index.html";
articlesElt.appendChild(paraPrix);
articlesElt.appendChild(paraId);
articlesElt.appendChild(paraId2);
articlesElt.appendChild(paraThanks);
articlesElt.appendChild(btnBackToIndex);
sectionConfCommande.appendChild(articlesElt);

// Suppression du localStorage lors du clic sur "retour à l'accueil"
btnBackToIndex.addEventListener("click", () => {
    localStorage.clear();
});
