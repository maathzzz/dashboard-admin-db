const routes =  require("express").Router();

const userRoutes = require("./userRoutes");
const adminRoutes =  require("./adminRoutes");

routes.use("/users", userRoutes);
routes.use("/admin", adminRoutes);

module.exports =  routes;