const Router = require("express").Router();
const { getAllRolePermissions } = require("../controllers/rolePermissionController");

Router.route("/").get(getAllRolePermissions);

module.exports = Router;
