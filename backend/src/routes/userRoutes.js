const { Router } = require("express");
const userController = require("../controllers/UserController");

const userRoutes = Router();
const user = new userController();

userRoutes.get("/", async (req, res) => {
  await user.getUsers(req, res);
});

userRoutes.get("/:id", async (req, res) => {
  await user.getUserById(req, res);
});

userRoutes.post("/", async (req, res) => {
  await user.create(req, res);
});

userRoutes.delete("/:id", async (req, res) => {
  await user.delete(req, res);
})

userRoutes.put("/:id", async (req, res) => {
  await user.update(req, res);
})

module.exports = userRoutes;
