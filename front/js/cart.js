let productArrayInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);
console.log(productArrayInLocalStorageParsed);

fetch("/js/product.json")
  .then((response) => response.json())
  .then((products) => {
    let totalQuantityProduct = 0;
    let totalPrice = 0;
    let finalTotalQuantityProduct = 0;
    let finalTotalPrice = 0;
    for (
      let countArticleInLocalStorage = 0;
      countArticleInLocalStorage < productArrayInLocalStorageParsed.length;
      countArticleInLocalStorage++
    ) {
      for (
        let indexArticleJson = 0;
        indexArticleJson < products.length;
        indexArticleJson++
      ) {
        const productInJson = products[indexArticleJson];
        const productInLocalStorage =
          productArrayInLocalStorageParsed[countArticleInLocalStorage];

        if (productInJson._id === productInLocalStorage.idProductObject) {
          const html = `<article class="cart__item" data-id="${productInJson._id}" data-color="${productInJson.colors}">
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

          //sectionFiches.innerHTML = html;
          sectionFiches.insertAdjacentHTML("beforeEnd", html);

          // // création d'un évènement pour le bouton "removeToCart" et qui est un "click"
          // const removeToCart = document.querySelector(".deleteItem");
          // removeToCart.addEventListener("click", function () {
          //   window.localStorage.removeItem(
          //     "productArrayInLocalStorage",
          //     productArrayInLocalStorageParsed
          //   );
          // });

          // calcul de la quantité de tous les produits dans le localStorage
          totalQuantityProduct += productInLocalStorage.quantityProductObject;

          console.log(totalQuantityProduct);

          // prix total par article
          let productTotalPrice =
            productInJson.price * productInLocalStorage.quantityProductObject;

          console.log(productTotalPrice);

          //  calcul du prix total de tous les produits dnas le localStorage
          totalPrice += productTotalPrice;

          console.log(totalPrice);

          // for (let countTotalPrice = 0;  )

          // let allProductTotalPrice = totalPrice + totalPrice;

          // console.log(allProductTotalPrice);
        }
      }
    }

    // Quantité et prix finaux de tous les produits
    finalTotalQuantityProduct = totalQuantityProduct;
    finalTotalPrice = totalPrice;

    const showTotalQuantity = `<span id="totalQuantity">${finalTotalQuantityProduct}</span>`;
    const showTotalPrice = `<span id="totalPrice">${finalTotalPrice}</span>`;

    const idTotalQuantity = document.querySelector("#totalQuantity");
    const idTotalPrice = document.querySelector("#totalPrice");

    idTotalQuantity.insertAdjacentHTML("beforeEnd", showTotalQuantity);
    idTotalPrice.insertAdjacentHTML("beforeEnd", showTotalPrice);
  });
