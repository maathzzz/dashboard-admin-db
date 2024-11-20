const routes =  require("express").Router();

const userRoutes = require("./userRoutes");
const adminRoutes =  require("./adminRoutes");
const supplierRoutes = require("./supplierRoutes");
const productRoutes =  require("./productRoutes");
const orderRoutes = require("./orderRoutes");

routes.use("/users", userRoutes);
routes.use("/admin", adminRoutes);
routes.use("/supplier", supplierRoutes);
routes.use("/product", productRoutes);
routes.use("/order", orderRoutes)

module.exports =  routes;