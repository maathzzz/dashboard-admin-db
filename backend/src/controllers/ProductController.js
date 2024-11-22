const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductController {
async getProducts(req, res) {
    try {
        const products = await prisma.product.findMany({
            include: {
                supplier: true, // Inclui o fornecedor, mas não exige que esteja presente
            },
        });

        // Tratar os dados para evitar inconsistências
        const safeProducts = products.map((product) => ({
            ...product,
            supplier: product.supplier || {}, // Retorna um objeto vazio caso `supplier` seja `null`
        }));

        return res.json(safeProducts);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return res.status(500).json({ error: "Erro ao listar produtos." });
    }
}


  async getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id, 10) },
        include: { supplier: true },
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }

      // Retorna o produto com `supplier` como objeto vazio caso seja `null`
      return res.json({
        ...product,
        supplier: product.supplier || {}, // Retorna um objeto vazio para `supplier`
      });
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return res.status(500).json({ error: "Erro ao buscar produto." });
    }
  }

  async create(req, res) {
    const { 
      name, 
      price, 
      description, 
      category, 
      stock, 
      supplierId 
    } = req.body;

    try {
      const supplierExists = supplierId
        ? await prisma.supplier.findUnique({ where: { id: supplierId } })
        : null;

      if (supplierId && !supplierExists) {
        return res.status(400).json({ error: "Fornecedor não encontrado." });
      }

      const product = await prisma.product.create({
        data: { name, price, description, category, stock, supplierId },
      });
      return res.status(201).json(product);
    } catch (error) {
      console.error("Erro ao registrar produto:", error);
      return res.status(500).json({
        error: "Erro ao registrar produto.",
        message: error.message,
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
        message: error.message,
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
      stock, 
      supplierId 
    } = req.body;

    try {
      const supplierExists = supplierId
        ? await prisma.supplier.findUnique({ where: { id: supplierId } })
        : null;

      if (supplierId && !supplierExists) {
        return res.status(400).json({ error: "Fornecedor não encontrado." });
      }

      const product = await prisma.product.update({
        where: { id: parseInt(id, 10) },
        data: { name, price, description, category, stock, supplierId },
      });
      return res.status(200).json({ message: "Produto atualizado com sucesso.", product });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({ error: "Erro ao atualizar produto." });
    }
  }
}

module.exports = ProductController;
