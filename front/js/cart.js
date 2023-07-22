let productInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);
console.log(productInLocalStorageParsed);

fetch("/js/product.json")
  .then((response) => response.json())
  .then((products) => {
    function refreshPage() {
      console.log("refreshPage executé");
      let totalQuantityProduct = 0;
      console.log(totalQuantityProduct);
      let totalPrice = 0;

      for (let i = 0; i < productInLocalStorageParsed.length; i++) {
        let productInLocalStorage = productInLocalStorageParsed[i];
        for (let j = 0; j < products.length; j++) {
          const productInJson = products[j];

          if (productInJson._id === productInLocalStorage.idProductObject) {
            const html = `<article class="cart__item" data-id="${productInLocalStorage.idProductObject}" data-color="${productInLocalStorage.colorProductObject}">
          <div class="cart__item__img">
            <img src="${productInJson.imageUrl}" alt="${productInJson.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productInJson.name}</h2>
              <p>${productInLocalStorage.colorProductObject}</p>
              <p>${productInJson.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage.quantityProductObject}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;

            const sectionFiches = document.querySelector("#cart__items");

            console.log(sectionFiches);

            //sectionFiches.innerHTML = html;
            sectionFiches.insertAdjacentHTML("beforeEnd", html);

            function sendAndGetInfoLocalStorage() {
              //  envois de l'information dans le localStorage
              const productArrayStringify = JSON.stringify(
                productInLocalStorageParsed
              );
              window.localStorage.setItem(
                "productArrayInLocalStorage",
                productArrayStringify
              );
              console.log(productArrayStringify);
              productInLocalStorageParsed = JSON.parse(
                window.localStorage.getItem("productArrayInLocalStorage")
              );
              console.log(productInLocalStorageParsed);

              sectionFiches.innerHTML = "";
              refreshPage();
            }

            // création d'un évènement pour le bouton "removeToCart" et qui est un "click"

            const removeToCart = document.querySelector(
              ".cart__item:last-child .deleteItem"
            );

            console.log(removeToCart);
            // const removeToCart = document.querySelector(".deleteItem");
            removeToCart.addEventListener("click", function () {
              let indexFound = -1;
              // produit effacé dans le localStorage
              for (let k = 0; k < productInLocalStorageParsed.length; k++) {
                if (
                  productInLocalStorageParsed[k].idProductObject ===
                    productInLocalStorage.idProductObject &&
                  productInLocalStorageParsed[k].colorProductObject ===
                    productInLocalStorage.colorProductObject
                ) {
                  indexFound = k;
                  console.log(indexFound);
                }
              }
              productInLocalStorageParsed.splice(indexFound, 1);
              console.log(productInLocalStorageParsed);

              sendAndGetInfoLocalStorage();
            });

            const input = document.querySelector(
              ".cart__item:last-child .itemQuantity"
            );

            // lorsqu'on change la valeur de la quantité, elle est prit en compte
            function updateValue() {
              for (let l = 0; l < productInLocalStorageParsed.length; l++) {
                if (
                  productInLocalStorageParsed[l].idProductObject ===
                    productInLocalStorage.idProductObject &&
                  productInLocalStorageParsed[l].colorProductObject ===
                    productInLocalStorage.colorProductObject
                ) {
                  productInLocalStorageParsed[l].quantityProductObject =
                    parseInt(this.value, 10);
                }
              }
              sendAndGetInfoLocalStorage();
            }
            input.addEventListener("input", updateValue);

            // calcul de la quantité de tous les produits dans le localStorage
            totalQuantityProduct += productInLocalStorage.quantityProductObject;

            console.log(totalQuantityProduct);

            // prix total par article
            let productTotalPrice =
              productInJson.price * productInLocalStorage.quantityProductObject;

            console.log(productTotalPrice);

            //  calcul du prix total de tous les produits dans le localStorage
            totalPrice += productTotalPrice;

            console.log(totalPrice);

            console.log(input);
          }
        }
      }

      const idTotalQuantity = document.querySelector("#totalQuantity");
      const idTotalPrice = document.querySelector("#totalPrice");

      idTotalQuantity.innerHTML = totalQuantityProduct;
      idTotalPrice.innerHTML = totalPrice;
    }
    refreshPage();
  });
