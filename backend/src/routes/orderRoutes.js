const { Router } = require("express");
const OrderController = require("../controllers/OrderController");
const auth = require("../middlewares/auth");

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post("/create", auth, async (req, res) => {
  await orderController.createOrder(req, res);
});

orderRoutes.get("/:id", auth, async (req, res) => {
  await orderController.getOrderById(req, res);
});

orderRoutes.get("/list", auth, async (req, res) => {
  await orderController.listOrders(req, res);
});

module.exports = orderRoutes;
