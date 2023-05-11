// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("../../product.json");
const products = await reponse.json();

const article = products[0];
const imageUrlElement = document.createElement("img");
imageUrlElement.src = article.imageUrl;
const productNameElement = document.createElement("h3");
productNameElement.innerText = article.name;
const productDescriptionElement = document.createElement("p");
productDescriptionElement.innerText = article.description;


const sectionFiches = document.querySelector(".items");
sectionFiches.appendChild(imageUrlElement);
sectionFiches.appendChild(productNameElement);
sectionFiches.appendChild(productDescriptionElement);