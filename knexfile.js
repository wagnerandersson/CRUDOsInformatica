// Update with your config settings.
require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
  },

  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
  },
};
