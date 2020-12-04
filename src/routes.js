const express = require("express");
const routes = express.Router();

const auth = require("./middlewares/authentication");

const CategoryController = require("./controllers/CategoryController");
const CategoryValidator = require("./validators/CategoryValidator");

const UserController = require("./controllers/UserController");
const UserValidator = require("./validators/UserValidator");

const NoteController = require("./controllers/NoteController");
const NoteValidator = require("./validators/NoteValidator");

const SessionController = require("./controllers/SessionController");

// Session
routes.post("/login", SessionController.signIn);

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
routes.post(
  "/note",
  NoteValidator.create,
  auth.authenticateToken,
  NoteController.create
);

routes.get(
  "/note",
  NoteValidator.getAll,
  auth.authenticateToken,
  NoteController.getAll
);

routes.get(
  "/note/:user_id",
  NoteValidator.getByUser,
  auth.authenticateToken,
  NoteController.getByUser
);

routes.put(
  "/note/:note_id",
  NoteValidator.update,
  auth.authenticateToken,
  NoteController.update
);

routes.delete(
  "/note/:note_id",
  NoteValidator.delete,
  auth.authenticateToken,
  NoteController.delete
);

module.exports = routes;
