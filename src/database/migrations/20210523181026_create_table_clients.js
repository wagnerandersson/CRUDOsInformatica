exports.up = (knex) => {
  return knex.schema.createTable("clients", (table) => {
    table.increments();
    table.string("name", 60).notNullable();
    table.string("address", 60).notNullable();
    table.string("email", 120).unique().notNullable();
    table.string("cpf", 14).unique().notNullable();
  });
};

exports.down = (knex) => knex.schema.dropTable("clients");
