require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "ec2-174-129-225-160.compute-1.amazonaws.com",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

module.exports = knex;
