// tableau désérialisé

let productInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);
console.log(productInLocalStorageParsed);

if (productInLocalStorageParsed === null) {
  // Création d'un tableau
  productInLocalStorageParsed = [];
}

fetch("/js/product.json")
  .then((response) => response.json())
  .then((products) => {
    let str = new URL(window.location.href);
    let url = new URLSearchParams(str.search);
    let id = url.get("id");

    for (let count = 0; count < products.length; count++) {
      const product = products[count];
      const idProduct = products[count]._id;
      if (idProduct == id) {
        const imageUrl = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`;
        const classItemImg = document.querySelector(".item__img");
        classItemImg.insertAdjacentHTML("beforeEnd", imageUrl);
        const productName = `<h1>${product.name}</h1>`;
        const idTitle = document.querySelector("#title");
        idTitle.insertAdjacentHTML("beforeEnd", productName);
        const productPrice = `<span>${product.price}</span>`;
        const idPrice = document.querySelector("#price");
        idPrice.insertAdjacentHTML("beforeEnd", productPrice);
        const productDescription = `<p>${product.description}</p>`;
        const idDescription = document.querySelector("#description");
        idDescription.insertAdjacentHTML("beforeEnd", productDescription);

        // déroulement des couleurs dans le menu déroulant
        for (
          let indexColors = 0;
          indexColors < product.colors.length;
          indexColors++
        ) {
          const productColor = `<option>${product.colors[indexColors]} </option>`;
          const idColors = document.querySelector("#colors");
          idColors.insertAdjacentHTML("beforeEnd", productColor);
        }

        // création d'un évènement pour le bouton "addToCart" et qui est un "click"
        const addToCart = document.querySelector("#addToCart");
        addToCart.addEventListener("click", function () {
          // Récupération des couleurs et de la quantité du produit par leur valeur
          const listColors = document.querySelector("#colors").value;
          // "valueAsNumber" va permettre de récupérer la valeur sous forme de "number" au lieu de "string"
          let productQuantity =
            document.querySelector("#quantity").valueAsNumber;

          // Création d'un objet qui contient les valeurs "id", "color" et "quantity" du produit
          let productObject = {
            idProductObject: idProduct,
            colorProductObject: listColors,
            quantityProductObject: productQuantity,
          };

          console.log(productObject.quantityProductObject);

          if (
            productObject.quantityProductObject === 0 ||
            productObject.colorProductObject === ""
          ) {
            alert(
              "Vous devez choisir une couleur et mettre une quantité supérieure à 0"
            );
          } else {
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
              console.log(idProductInLocalStorage);
              // lister toutes les "couleurs" dans le localStorage
              let colorProductInLocalStorage =
                productInLocalStorageParsed[index].colorProductObject;
              console.log(colorProductInLocalStorage);
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
              console.log(
                productInLocalStorageParsed[indexFound].quantityProductObject
              );
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
            console.log(productArrayStringify);
          }
        });
      }
    }
  });
