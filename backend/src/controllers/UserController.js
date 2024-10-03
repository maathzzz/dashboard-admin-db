const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar usuários." });
    }
  },

  async createUser(req, res) {
    const { 
        name, 
        email, 
        password,
        cpf,
        country,
        state,
        city 
    } = req.body;

    try {
      const user = await prisma.user.create({
        data: { name, email, password, cpf, country, state, city },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  },
};
