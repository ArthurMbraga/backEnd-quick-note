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

  async getByUser(user_id, { categoryName }) {
    const filter = { "note.user_id": user_id };

    if (categoryName) filter["category.name"] = categoryName;

    let notes = await connection("note")
      .join("note_category", "note_category.note_id", "note.note_id")
      .join("category", "note_category.category_id", "category.category_id")
      .where(filter)
      .select("note.*");

    const notes_id = notes.map((note) => note.note_id);
    notes = _.keyBy(notes, "note_id");

    let categories = await connection("note_category")
      .join("category", "note_category.category_id", "category.category_id")
      .whereIn("note_category.note_id", notes_id)
      .select("note_category.note_id", "category.category_id", "category.name");

    categories = _.groupBy(categories, "note_id");

    Object.keys(categories).forEach((note_id) => {
      const newCategories = categories[note_id];
      newCategories.map((category) => {
        delete category.note_id;
        return category;
      });

      categories[note_id] = newCategories;
    });

    const result = Object.keys(notes).map((note_id) => {
      const note = notes[note_id];
      note.categories = categories[note_id];

      return note;
    });

    return result;
  },
  
  async getByUser(request, response) {
    try {
      const { user_id } = request.params;
      const result = await NoteModel.getByUser(user_id, request.query);

      return response.status(200).json(result);
    } catch (error) {
      console.warn("Note get failed:", error);

      return response.status(500).json({
        notification: "Internal server error while trying to get Note",
      });
    }
  },
};


