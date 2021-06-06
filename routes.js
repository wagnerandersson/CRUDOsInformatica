const express = require("express");
const routes = express.Router();

const ProductsController = require("./src/controller/ProductsController");
const ClientController = require("./src/controller/ClientsController");
const StockController = require("./src/controller/StockController");
const UserController = require("./src/controller/UserController");
//const login = require("./src/middleware/login");

routes
  .get("/products", ProductsController.index)
  .get("/products/status", ProductsController.olnyActive)
  .get("/products/product/:product", ProductsController.searchByProduct)
  .post("/products", ProductsController.create)
  .delete("/products/:id", ProductsController.delete)
  .put("/products/update/:id", ProductsController.update)
  .put("/products/status/:id", ProductsController.updateStatus);

routes
  .get("/clients", ClientController.index)
  .post("/clients", ClientController.create)
  .delete("/clients/:cpf", ClientController.delete)
  .put("/clients/update/:cpf", ClientController.update);

routes
  .get("/stock", StockController.index)
  .get("/stock/search/:name", StockController.getByName)
  .post("/stock", StockController.create)
  .delete("/stock/:id", StockController.delete)
  .put("/stock/product/:id", StockController.update);

routes
  .get("/users", UserController.index)
  .post("/users", UserController.create)
  .post("/login", UserController.login);

module.exports = routes;
