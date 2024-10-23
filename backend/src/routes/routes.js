const routes =  require("express").Router();

const userRoutes = require("./userRoutes");
const adminRoutes =  require("./adminRoutes");
const supplierRoutes = require("./supplierRoutes");

routes.use("/users", userRoutes);
routes.use("/admin", adminRoutes);
routes.use("/supplier", supplierRoutes);

module.exports =  routes;