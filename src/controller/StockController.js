const knex = require("../database/dbconfig");

module.exports = {
  async index(req, res) {
    const clients = await knex("stock").orderBy("product_name", "desc");

    res.status(200).json(clients);
  },

  async create(req, res) {
    const { product_name, amount, tag, image } = req.body;

    if (!product_name || !amount) {
      res.status(400).json("Quantidade e nome do produto são obrigatórios");
    }

    try {
      const serial = await knex("stock").where({ tag });
      if (serial.length > 0) {
        res.status(400).json({ error: "Produto já existe" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    try {
      const newClient = await knex("stock").insert({
        product_name,
        amount,
        tag,
        image,
      });
      console.log(newClient);
      res.status(201).json("Produto cadastrado com sucesso");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await knex("stock").del().where({ id });
      res.status(200).json("Produto deletado");
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { product_name, amount, tag, image } = req.body;

    try {
      const updateClient = await knex("stock")
        .where({ id })
        .update({ product_name, amount, tag, image });
      const updatedClient = await knex("stock").where({ id });
      res.status(200).json({ ...updatedClient[0] });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByName(req, res) {
    const { product_name } = req.params;

    try {
      const product = await knex("stock").where(
        "product_name",
        "like",
        `%${product_name}%`
      );
      console.log(product);
      res.status(200).json(product[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
