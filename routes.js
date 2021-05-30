const express = require("express");
const routes = express.Router();

const ProductsController = require("./src/controller/ProductsController");
const ClientController = require("./src/controller/ClientsController");
const StockController = require("./src/controller/StockController");
const UserController = require("./src/controller/UserController");
const login = require("./src/middleware/login");

routes
  .get("/products", login, ProductsController.index)
  .get("/products/status", login, ProductsController.olnyActive)
  .get("/products/product/:product", login, ProductsController.searchByProduct)
  .post("/products", login, ProductsController.create)
  .delete("/products/:id", login, ProductsController.delete)
  .put("/products/update/:id", login, ProductsController.update)
  .put("/products/status/:id", login, ProductsController.updateStatus);

routes
  .get("/clients", login, ClientController.index)
  .post("/clients", login, ClientController.create)
  .delete("/clients/:cpf", login, ClientController.delete)
  .put("/clients/update/:cpf", login, ClientController.update);

routes
  .get("/stock", login, StockController.index)
  .get("/stock/search/:name", login, StockController.getByName)
  .post("/stock", login, StockController.create)
  .delete("/stock/:id", login, StockController.delete)
  .put("/stock/product/:id", login, StockController.update);

routes
  .get("/users", login, UserController.index)
  .post("/users", UserController.create)
  .post("/login", UserController.login);

module.exports = routes;
