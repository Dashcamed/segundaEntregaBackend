const socket = io();

let productForm = document.getElementById("createProductForm");

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let formData = new FormData(productForm);
  let product = Object.fromEntries(formData.entries());

  socket.emit("product", product);
  productForm.reset();
});

socket.on("product", (products) => {
  let productsContainer = document.getElementById("productList");
  productsContainer.innerHTML = ""; // Limpia la lista

  products.forEach((product) => {
    let liHtml = `<li>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>${product.category}</p>
        <p>$${product.price}</p>
        <p>Stock: ${product.stock}</p>
      </li>`;

    productsContainer.innerHTML += liHtml;
  });
});
