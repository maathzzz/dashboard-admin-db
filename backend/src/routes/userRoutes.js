const { Router } = require("express");
const userController = require("../controllers/userController");

const userRoutes = Router();

userRoutes.post("/register", async (req, res) => {
    // await userController.createUser(req, res);
    return res.json({ message: "Registrar usuário" });
});

userRoutes.get("/list", async (req, res) => {
    // await userController.getUsers(req, res);
    return res.json({ message: "Listar todos os usuários" });
});

module.exports = userRoutes;