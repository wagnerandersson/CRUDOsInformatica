const express = require('express');
const routes = express.Router();

const ProductsController = require("./src/controller/ProductsController")
const ClientController = require("./src/controller/ClientsController")






routes.get("/products", ProductsController.index)
    .post("/products", ProductsController.create)

routes.get("/clients", ClientController.index)
    .post("/clients", ClientController.create)
    .delete("/clients/:cpf", ClientController.delete)





module.exports = routes