const { v4: uuidv4 } = require("uuid");
const connection = require("../database/connection");

module.exports = {
  async create(note) {
    const note_id = uuidv4();
    note.note_id = note_id;

    const result = await connection("note").insert(note);
    return result;
  },

  async getById(note_id) {
    const result = await connection("note")
      .where({ note_id })
      .select("*")
      .first();
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
