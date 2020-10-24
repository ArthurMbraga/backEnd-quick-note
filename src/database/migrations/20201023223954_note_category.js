exports.up = function (knex) {
  return knex.schema.createTable("note_category", function (table) {
    table.string("note_id").notNullable();
    table
      .foreign("note_id")
      .references("note_id")
      .inTable("note")
      .onDelete("cascade");
      
    table.integer("category_id").notNullable();
    table
      .foreign("category_id")
      .references("category_id")
      .inTable("category")
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("note_category");
};
