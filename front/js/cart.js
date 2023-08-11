let productInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    function refreshPage() {
      let totalQuantityProduct = 0;
      let totalPrice = 0;

      // Listing des produits dans le localStorage
      for (let i = 0; i < productInLocalStorageParsed.length; i++) {
        let productInLocalStorage = productInLocalStorageParsed[i];
        // Listing des produits dans le fichier JSON
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

            const sectionFiches = document.getElementById("cart__items");

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
              productInLocalStorageParsed = JSON.parse(
                window.localStorage.getItem("productArrayInLocalStorage")
              );

              sectionFiches.innerHTML = "";
              refreshPage();
            }

            // création d'un évènement pour le bouton "removeToCart" et qui est un "click"

            const removeToCart = document.querySelector(
              ".cart__item:last-child .deleteItem"
            );

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
                }
              }
              productInLocalStorageParsed.splice(indexFound, 1);

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
                  productInLocalStorageParsed[l].quantityProductObject = Number(
                    this.value
                  );
                }
              }
              sendAndGetInfoLocalStorage();
            }
            input.addEventListener("input", updateValue);

            // calcul de la quantité de tous les produits dans le localStorage
            totalQuantityProduct += productInLocalStorage.quantityProductObject;

            // prix total par article
            let productTotalPrice =
              productInJson.price * productInLocalStorage.quantityProductObject;

            //  calcul du prix total de tous les produits dans le localStorage
            totalPrice += productTotalPrice;
          }
        }
      }

      const idTotalQuantity = document.getElementById("totalQuantity");
      const idTotalPrice = document.getElementById("totalPrice");

      idTotalQuantity.innerHTML = totalQuantityProduct;
      idTotalPrice.innerHTML = totalPrice;

      // Formulaire

      const form = document.querySelector("form");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Récupération de la valeur des champs
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const email = document.getElementById("email").value;

        // Etablissement des conditions pour que la valeur d'un champ soit autorisé
        let firstNameRegex = new RegExp("^[a-zA-Z- ]+$");
        let firstNameResult = firstNameRegex.test(firstName);
        let lastNameRegex = new RegExp("^[a-zA-Z- ]+$");
        let lastNameResult = lastNameRegex.test(lastName);
        let addressRegex = new RegExp("^[a-zA-Z0-9-, ]+$");
        let addressResult = addressRegex.test(address);
        let cityRegex = new RegExp("^[a-zA-Z- ]+$");
        let cityResult = cityRegex.test(city);
        let emailRegex = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$");
        let emailResult = emailRegex.test(email);

        // Condition booléenne si la valeur est différente de ce qu'il est attendu dans le champ => Un message d'erreur sera affiché
        if (!firstNameResult) {
          const firstNameErrorMsg =
            document.getElementById("firstNameErrorMsg");
          firstNameErrorMsg.innerHTML =
            "Ce champ n'est pas rempli correctement";
          return false;
        }
        if (!lastNameResult) {
          const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
          lastNameErrorMsg.innerHTML = "Ce champ n'est pas rempli correctement";
          return false;
        }
        if (!addressResult) {
          const addressErrorMsg = document.getElementById("addressErrorMsg");
          addressErrorMsg.innerHTML = "Ce champ n'est pas rempli correctement";
          return false;
        }
        if (!cityResult) {
          const cityErrorMsg = document.getElementById("cityErrorMsg");
          cityErrorMsg.innerHTML = "Ce champ n'est pas rempli correctement";
          return false;
        }
        if (!emailResult) {
          const emailErrorMsg = document.getElementById("emailErrorMsg");
          emailErrorMsg.innerHTML = "Ce champ n'est pas rempli correctement";
          return false;
        }

        // Création d'un objet pour y stocker les informations du champ
        let user = {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email,
        };

        // Alternative à une boucle. Récupération de l'id actuel du produit
        let productIds = products.map((product) => {
          return product._id;
        });

        // Envois des informations grâce un méthode POST dans l'API
        let userResponse = await fetch(
          "http://localhost:3000/api/products/order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              contact: user,

              products: productIds,
            }),
          }
        );

        // Récupération de l'id créé pour la commande et si elle est bonne, il y aura redirection vers la page confirmation
        let userResult = await userResponse.json();

        if (userResult.orderId) {
          window.location.href = `/html/confirmation.html?id=${userResult.orderId}`;
        }
      });
    }
    refreshPage();
  });
