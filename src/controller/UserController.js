const knex = require("../database/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const users = await knex("users");
    res.status(200).json(users);
  },

  async create(req, res) {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {
      res.status(400).json("Nome, email e senha são obrigatórios!");
    }

    try {
      const mail = await knex("users").where({ email });
      if (mail.length > 0) {
        res.status(400).json("Email já existe");
        return;
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    const hash = bcrypt.hashSync(pass, 10);

    try {
      const user = await knex("users").insert({ name, email, pass: hash });
      res.status(201).json({ ...user[0] });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { email, pass } = req.body;

    if (!email || !pass) {
      res.status(400).json({ erro: "Login ou senha incorretos" });
      return;
    }

    try {
      const data = await knex("users").where({ email });
      if (data.length == 0) {
        res.status(400).json({ err: "Login ou senha incorretos" });
        return;
      }

      if (bcrypt.compareSync(pass, data[0].pass)) {
        const token = jwt.sign(
          {
            users_id: data[0].id,
            users_name: data[0].name,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ msg: "Acesso Liberado", token });
      } else {
        res.status(400).json({ err: "Login ou senha incorretos" });
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
};
