const connection = require("../database/connection");

module.exports = {
  async create(category) {
    const result = await connection("category").insert(category);
    return result;
  },

  async getById({ category_id, user_id }) {
    const result = await connection("category")
      .where({ category_id, user_id })
      .select("*");
    return result;
  },

  async updateById(category_id, category) {
    const result = await connection("category")
      .where({ category_id })
      .update(category);
    return result;
  },

  async deleteById(category_id) {
    const result = await connection("category").where({ category_id }).delete();
    return result;
  },
};
