
exports.up = (knex) => {
    return knex.schema.createTable('stock', (table) => {
        table.increments();
        table.string('product_name', 60).notNullable();
        table.string('tag', 100);
        table.integer('amount', 6).notNullable()
        table.string('image', 300);
    })
};

exports.down = (knex) => knex.schema.dropTable('stock')