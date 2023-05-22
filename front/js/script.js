// Récupération des produits depuis le fichier JSON
fetch("/js/product.json")
    .then(response => response.json())
    .then(products => {
    

    for (let i = 0; i < products.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les items
        const sectionFiches = document.querySelector(".items");
        // Création d'un lien pour chaque produit
        const linkElement = document.createElement("a");
        // Direction du lien
        linkElement.href = "/html/product.html";
        // Création d’une balise dédiée à un produit
        const productsElement = document.createElement("article");
        // On crée l’élément img.
        const imageUrlElement = document.createElement("img");
        // On accède à l’indice i de la liste products pour configurer la source de l’image.
        imageUrlElement.src = products[i].imageUrl;
        // Idem pour le nom et la description...
        const productNameElement = document.createElement("h3")
        productNameElement.innerText = products[i].name;
        const productDescriptionelement = document.createElement("p");
        productDescriptionelement.innerText = products[i].description;

        
        
        // On rattache la balise "a" à la section Items
        sectionFiches.appendChild(linkElement);
        // On rattache l'article à la balise "a"
        linkElement.appendChild(productsElement);
        // On rattache l’image à productsElement (la balise article)
        productsElement.appendChild(imageUrlElement);
        // Idem pour le nom et la description...
        productsElement.appendChild(productNameElement);
        productsElement.appendChild(productDescriptionelement);
        
        }

    });
    