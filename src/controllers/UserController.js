const UserModel = require("../models/UserModel");

const familiaPera = [
  {
    id: 0,
    name: "Arthur Braga",
  },
  {
    id: 1,
    name: "Arthur Lima",
  },
  {
    id: 2,
    name: "Maria",
  },
  {
    id: 3,
    name: "Gabriel Andrade",
  },
  {
    id: 4,
    name: "Gabriel Junqueira",
  },
  {
    id: 5,
    name: "Paloma",
  },
  {
    id: 6,
    name: "Diogo",
  },
];

module.exports = {
  async create(request, response) {
    try {
      const user = request.body;

      const result = await UserModel.create(user);
      return response.status(200).json({ user_id: result });
    } catch (err) {
      console.log("User creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create User",
      });
    }
  },

  async getById(request, response) {
    try {
      const { user_id } = request.params;
      const result = await User.getById(user_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("User getById failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get User",
      });
    }
  },

  async update(request, response) {
    try {
      const { user_id } = request.params;
      const user = request.body;
      const result = await UserModel.updateById(user_id, user);

      return response.status(200).json(result);
    } catch (err) {
      console.log("User update failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to update User",
      });
    }
  },

  async delete(request, response) {
    try {
      const { user_id } = request.params;

      const result = await UserModel.deleteById(user_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("User delete failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete User",
      });
    }
  },
};
