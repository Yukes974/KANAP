fetch("/js/product.json")
  .then((response) => response.json())
  .then((products) => {
    let str = new URL(window.location.href);
    console.log(str);
    let url = new URLSearchParams(str.search);
    console.log(url.has("id"));
    let id = url.get("id");
    console.log(id);
  });
