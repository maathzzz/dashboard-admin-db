const { Router } = require("express");
const userController = require("../controllers/UserController");

const userRoutes = Router();
const user = new userController();

userRoutes.get("/list", async (req, res) => {
  await user.getUsers(req, res);
});

userRoutes.post("/register", async (req, res) => {
  await user.create(req, res);
});

userRoutes.delete("/delete/:id", async (req, res) => {
  await user.delete(req, res);
})

userRoutes.put("/update/:id", async (req, res) => {
  await user.update(req, res);
})

module.exports = userRoutes;
