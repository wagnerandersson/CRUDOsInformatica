// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: { client: "pg", connection: process.env.DATABASE_URL },
  production: { client: "pg", connection: process.env.DATABASE_URL },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
    directory: "src/database/migrations",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
};
