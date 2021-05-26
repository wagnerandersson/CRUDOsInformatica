// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds"
    }
  },
};
