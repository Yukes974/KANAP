// tableau désérialisé

let productArrayInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);
console.log(productArrayInLocalStorageParsed);

if (productArrayInLocalStorageParsed === null) {
  // Création d'un tableau
  productArrayInLocalStorageParsed = [];
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
          const listColors = document.getElementById("colors").value;
          // "valueAsNumber" va permettre de récupérer la valeur sous forme de "number" au lieu de "string"
          let input = document.getElementById("quantity").valueAsNumber;

          // Création d'un objet qui contient les valeurs "id", "color" et "input" du produit
          const productObject = {
            idProductObject: idProduct,
            colorProductObject: listColors,
            inputProductObject: input,
          };

          console.log(productObject.inputProductObject);

          // Création d'une variable en vue de déclencher une action plus tard si la valeur est "true"
          let flag = false;

          for (
            let index = 0;
            index < productArrayInLocalStorageParsed.length;
            index++
          ) {
            // lister tous les "id" dans le localStorage
            let idProductInLocalStorage =
              productArrayInLocalStorageParsed[index].idProductObject;
            console.log(idProductInLocalStorage);
            // lister toutes les "couleurs" dans le localStorage
            let colorProductInLocalStorage =
              productArrayInLocalStorageParsed[index].colorProductObject;
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
            productArrayInLocalStorageParsed[indexFound].inputProductObject =
              productArrayInLocalStorageParsed[indexFound].inputProductObject +
              productObject.inputProductObject;
          } else {
            // Enregistrement du produit dans le localStorage
            productArrayInLocalStorageParsed.push(productObject);
          }

          // sérialisation du tableau
          const productArrayStringify = JSON.stringify(
            productArrayInLocalStorageParsed
          );
          window.localStorage.setItem(
            "productArrayInLocalStorage",
            productArrayStringify
          );
          console.log(productArrayStringify);
        });
      }
    }
  });
