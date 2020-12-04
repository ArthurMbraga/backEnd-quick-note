const { v4: uuidv4 } = require("uuid");
const connection = require("../database/connection");
const _ = require("lodash");

module.exports = {
  async create(note) {
    const note_id = uuidv4();
    note.note_id = note_id;

    await connection("note").insert(note);

    return note_id;
  },

  async getById(note_id) {
    const result = await connection("note")
      .where({ note_id })
      .select("*")
      .first();

    return result;
  },

  async getAll(user_id) {
    const result = await connection("note").where({ user_id }).select("*");

    return result;
  },

  async getByUserWithFilters(user_id, { categoryName }) {
    const filter = { "note.user_id": user_id };

    if (categoryName) filter["category.name"] = categoryName;

    let notas = await connection("note")
      .innerJoin("note_category", "note.note_id", "note_category.note_id")
      .innerJoin(
        "category",
        "category.category_id",
        "note_category.category_id"
      )
      .where(filter)
      .distinct("note.note_id")
      .select("note.*");

    const notes_id = notas.map((note) => note.note_id);
    notas = _.groupBy(notas, "note_id");

    let categories = await connection("note_category")
      .join("category", "note_category.category_id", "category.category_id")
      .whereIn("note_category.note_id", notes_id)
      .select("category.name", "category.category_id", "note_category.note_id");
    categories = _.groupBy(categories, "note_id");

    const result = Object.keys(notas).map((note_id) => {
      const note = notas[note_id][0];
      note.categories = categories[note_id];

      return note;
    });

    return result;
  },

  async updateById(note_id, note) {
    const result = await connection("note").where({ note_id }).update(note);
    return result;
  },

  async deleteById(note_id) {
    const result = await connection("note").where({ note_id }).delete();
    return result;
  },
};
