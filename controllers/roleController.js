const { Op } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");
const { Role, RolePermission, Permission } = require("../Model");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Permission,
        attributes: ["name"], // Include only specific attributes from Permission
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
  const { name, Permissions } = req.body;

  // TODO 1. get all permissions name from Permissions array of objects
  const PermissionsNames = [...new Set(Permissions.flatMap((permission) => Object.keys(permission)))];

  // TODO 2. validate if all permissions exist in Permissions Model

  const existingPermissions = await Permission.findAll({
    where: { name: { [Op.in]: PermissionsNames } },
    transaction,
  });
  if (existingPermissions.length !== PermissionsNames.length) {
    await transaction.rollback();
    return next(new appError("Some permissions not found", 404));
  }

  // TODO 3. create role
  const newRole = await Role.create({ name });
  console.log("🚀 ~ newRole:", newRole.dataValues.id);

  // TODO 4. create role_permissions entries
  const rolePermissions = existingPermissions.map((permission) => ({
    role_id: newRole.dataValues.id,
    permission_id: permission.dataValues.id,
  }));

  // TODO 5. bulk create role_permissions
  await RolePermission.bulkCreate(rolePermissions, { transaction });
  await transaction.commit();

  const roleWithPermissions = await Role.findByPk(newRole.dataValues.id, {
    include: [
      {
        model: Permission,
        attributes: ["name", "slug", "groupBy"],
        through: { attributes: [] },
      },
    ],
  });

  res.status(201).json({
    status: "success",
    data: {
      role: roleWithPermissions,
    },
  });
});

exports.updateRole = catchAsync(async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { name, Permissions } = req.body;

    const role = await Role.findByPk(id, { transaction });
    if (!role) {
      await transaction.rollback();
      return next(new appError("Role not found", 404));
    }

    // تحديث الـ name لو موجود
    if (name) {
      role.set({ name });
      await role.save({ transaction });
    }

    // تحديث الـ permissions لو موجودة
    if (Permissions && Permissions.length > 0) {
      const PermissionsNames = [...new Set(Permissions.flatMap((p) => Object.keys(p)))];
      console.log(PermissionsNames);
      const existingPermissions = await Permission.findAll({
        where: { name: { [Op.in]: PermissionsNames } },
        transaction,
      });
      if (existingPermissions.length !== PermissionsNames.length) {
        await transaction.rollback();
        return next(new appError("Some permissions not found", 404));
      }

      // حذف الـ permissions القديمة
      await RolePermission.destroy({ where: { role_id: id }, transaction });

      // إنشاء الـ permissions الجديدة
      const rolePermissions = existingPermissions.map((permission) => ({
        role_id: id,
        permission_id: permission.id,
      }));
      await RolePermission.bulkCreate(rolePermissions, { transaction });
    }

    // جلب الـ role مع الـ permissions
    const roleWithPermissions = await Role.findByPk(id, {
      include: [
        {
          model: Permission,
          attributes: ["name", "slug", "groupBy"],
          through: { attributes: [] },
        },
      ],
      transaction,
    });

    await transaction.commit();

    res.status(200).json({
      status: "success",
      data: { role: roleWithPermissions },
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
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
