const { getAllRoles, createRole, updateRole, deleteRole } = require("../controllers/roleController");

const Router = require("express").Router();

Router.route("/").get(getAllRoles).post(createRole);

Router.route("/:id").get(getAllRoles).patch(updateRole).delete(deleteRole);
module.exports = Router;
