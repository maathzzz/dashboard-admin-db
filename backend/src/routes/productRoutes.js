const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const productRoutes = Router();
const product = new ProductController();

productRoutes.get("/", async (req, res) => {
  await product.getProducts(req, res);
});

productRoutes.get("/:id", async (req, res) => {
  await product.getProductById(req, res);
});

productRoutes.post("/", async (req, res) => {
  await product.create(req, res);
});

productRoutes.delete("/:id", async (req, res) => {
  await product.delete(req, res);
});

productRoutes.put("/:id", async (req, res) => {
  await product.update(req, res);
});

module.exports = productRoutes;
