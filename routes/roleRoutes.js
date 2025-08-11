const { getAllRoles, createRole, updateRole, deleteRole } = require("../controllers/roleController");
const { createRoleValidation, updateRoleValidation } = require("../validators/RBACValidators/insertedData");
const { insertedErrors } = require("../validators/validationResult");

const Router = require("express").Router();

Router.route("/").get(getAllRoles).post(createRoleValidation, insertedErrors, createRole);

Router.route("/:id").get(getAllRoles).patch(updateRoleValidation, insertedErrors, updateRole).delete(deleteRole);
module.exports = Router;
