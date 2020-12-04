exports.up = function (knex) {
  return knex.schema.createTable("note", function (table) {
    table.string("note_id").primary().notNullable();
    table.string("user_id").notNullable();
    table.foreign("user_id").references("user_id").inTable("user").onDelete("cascade");
    table.string("title").notNullable();
    table.string("description").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("note");
};
