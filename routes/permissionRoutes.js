const Router = require("express").Router();
const {
  createPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");

Router.route("/").get(getAllPermissions).post(createPermission);
Router.route("/:id").patch(updatePermission).delete(deletePermission);

module.exports = Router;
