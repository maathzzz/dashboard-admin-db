const { Router } = require("express");
const adminController = require("../controllers/AdminController");
const auth =  require("../middlewares/auth")

const adminRoutes = Router();
const admin =  new adminController();

adminRoutes.post("/login", async (req, res) => {
  await admin.login(req, res);
});

adminRoutes.get("/list", auth, async (req, res) => {
  await admin.getAdmins(req, res);
});

adminRoutes.post("/register", auth, async (req, res) => {
  await admin.create(req, res);
});

adminRoutes.delete("/delete/:id", auth, async (req, res) => {
  await admin.delete(req, res);
})

adminRoutes.put("/update/:id", auth, async (req, res) => {
  await admin.update(req, res);
})

module.exports =  adminRoutes;
