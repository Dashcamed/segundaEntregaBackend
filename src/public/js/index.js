const socket = io();

document
  .getElementById("createProductForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    socket.emit("product", product);
    event.target.reset();
  });

document.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const Id = event.target.parentElement.id;
    socket.emit("deleteProduct", Id);
  }
});

socket.on("productList", (products) => {
  let productsContainer = document.getElementById("productList");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    let divHtml = `<div class="card-product" id="${product.id}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>${product.category}</p>
          <p>$${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <button class="delete-button" data-id="${product.id}">Eliminar</button>
        </div>`;

    productsContainer.innerHTML += divHtml;
  });
});
