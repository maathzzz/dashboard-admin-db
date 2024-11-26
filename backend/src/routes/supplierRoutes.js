const { Router } = require("express");
const SupplierController = require("../controllers/SupplierController");

const supplierRoutes = Router();
const supplier = new SupplierController();

supplierRoutes.get("/", async (req, res) => {
  await supplier.getSuppliers(req, res);
});

supplierRoutes.get("/:id", async (req, res) => {
  await supplier.getSupplierById(req, res);
});

supplierRoutes.post("/", async (req, res) => {
  await supplier.create(req, res);
});

supplierRoutes.delete("/:id", async (req, res) => {
  await supplier.delete(req, res);
});

supplierRoutes.put("/:id", async (req, res) => {
  await supplier.update(req, res);
});

module.exports = supplierRoutes;
