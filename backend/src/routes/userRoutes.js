const { Router } = require("express");
const userController = require("../controllers/userController");

const userRoutes = Router();

userRoutes.get("/list", async (req, res) => {
  await userController.getUsers(req, res);
});

userRoutes.post("/register", async (req, res) => {
  await userController.createUser(req, res);
});

module.exports = userRoutes;
