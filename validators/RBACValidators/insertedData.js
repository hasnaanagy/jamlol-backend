// validators/RBACValidators/insertedData.js
const { body, param } = require("express-validator");
const Ajv = require("ajv").default;
const ajv = new Ajv();
const permissionSchema = require("../../ajv/permissionSchema");
const permissionModel = require("../../Model/permissionModel");
const roleSchema = require("../../ajv/roleSchema");

module.exports = {
  createPermissionValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(permissionSchema, req.body);
      if (!isValid) {
        next(new Error(ajv.errorsText()));
      }
      next();
    },
    body("name").isString().withMessage("Permission name must be a string"),
    body("slug").optional().isString().withMessage("Slug must be a string"),
    body("groupBy").optional().isInt().withMessage("groupBy must be an integer"),
  ],
  updatePermissionValidation: [
    (req, res, next) => {
      const updateSchema = {
        ...permissionSchema,
        required: [],
      };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        next(new Error(ajv.errorsText()));
      }
      next();
    },
    body("name").optional().isString().withMessage("Permission name must be a string"),
    body("slug").optional().isString().withMessage("Slug must be a string"),
    body("groupBy").optional().isInt().withMessage("groupBy must be an integer"),
    param("id").isInt().withMessage("Permission ID must be a number"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const permission = await permissionModel.findByPk(id);
        if (!permission) {
          next(new Error("Permission not found"));
        }
        next();
      } catch (err) {
        next(err);
      }
    },
  ],
  createRoleValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(roleSchema, req.body);
      if (!isValid) {
        next(new Error(ajv.errorsText()));
      }
      next();
    },
    body("name").isString().withMessage("role name must be a string"),
  ],
  updateRoleValidation: [
    (req, res, next) => {
      const updateSchema = { ...roleSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        next(new Error(ajv.errorsText()));
      }
      next();
    },
    body("name").optional().isString().withMessage("Role name must be a string"),
    param("id").isInt().withMessage("Role ID must be a number"),
  ],
};
