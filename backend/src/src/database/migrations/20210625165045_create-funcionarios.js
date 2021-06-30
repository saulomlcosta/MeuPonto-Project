exports.up = function (knex) {
  return knex.schema.createTable('funcionarios', function (table) {
    table.string('id').primary();
    table.string('nome',50).notNullable();
    table.string('cpf',11).notNullable();
    table.string('email',50).notNullable();
    table.string('whatsapp',14).notNullable();
    table.string('cidade',50).notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('funcionarios');
};
