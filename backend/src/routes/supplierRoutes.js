const { Router } = require("express");
const SupplierController = require("../controllers/SupplierController");

const supplierRoutes = Router();
const supplier = new SupplierController();

supplierRoutes.get("/list", async (req, res) => {
  await supplier.getSuppliers(req, res);
});

supplierRoutes.post("/register", async (req, res) => {
  await supplier.create(req, res);
});

supplierRoutes.delete("/delete/:id", async (req, res) => {
  await supplier.delete(req, res);
});

supplierRoutes.put("/update/:id", async (req, res) => {
  await supplier.update(req, res);
});

module.exports = supplierRoutes;
