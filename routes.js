const express = require('express');
const routes = express.Router();

const ProductsController = require("./src/controller/ProductsController")
const ClientController = require("./src/controller/ClientsController")






routes.get("/products", ProductsController.index)
    .get("/products/status", ProductsController.olnyActive)
    .get("/products/product/:product", ProductsController.searchByProduct)
    .post("/products", ProductsController.create)
    .delete('/products/:id', ProductsController.delete)
    .put('/products/update/:id', ProductsController.update)
    .put('/products/status/:id', ProductsController.updateStatus)

routes.get("/clients", ClientController.index)
    .post("/clients", ClientController.create)
    .delete("/clients/:cpf", ClientController.delete)
    .put("/clients/update/:cpf", ClientController.update)





module.exports = routes