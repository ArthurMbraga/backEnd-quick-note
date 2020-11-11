const express = require("express");
const routes = express.Router();

const CategoryController = require("./controllers/CategoryController");
const CategoryValidator = require("./validators/CategoryValidator");

const UserController = require("./controllers/UserController");
const UserValidator = require("./validators/UserValidator");

const NoteController = require("./controllers/NoteController");
const NoteValidator = require("./validators/NoteValidator");

// Users
routes.get("/users/:user_id", UserValidator.getById, UserController.getById);
routes.post("/users", UserValidator.create, UserController.create);
routes.put("/users/:user_id", UserValidator.update, UserController.update);
routes.delete("/users/:user_id", UserValidator.delete, UserController.delete);

// Category
routes.post("/category", CategoryValidator.create, CategoryController.create);
routes.get(
  "/category/:category_id",
  CategoryValidator.getById,
  CategoryController.getById
);
routes.put(
  "/category/:category_id",
  CategoryValidator.update,
  CategoryController.update
);
routes.delete(
  "/category/:category_id",
  CategoryValidator.delete,
  CategoryController.delete
);

// Note
routes.post("/note", NoteValidator.create, NoteController.create);
routes.get("/note/:user_id", NoteValidator.getByUser, NoteController.getByUser);
routes.put("/note/:note_id", NoteValidator.update, NoteController.update);
routes.delete("/note/:note_id", NoteValidator.delete, NoteController.delete);

module.exports = routes;
