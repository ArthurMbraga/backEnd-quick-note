const CategoryModel = require("../models/CategoryModel");

module.exports = {
  async create(request, response) {
    try {
      const category = request.body;

      const result = await CategoryModel.create(category);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Category creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create Category",
      });
    }
  },
  
  async getById(request, response) {
    try {
      const { category_id } = request.params;
      const result = await Category.getById(category_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Category getById failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get Category",
      });
    }
  },

  async update(request, response) {
    try {
      const { category_id } = request.params;
      const category = request.body;
      const result = await CategoryModel.updateById(category_id, category);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Category update failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to update Category",
      });
    }
  },

  async delete(request, response) {
    try {
      const { category_id } = request.params;

      const result = await CategoryModel.deleteById(category_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Category delete failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete Category",
      });
    }
  },
};
