import { Router } from "express";
import ProductManager from "../ProductsManagerMemory.js";

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("index", { products });
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

router.post("/realTimeProducts", async (req, res) => {
  const { title, description, category, price, stock } = req.body;
  const newProduct = await productManager.createProduct({
    title,
    description,
    category,
    price: parseInt(price),
    stock: parseInt(stock),
  });
  if (!newProduct) {
    return res.status(400).json({ error: "Error al crear el producto" });
  }
  res.redirect("/realTimeProducts");
});

router.delete("/realTimeProducts/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productManager.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(204).send();
});

export default router;
