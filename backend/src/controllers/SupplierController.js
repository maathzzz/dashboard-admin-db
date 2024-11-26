const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SupplierController {
  async getSuppliers(req, res) {
    try {
      const suppliers = await prisma.supplier.findMany();
      return res.json(suppliers);
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error);
      return res.status(500).json({ error: "Erro ao listar fornecedores." });
    }
  }

  async getSupplierById(req, res) {
    const { id } = req.params;

    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!supplier) {
        return res.status(404).json({ error: 'Fornecedor não encontrado.' });
      }

      return res.json(supplier);
    } catch (error) {
      console.error('Erro ao buscar fornecedor por ID:', error);
      return res.status(500).json({ error: 'Erro ao buscar fornecedor.' });
    }
  }

  async create(req, res) {
    const { 
      name, 
      phone, 
      cnpj, 
      email 
    } = req.body;

    try {
      const supplier = await prisma.supplier.create({
        data: { name, phone, cnpj, email },
      });
      return res.status(201).json(supplier);
    } catch (error) {
      console.error("Erro ao registrar fornecedor:", error);
      return res.status(500).json({ 
        error: "Erro ao registrar fornecedor.", 
        message: error 
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const supplier = await prisma.supplier.delete({
        where: { id: parseInt(id, 10) },
      });
      return res.status(200).json({ message: "Fornecedor deletado com sucesso.", supplier });
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      return res.status(500).json({ 
        error: "Erro ao deletar fornecedor.",
        message: "Error"
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      phone,
      cnpj,
      email
    } = req.body;

    try {
      const supplier = await prisma.supplier.update({
        where: { id: parseInt(id, 10) },
        data: { name, phone, cnpj, email },
      });
      return res.status(200).json({ message: "Fornecedor atualizado com sucesso.", supplier });
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      return res.status(500).json({ error: "Erro ao atualizar fornecedor." });
    }
  }
}

module.exports = SupplierController;
