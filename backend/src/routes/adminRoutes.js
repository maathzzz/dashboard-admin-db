const { Router } = require("express");
const adminController = require("../controllers/AdminController");

const adminRoutes = Router();
const admin =  new adminController();

adminRoutes.post("/register", async (req, res) => {
  await admin.create(req, res);
});

adminRoutes.delete("/delete/:id", async (req, res) => {
  await admin.delete(req, res);
})

module.exports =  adminRoutes;
