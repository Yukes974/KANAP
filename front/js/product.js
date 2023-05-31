fetch("/js/product.json")
  .then((response) => response.json())
  .then((products) => {
    let str = new URL(window.location.href);
    let url = new URLSearchParams(str.search);
    let id = url.get("id");

    for (let i = 0; i < products.length; i++) {
      if (products[i]._id == id) {
        const imageUrl = `<img src="${products[i].imageUrl}" alt="${products[i].altTxt}"/>`;
        const classItemImg = document.querySelector(".item__img");
        classItemImg.insertAdjacentHTML("beforeEnd", imageUrl);
        const productName = `<h1>${products[i].name}</h1>`;
        const idTitle = document.querySelector("#title");
        idTitle.insertAdjacentHTML("beforeEnd", productName);
        const productPrice = `<span>${products[i].price}</span>`;
        const idPrice = document.querySelector("#price");
        idPrice.insertAdjacentHTML("beforeEnd", productPrice);
        const productDescription = `<p>${products[i].description}</p>`;
        const idDescription = document.querySelector("#description");
        idDescription.insertAdjacentHTML("beforeEnd", productDescription);

        for (let j = 0; j < products[i].colors.length; j++) {
          const productColor = `<option>${products[i].colors[j]} </option>`;
          console.log(productColor);
          const idColors = document.querySelector("#colors");
          idColors.insertAdjacentHTML("beforeEnd", productColor);
        }
      }
    }
  });
