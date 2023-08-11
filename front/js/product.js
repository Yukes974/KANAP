// tableau désérialisé

let productInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);

// Si le tableau n'est pas créé, il y aura une erreur empêchant le reste du code de s'effectuer
if (productInLocalStorageParsed === null) {
  productInLocalStorageParsed = [];
}

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    //  Récupération de l'id dans l'URL
    let str = new URL(window.location.href);
    let url = new URLSearchParams(str.search);
    let id = url.get("id");

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const idProduct = products[i]._id;
      if (idProduct == id) {
        const imageUrl = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`;
        const classItemImg = document.querySelector(".item__img");
        classItemImg.insertAdjacentHTML("beforeEnd", imageUrl);
        const productName = `<h1>${product.name}</h1>`;
        const idTitle = document.getElementById("title");
        idTitle.insertAdjacentHTML("beforeEnd", productName);
        const productPrice = `<span>${product.price}</span>`;
        const idPrice = document.getElementById("price");
        idPrice.insertAdjacentHTML("beforeEnd", productPrice);
        const productDescription = `<p>${product.description}</p>`;
        const idDescription = document.getElementById("description");
        idDescription.insertAdjacentHTML("beforeEnd", productDescription);

        // déroulement des couleurs dans le menu déroulant
        for (let j = 0; j < product.colors.length; j++) {
          const productColor = `<option>${product.colors[j]} </option>`;
          const idColors = document.getElementById("colors");
          idColors.insertAdjacentHTML("beforeEnd", productColor);
        }

        // création d'un évènement pour le bouton "addToCart" et qui est un "click"
        const addToCart = document.getElementById("addToCart");
        addToCart.addEventListener("click", function () {
          // Récupération des couleurs et de la quantité du produit par leur valeur
          const listColors = document.getElementById("colors").value;
          // "valueAsNumber" va permettre de récupérer la valeur sous forme de "number" au lieu de "string"
          let productQuantity =
            document.getElementById("quantity").valueAsNumber;

          // Création d'un objet qui contient les valeurs "id", "color" et "quantity" du produit
          let productObject = {
            idProductObject: idProduct,
            colorProductObject: listColors,
            quantityProductObject: productQuantity,
          };

          let indexFound = -1;

          // Si les informations ne sont pas correctes, il y aura une alerte empêchant la page de se valider et d'aller à la page suivante.
          if (
            productObject.quantityProductObject === 0 ||
            productObject.colorProductObject === ""
          ) {
            alert(
              "Vous devez choisir une couleur et mettre une quantité supérieure à 0"
            );
            return false;
          }
          // Création d'une variable en vue de déclencher une action plus tard si la valeur est "true"
          let flag = false;

          for (
            let index = 0;
            index < productInLocalStorageParsed.length;
            index++
          ) {
            // lister tous les "id" dans le localStorage
            let idProductInLocalStorage =
              productInLocalStorageParsed[index].idProductObject;
            // lister toutes les "couleurs" dans le localStorage
            let colorProductInLocalStorage =
              productInLocalStorageParsed[index].colorProductObject;
            if (
              idProduct === idProductInLocalStorage &&
              listColors === colorProductInLocalStorage
            ) {
              // Modification de la valeur de la variable
              flag = true;
              // Récupération de l'index qui correspond à la condition demandée
              indexFound = index;
            }
          }

          //  Déclencheur de l'action si "true"
          if (flag) {
            // Changement de la valeur de la quantité du produit dans le tableau en l'additionnant avec la quantité du produit dont on a comparé
            productInLocalStorageParsed[indexFound].quantityProductObject =
              productInLocalStorageParsed[indexFound].quantityProductObject +
              productObject.quantityProductObject;
          } else {
            // Enregistrement du produit dans le localStorage
            productInLocalStorageParsed.push(productObject);
          }

          // sérialisation du tableau
          const productArrayStringify = JSON.stringify(
            productInLocalStorageParsed
          );
          window.localStorage.setItem(
            "productArrayInLocalStorage",
            productArrayStringify
          );
        });
      }
    }
  });
