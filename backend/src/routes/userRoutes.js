const { Router } = require("express");
const userController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

const userRoutes = Router();
const user = new userController();

userRoutes.get("/", auth, async (req, res) => {
  await user.getUsers(req, res);
});

userRoutes.get("/:id", auth, async (req, res) => {
  await user.getUserById(req, res);
});

userRoutes.post("/", auth, async (req, res) => {
  await user.create(req, res);
});

userRoutes.delete("/:id", auth, async (req, res) => {
  await user.delete(req, res);
})

userRoutes.put("/:id", auth, async (req, res) => {
  await user.update(req, res);
})

module.exports = userRoutes;
