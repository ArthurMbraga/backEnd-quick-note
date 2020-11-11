const express = require("express");
const routes = express.Router();

const CategoryController = require("./controllers/CategoryController");
const NoteController = require("./controllers/NoteController");
const UserController = require("./controllers/UserController");

const UserValidator = require("./validators/UserValidator");
const CategoryValidator = require("./validators/CategoryValidator");
const NoteValidator = require("./validators/NoteValidator");

// Users
routes.get("/users/:user_id", UserController.getById);
routes.post("/users", UserController.create);
routes.put("/users/:user_id", UserController.update);
routes.delete("/users/:user_id", UserController.delete);

// Category
routes.post("/category", CategoryController.create);
routes.get("/category/:category_id", CategoryController.getById);
routes.put("/category/:category_id", CategoryController.update);
routes.delete("/category/:category_id", CategoryController.delete);

// Note
routes.post("/note", NoteController.create);
routes.get("/note/:user_id", NoteController.getByUser);
routes.put("/note/:note_id", NoteController.update);
routes.delete("/note/:note_id", NoteController.delete);

module.exports = routes;
