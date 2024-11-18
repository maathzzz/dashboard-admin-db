const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await prisma.product.findMany({
        include: { supplier: true }, 
      });
      return res.json(products);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return res.status(500).json({ error: "Erro ao listar produtos." });
    }
  }

  async create(req, res) {
    const { 
      name, 
      price, 
      description, 
      category,
      supplierId 
    } = req.body;

    try {
      const product = await prisma.product.create({
        data: { name, price, description, category, supplierId },
      });
      return res.status(201).json(product);
    } catch (error) {
      console.error("Erro ao registrar produto:", error);
      return res.status(500).json({ 
        error: "Erro ao registrar produto.", 
        message: error 
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const product = await prisma.product.delete({
        where: { id: parseInt(id, 10) },
      });
      return res.status(200).json({ message: "Produto deletado com sucesso.", product });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return res.status(500).json({ 
        error: "Erro ao deletar produto.",
        message: "Error"
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      category,
      supplierId
    } = req.body;

    try {
      const product = await prisma.product.update({
        where: { id: parseInt(id, 10) },
        data: { name, price, description, category, supplierId },
      });
      return res.status(200).json({ message: "Produto atualizado com sucesso.", product });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({ error: "Erro ao atualizar produto." });
    }
  }
}

module.exports = ProductController;
