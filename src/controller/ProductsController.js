const knex = require("../database/dbconfig")

module.exports = {

    async index(req, res) {

        try {
            const os = await knex("productOs")
            .select("p.id", "p.description", "p.serial_number", "p.problem_detected", "p.resolution_description", "p.value", "p.active", "c.name", "c.address", "c.email", "c.cpf")
            .from("productOs as p")
            .join("clients as c", "p.client_id", "c.id")
            res.status(200).json(os)

        } catch (error) {
            res.status(400).json({ error: error.message})
        }

    },

    async create(req, res) {
        let { product, description, serial_number, active, client_id } = req.body;

        if (!product || !description) {
            res.status(400).json({ erro: "Nome do produto e descrição é obrigatório!" });
        }

        try {
            const data = await knex("productOs").where({ serial_number })
            if (data.active) {
                res.status(400).json({ error: "Produto já está cadastrado como em manutenção" })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }


        serial_number ? serial_number = serial_number : serial_number = ""

        try {
            const newProduct = await knex("productOs").insert({ product, description, serial_number, active, client_id });
            res.status(201).json({ id: newProduct[0] })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }


    }
}