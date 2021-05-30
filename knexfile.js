// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "d2v2ob800d6958",
      port: 5432,
      user: "xtryliecqroigm",
      password:
        "c64f684fcc160717ae1afe370197f87e57ef791e52c6a86579f3637a9df24d72",
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
      directory: "./src/database/seeds",
    },
  },
};
