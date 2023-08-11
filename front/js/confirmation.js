fetch("http://localhost:3000/api/products/order")
  .then((response) => response.json())
  .then((products) => {
    // Récupération de l'id de la commande dans l'URL
    let str = new URL(window.location.href);
    let url = new URLSearchParams(str.search);
    let id = url.get("id");

    // Affichage de l'id de la commande
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = id;
  });
