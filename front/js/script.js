// Récupération des produits depuis le fichier JSON
// fetch("/js/product.json")
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    // Listing des produits du fichier JSON.
    for (let i = 0; i < products.length; i++) {
      const html = `<a href="./product.html?id=${products[i]._id}">
            <article>
              <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
              <h3 class="productName">${products[i].name}</h3>
              <p class="productDescription">${products[i].description}</p>
            </article>
          </a>`;

      const sectionFiches = document.querySelector(".items");

      //sectionFiches.innerHTML = html;
      sectionFiches.insertAdjacentHTML("beforeEnd", html);
    }
  });
