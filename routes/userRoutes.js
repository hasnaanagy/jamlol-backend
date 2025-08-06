const {
  userId,
  loginDataValidation,
  signUpDataValidation,
  checkUserExists,
  checkUserNotExists,
} = require("../validators/UserValidations/insertedData.js");
const { insertedUserErrors } = require("../validators/UserValidations/validationResult.js");
const { getAllUsers, CreateUser, getUser, deleteUser, updateUser } = require("../controllers/userController");

const Router = require("express").Router();

Router.route("/").get(getAllUsers).post(signUpDataValidation, insertedUserErrors, CreateUser);
Router.route("/:id").patch(userId, insertedUserErrors, updateUser).get(getUser).delete(userId, deleteUser); // dpdate ypur profile (add more information)

module.exports = Router;
