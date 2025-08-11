const { userId, signUpDataValidation, checkUserNotExists } = require("../validators/UserValidations/insertedData.js");
const { insertedErrors } = require("../validators/validationResult.js");
const { getAllUsers, CreateUser, getUser, deleteUser, updateUser } = require("../controllers/userController");

const Router = require("express").Router();

Router.route("/").get(getAllUsers).post(signUpDataValidation, checkUserNotExists, insertedErrors, CreateUser);
Router.route("/:id").patch(userId, insertedErrors, updateUser).get(getUser).delete(userId, deleteUser);

module.exports = Router;
