const NoteModel = require("../models/NoteModel");

module.exports = {
  async create(request, response) {
    try {
      const { user_id } = request.session.user;
      const newNote = request.body;
      newNote.user_id = user_id;

      const result = await NoteModel.create(newNote);

      return response.status(200).json({ note_id: result });
    } catch (error) {
      console.warn("Note creation failed:", error);

      return response.status(500).json({
        notification: "Internal server error while trying to create Note",
      });
    }
  },

  async getByUser(request, response) {
    try {
      const { user_id } = request.params;

      const result = await NoteModel.getByUserWithFilters(
        user_id,
        request.query
      );

      return response.status(200).json(result);
    } catch (error) {
      console.warn("Note get failed:", error);

      return response.status(500).json({
        notification: "Internal server error while trying to get Notes",
      });
    }
  },

  async update(request, response) {
    try {
      const { note_id } = request.params;
      const newNote = request.body;

      await NoteModel.updateById(note_id, newNote);

      return response
        .status(200)
        .json({ notification: "Note updated sucessfully" });
    } catch (error) {
      console.warn("Note update failed:", error);

      return response.status(500).json({
        notification: "Internal server error while trying to update Note",
      });
    }
  },

  async delete(request, response) {
    try {
      const { note_id } = request.params;
      const result = await NoteModel.deleteById(note_id);

      if (result === 0)
        return response.status(400).json({ notification: "note_id not found" });

      console.log(result);
      return response
        .status(200)
        .json({ notification: "Note deleted sucessfully" });
    } catch (error) {
      console.warn("Note delete failed:", error);

      return response.status(500).json({
        notification: "Internal server error while trying to delete Note",
      });
    }
  },

  async getAll(request, response) {
    try {
      const { user_id } = request.session.user;

      const result = await NoteModel.getAll(user_id);

      return response.status(200).json(result);
    } catch (error) {
      console.warn("Note getAll failed:", error);

      return response.status(500).json({
        notification: "Internal server error while trying to get Notes",
      });
    }
  },
};
