const { Router } = require("express");
const adminController = require("../controllers/AdminController");

const adminRoutes = Router();
const admin =  new adminController();

adminRoutes.get("/list", async (req, res) => {
  await admin.getAdmins(req, res);
});

adminRoutes.post("/register", async (req, res) => {
  await admin.create(req, res);
});

adminRoutes.delete("/delete/:id", async (req, res) => {
  await admin.delete(req, res);
})

adminRoutes.put("/update/:id", async (req, res) => {
  await admin.update(req, res);
})

module.exports =  adminRoutes;
