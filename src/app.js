import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./ProductsManagerMemory.js";

import viewsRouter from "./routes/views.router.js";

const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(8080, () =>
  console.log(`Listening on port 8080`)
);

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  console.log(`"cliente conectado" ${socket.id}`);

  const products = await productManager.getProducts();
  socket.emit("productList", products);

  socket.on("product", async (data) => {
    await productManager.createProduct(data);
    const updatedProducts = await productManager.getProducts();
    io.emit("productList", updatedProducts);
    io.emit("productCreated", data.title);
  });

  socket.on("deleteProduct", async (id) => {
    const product = await productManager.getProductById(id);

    if (!product) {
      return;
    }

    await productManager.deleteProduct(id);
    const updatedProducts = await productManager.getProducts();

    io.emit("productList", updatedProducts);
    io.emit("productDeleted", product.title);
  });
});
