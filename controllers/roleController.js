const { Op } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");
const { Role, RolePermission, Permission } = require("../Model");
const catchAsync = require("../utils/catchAsync");
const { createOne, getOne, getAll, updateOne, deleteOne } = require("./factoryHandler");
const appError = require("../utils/appError");

exports.getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Permission,
        attributes: ["name", "description"], // Include only specific attributes from Permission
        through: { attributes: [] }, // Exclude the join table attributes
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: roles,
  });
});

exports.createRole = catchAsync(async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { name, description, Permissions } = req.body;
  console.log("🚀 ~ name:", name);

  // TODO 1. get all permissions name from Permissions array of objects
  const PermissionsNames = [...new Set(Permissions.flatMap((permission) => Object.keys(permission)))];
  console.log("🚀 ~ PermissionsNames:", PermissionsNames);

  // TODO 2. validate if all permissions exist in Permissions Model

  const existingPermissions = await Permission.findAll({
    where: { name: { [Op.in]: PermissionsNames } },
    transaction,
  });
  if (existingPermissions.length !== PermissionsNames.length) {
    await transaction.rollback();
    return next(new appError("Some permissions not found", 404));
  }

  console.log("🚀 ~ existingPermissions:", existingPermissions);

  // TODO 3. create role

  const newRole = await Role.create({ name, description });

  // TODO 4. create role_permissions entries

  const rolePermissions = existingPermissions.map((permission) => ({
    role_id: newRole.id,
    permission_id: permission.dataValues.id,
  }));

  console.log("🚀 ~ rolePermissions:", rolePermissions);

  // TODO 5. bulk create role_permissions
  await RolePermission.bulkCreate(rolePermissions, { transaction });

  await transaction.commit();

  res.status(201).json({
    status: "success",
    data: {
      role: newRole,
    },
  });
});

exports.updateRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, Permissions } = req.body;
  console.log("🚀 ~ updateRole ~ id:", id);
  // get Role from DB

  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error("Role not found");
  }

  // Update multiple fields
  role.set({
    name,
    description,
  });

  await role.save();
  // check if Permissions are provided is already exist

  if (Permissions && Permissions.length > 0) {
    const PermissionsNames = [...new Set(Permissions.flatMap((permission) => Object.keys(permission)))];
    console.log("🚀 ~ PermissionsNames:", PermissionsNames);
    const existingPermissions = await Permission.findAll({
      where: { name: { [Op.in]: PermissionsNames } },
    });

    if (existingPermissions.length !== Permissions.length) {
      return next(new appError("Some permissions not found", 404));
    }

    // Clear existing role permissions
    await RolePermission.destroy({ where: { role_id: id } });

    //  Create new role permissions
    const rolePermissions = existingPermissions.map((permission) => ({
      role_id: id,
      permission_id: permission.id,
    }));

    await RolePermission.bulkCreate(rolePermissions);
  }

  res.status(200).json({
    status: "success",
    data: {
      role: role,
    },
  });
});

exports.deleteRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (!role) {
    return next(new appError("Role not found", 404));
  }
  // Remove related role permissions first (optional, for clean DB)
  await RolePermission.destroy({ where: { role_id: id } });
  await role.destroy();
  res.status(204).json({
    status: "success",
    message: "Role deleted successfully",
  });
});
