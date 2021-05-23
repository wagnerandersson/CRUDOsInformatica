
exports.up = (knex) => {
    return knex.schema.createTable('productOs', (table) => {
        table.increments();
        table.string('product', 100).notNullable();
        table.string('description', 300);
        table.string('serial_number', 50).unique();
        // Relacionamento
        table.integer('client_id').notNullable().unsigned();
        table.foreign('client_id')
            .references('clients.id')
            .onDelete('restrict')
            .onUpdate('cascade');
        table.timestamps(true, true);

    })
};

exports.down = (knex) => knex.schema.dropTable('productOs');