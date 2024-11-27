const { Router } = require("express");
const SupplierController = require("../controllers/SupplierController");
const auth = require("../middlewares/auth");

const supplierRoutes = Router();
const supplier = new SupplierController();

supplierRoutes.get("/", auth, async (req, res) => {
  await supplier.getSuppliers(req, res);
});

supplierRoutes.get("/:id", auth, async (req, res) => {
  await supplier.getSupplierById(req, res);
});

supplierRoutes.post("/", auth, async (req, res) => {
  await supplier.create(req, res);
});

supplierRoutes.delete("/:id", auth, async (req, res) => {
  await supplier.delete(req, res);
});

supplierRoutes.put("/:id", auth, async (req, res) => {
  await supplier.update(req, res);
});

module.exports = supplierRoutes;
