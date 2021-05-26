
exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('name', 60).notNullable();
        table.string('email', 120).unique().notNullable();
        table.string('pass', 60).notNullable();
        table.timestamps(true, true)
    })
};

exports.down = (knex) => knex.schema.dropTable('users')


