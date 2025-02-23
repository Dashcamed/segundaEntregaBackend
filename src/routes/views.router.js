import { Router } from "express";
import ProductManager from "../ProductsManagerMemory.js";

const productManager = new ProductManager();

const router = Router();

async function createDefaultProducts() {
  try {
    await productManager.createProduct({
      title: "Pan de maiz",
      description: "Pan hecho de maiz 100% natural",
      category: "Panaderia",
      price: 100,
      stock: 10,
    });
    console.log(
      "Producto por defecto creado:",
      await productManager.getProducts()
    );
  } catch (error) {
    console.log("Error al crear el producto", error);
  }
}
createDefaultProducts();

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
    price,
    stock,
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
