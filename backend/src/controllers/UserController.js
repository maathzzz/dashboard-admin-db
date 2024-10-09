const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserController {
  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ error: "Erro ao listar usuários." });
    }
  }

  async create(req, res) {
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
      console.error("Erro ao registrar usuário:", error);
      return res.status(500).json({ 
        error: "Erro ao registrar usuário.", 
        message: error 
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await prisma.user.delete({
        where: { id: parseInt(id, 10) },
      });
      return res.status(200).json({ message: "Usuário deletado com sucesso.", user });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ 
        error: "Erro ao deletar usuário.",
        message: "Error"
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      cpf,
      country,
      state,
      city,
    } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: { name, email, password, cpf, country, state, city },
      });
      return res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }
}

module.exports = UserController;
