import generateCode from "./randomCode.js";
class ProductManager {
  constructor() {
    this.products = [
      {
        id: 448227208711,
        code: "XAUYI56315",
        status: true,
        title: "Pan de papa",
        description: "hecho de papa",
        category: "panaderia",
        price: "990",
        stock: "90",
      },
      {
        id: 859166159404,
        code: "WSNUG40864",
        status: true,
        title: "Pan de maiz",
        description: "Pan hecho de maiz 100% natural",
        category: "Panaderia",
        price: 100,
        stock: 10,
      },
    ];
  }

  async getProducts() {
    try {
      return this.products;
    } catch (error) {
      console.log("Error al leer los productos", error);
    }
  }
  async getProductById(id) {
    try {
      const product = this.products.find((p) => p.id === Number(id));
      if (!product) {
        console.log("Producto no encontrado");
        return null;
      }
      return product;
    } catch (error) {
      console.log("Error al leer el producto", error);
    }
  }

  async createProduct(product) {
    try {
      if (!product || !product.title) {
        console.log("Producto inválido");
        return;
      }
      const newProduct = {
        id: Math.floor(Math.random() * Date.now()),
        code: generateCode(),
        status: true,
        ...product,
      };
      this.products.push(newProduct);
      console.log("Producto creado:", newProduct);
      return newProduct;
    } catch (error) {
      console.log("Error al crear el producto", error);
    }
  }

  async updateProduct(id, product) {
    try {
      const index = this.products.findIndex((p) => p.id === Number(id));

      if (index === -1) {
        console.log("Producto no encontrado");
        return null;
      }

      this.products[index] = { ...this.products[index], ...product };

      console.log("Producto actualizado:", this.products[index]);
      return this.products[index];
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const index = this.products.findIndex((p) => p.id === Number(id));
      if (index === -1) {
        console.log("Producto no encontrado");
        return;
      }
      this.products.splice(index, 1);
      console.log("Producto eliminado");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

export default ProductManager;
