exports.up = function (knex) {
  return knex.schema.createTable("category", function (table) {
    table.increments("category_id").primary().notNullable();
    table.string("user_id").notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("user")
      .onDelete("cascade");
    table.string("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("category");
};
