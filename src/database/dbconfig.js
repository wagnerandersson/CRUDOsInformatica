require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = knex;
