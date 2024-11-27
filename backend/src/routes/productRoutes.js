const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const auth = require("../middlewares/auth");

const productRoutes = Router();
const product = new ProductController();

productRoutes.get("/", auth, async (req, res) => {
  await product.getProducts(req, res);
});

productRoutes.get("/:id", auth,  async (req, res) => {
  await product.getProductById(req, res);
});

productRoutes.post("/", auth, async (req, res) => {
  await product.create(req, res);
});

productRoutes.delete("/:id", auth, async (req, res) => {
  await product.delete(req, res);
});

productRoutes.put("/:id", auth, async (req, res) => {
  await product.update(req, res);
});

module.exports = productRoutes;
