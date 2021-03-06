const knex = require("../database/dbconfig");

module.exports = {
  async index(req, res) {
    const clients = await knex("clients").orderBy("name", "desc");

    res.status(200).json(clients);
  },

  async create(req, res) {
    const { name, address, email, cpf } = req.body;

    if (!name || !cpf) {
      res.status(400).json({ error: "Nome e CPF são obrigatórios" });
    }

    try {
      const mail = await knex("clients").where({ email });
      if (mail.length > 0) {
        res.status(400).json("Email já cadastrado");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    try {
      const newClient = await knex("clients").insert({
        name,
        address,
        email,
        cpf,
      });
      res.status(201).json("Cadastro realizado com sucesso!");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { cpf } = req.params;
    const client = await knex("clients").where({ cpf });

    try {
      await knex("clients").del().where({ cpf });
      res.status(200).json(client[0]);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async update(req, res) {
    const { cpf } = req.params;
    const { name, address, email } = req.body;

    try {
      const mail = await knex("clients").where({ email });
      if (mail.length > 0) {
        res.status(400).json({ error: "Email já cadastrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    try {
      const updateClient = await knex("clients")
        .where({ cpf })
        .update({ name, address, email });
      const updatedClient = await knex("clients").where({ cpf });
      res.status(200).json({ ...updatedClient[0] });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
