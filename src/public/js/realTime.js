const socket = io();

document
  .getElementById("createProductForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    socket.emit("product", product);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto creado",
      showConfirmButton: false,
      timer: 1500,
    });
    event.target.reset();
  });

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-button")) {
    const productId = event.target.getAttribute("data-id");

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      socket.emit("deleteProduct", productId);
    }
  }
});

socket.on("productDeleted", (productName) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Producto "${productName}" eliminado`,
    showConfirmButton: false,
    timer: 1500,
  });
});

socket.on("productCreated", (productName) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Producto "${productName}" creado`,
    showConfirmButton: false,
    timer: 1500,
  });
});

socket.on("productList", (products) => {
  let productsContainer = document.getElementById("productList");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    let divHtml = `<div class="card-product" id="${product.id}">
            <h3><b>Nombre:</b> ${product.title}</h3>
            <p><b>Descripción:</b> ${product.description}</p>
            <p><b>Categoría:</b> ${product.category}</p>
            <p><b>Precio:</b> $${product.price}</p>
            <p><b>Stock:</b> ${product.stock} unidades</p>
            <button class="delete-button" data-id="${product.id}">Eliminar</button>
          </div>`;

    productsContainer.innerHTML += divHtml;
  });
});
