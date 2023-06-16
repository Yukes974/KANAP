let productArrayInLocalStorageParsed = JSON.parse(
  window.localStorage.getItem("productArrayInLocalStorage")
);
console.log(productArrayInLocalStorageParsed);

fetch("/js/product.json")
  .then((response) => response.json())
  .then((products) => {
    for (
      let countArticle = 0;
      countArticle < productArrayInLocalStorageParsed.length;
      countArticle++
    ) {
      for (
        let countArticleJSON = 0;
        countArticleJSON < products.length;
        countArticleJSON++
      ) {
        const productInJson = products[countArticleJSON];
        const itemInLocalStorage =
          productArrayInLocalStorageParsed[countArticle];

        if (
          productInJson._id ===
          productArrayInLocalStorageParsed[countArticle].idProductObject
        ) {
          const html = `<article class="cart__item" data-id="${productInJson._id}" data-color="${productInJson.colors}">
        <div class="cart__item__img">
          <img src="${productInJson.imageUrl}" alt="${productInJson.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productInJson.name}</h2>
            <p>${itemInLocalStorage.colorProductObject}</p>
            <p>${productInJson.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocalStorage.quantityProductObject}">
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
        }
      }
    }
  });
