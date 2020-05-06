
exports.up = function(knex) {
    return knex.schema.createTable('local', function (table) {
        table.increments()
        table.string('nome').notNullable()
        table.string('descricao').notNullable()
        table.string('imagemCard').notNullable()
        table.string('imagemDetail').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.boolean('destaque').notNullable()
    })
};
    
exports.down = function(knex) {
    return knex.schema.dropTable('local')
};
