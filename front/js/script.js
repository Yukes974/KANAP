// Récupération des produits depuis le fichier JSON
fetch("/js/product.json")
    .then(response => response.json())
    .then(products => {
    



    for (let i = 0; i < products.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les items
        const sectionFiches = document.querySelector(".items");
        // Création d'un lien pour chaque produit
        const linkElement = document.createElement("a");
        // Création d’une balise dédiée à un produit
        const productsElement = document.createElement("article");
        // On crée l’élément img.
        const imageUrlElement = document.createElement("img");
        // On accède à l’indice i de la liste products pour configurer la source de l’image.
        imageUrlElement.src = products[i].imageUrl;
        // Idem pour le nom et la description...
        const productNameElement = document.createElement("h3");
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



        // Vérifie l'id de chaque produit et redirige à sa page produit si l'id correspond au produit
        // Par défaut redirige à une page produit sans produit
        switch (products[i]._id) {
            case '107fb5b75607497b96722bda5b504926':
                linkElement.href = "/html/product.html?_id=107fb5b75607497b96722bda5b504926";

            break;
            case '415b7cacb65d43b2b5c1ff70f3393ad1':
                linkElement.href = "/html/product.html?_id=415b7cacb65d43b2b5c1ff70f3393ad1";

            break;
            case '055743915a544fde83cfdfc904935ee7':
                linkElement.href = "/html/product.html?_id=055743915a544fde83cfdfc904935ee7";
            
            break;
            case 'a557292fe5814ea2b15c6ef4bd73ed83':
                linkElement.href = "/html/product.html?_id=a557292fe5814ea2b15c6ef4bd73ed83";
            
            break;
            case '8906dfda133f4c20a9d0e34f18adcf06':
                linkElement.href = "/html/product.html?_id=8906dfda133f4c20a9d0e34f18adcf06";
            
            break;
            case '77711f0e466b4ddf953f677d30b0efc9':
                linkElement.href = "/html/product.html?_id=77711f0e466b4ddf953f677d30b0efc9";
            
            break;
            case '034707184e8e4eefb46400b5a3774b5f':
                linkElement.href = "/html/product.html?_id=034707184e8e4eefb46400b5a3774b5f";
            
            break;
            case 'a6ec5b49bd164d7fbe10f37b6363f9fb':
                linkElement.href = "/html/product.html?_id=a6ec5b49bd164d7fbe10f37b6363f9fb";
            
            break;

            default:
                linkElement.href = "/html/product.html";
        }
        
        }
    
    

    });
    