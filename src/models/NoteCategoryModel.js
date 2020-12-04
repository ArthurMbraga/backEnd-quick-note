const connection = require("../database/connection");

module.exports = {
  async create(category) {
 
    const result = await connection("category").insert(category);
    return result;
  },

  async getById({ category_id, note_id }) {
    const result = await connection("category")
      .where({ category_id, note_id })
      .select("*")
      .first();
    return result;
  },
};
