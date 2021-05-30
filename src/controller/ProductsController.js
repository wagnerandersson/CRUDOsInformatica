const knex = require("../database/dbconfig")
const { update } = require("./ClientsController")


module.exports = {

    async index(req, res) {

        try {
            const os = await knex("productOs")
            .select("p.id", "p.product", "p.description", "p.serial_number", "p.problem_detected", "p.resolution_description", "p.value", "p.active", "c.name", "c.address", "c.email", "c.cpf")
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

    },

    async delete(req, res) {
        const { id } = req.params;
        
        try {
            await knex('productOs').del().where({ id })
            res.status(200).json("Os deletada com sucesso")
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { product, description, serial_number, active, problem_detected, resolution_description, value } = req.body

        try {
            const haveId = await knex("productOs").where({ id })
            if (haveId.length <= 0) {
                res.status(400).json("Produto Inexistente")
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

        try {
            await knex("productOs").where({ id }).update({ product, description, serial_number, active, problem_detected, resolution_description, value })
            const updatedOs = await knex("productOs").where({ id })
            res.status(200).json(updatedOs)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    },

    async updateStatus(req, res) {
        const { id } = req.params
        const takeStatus = await knex("productOs").where({ id })
        let active;
        console.log(takeStatus[0].active)
        
        try {
            if(takeStatus[0].active) {
                active = false
                await knex("productOs").where({ id }).update({ active })
                res.status(200).json("Status Atualizado")
            } else {
                active = true
                await knex("productOs").where({ id }).update({ active })
                res.status(200).json("Status Atualizado")                
            }
        } catch (error) {
            res.status(400).json({ error: error.message })            
        }
    },

    async olnyActive(req, res) {
        try {
            const os = await knex("productOs").where({active: true})
            console.log(os)
            res.status(200).json(os)

        } catch (error) {
            res.status(400).json({ error: error.message})
        }

    },

    async searchByProduct(req, res) {
        const { product } = req.params;
        console.log(product)
        try {
            const os = await knex("productOs").where('product', 'like', `%${product}%`)
            res.status(200).json(os[0])
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    
    
}

