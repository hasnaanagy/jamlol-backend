const Router = require("express").Router();
const {
  createPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");
const { createPermissionValidation, updatePermissionValidation } = require("../validators/RBACValidators/insertedData");
const { insertedErrors } = require("../validators/validationResult");

Router.route("/").get(getAllPermissions).post(createPermissionValidation, insertedErrors, createPermission);
Router.route("/:id").patch(updatePermissionValidation, insertedErrors, updatePermission).delete(deletePermission);

module.exports = Router;
