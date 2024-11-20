const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderController {
  async createOrder(req, res) {
    const { description, items, address, payment_method, user_id } = req.body;

    try {
      const total_price = await Promise.all(
        items.map(async ({ product_id, quantity }) => {
          const product = await prisma.product.findUnique({ where: { id: product_id } });
          if (!product) {
            throw new Error(`Produto com ID ${product_id} não encontrado.`);
          }
          if (product.stock < quantity) {
            throw new Error(`Estoque insuficiente para o produto com ID ${product_id}.`);
          }
          return product.price * quantity;
        })
      ).then((prices) => prices.reduce((acc, curr) => acc + curr, 0));

      const order = await prisma.order.create({
        data: {
          description,
          address,
          payment_method,
          total_price,
          user_id,
          items: {
            create: items.map(({ product_id, quantity }) => ({
              product_id,
              quantity,
            })),
          },
        },
        include: { items: true }, 
      });

      await Promise.all(
        items.map(async ({ product_id, quantity }) => {
          await prisma.product.update({
            where: { id: product_id },
            data: { stock: { decrement: quantity } }, 
          });
        })
      );

      return res.status(201).json(order);
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    const { id } = req.params;

    try {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id, 10) },
        include: { items: { include: { product: true } }, user: true },
      });

      if (!order) {
        return res.status(404).json({ error: "Ordem não encontrada." });
      }

      return res.json(order);
    } catch (error) {
      console.error("Erro ao buscar ordem:", error);
      return res.status(500).json({ error: "Erro ao buscar ordem." });
    }
  }

  async listOrders(req, res) {
    try {
      const orders = await prisma.order.findMany({
        include: { items: { include: { product: true } }, user: true },
      });

      return res.json(orders);
    } catch (error) {
      console.error("Erro ao listar ordens:", error);
      return res.status(500).json({ error: "Erro ao listar ordens." });
    }
  }
}

module.exports = OrderController;
