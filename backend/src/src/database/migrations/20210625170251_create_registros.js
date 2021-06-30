exports.up = function (knex) {
  return knex.schema.createTable('registros', function (table) {
    table.increments();

    table.datetime('entrada').notNullable();
    table.datetime('saida_almoco');
    table.datetime('retorno_almoco');
    table.datetime('saida_lanche');
    table.datetime('retorno_lanche');
    table.datetime('saida');
    table.datetime('hrs_trabalhadas')
    table.string('tipo_batida', 20).notNullable();
    table.datetime('created_at').notNullable();

    table.string('funcionarios_id').notNullable();

    table.foreign('funcionarios_id').references('id').inTable('funcionarios');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('registros');
};
