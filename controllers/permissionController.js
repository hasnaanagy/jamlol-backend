const { Permission, RolePermission } = require("../Model");
const catchAsync = require("../utils/catchAsync");

exports.createPermission = catchAsync(async (req, res, next) => {
  const { name, slug, groupBy } = req.body;
  if (!name) {
    return next(new Error("Permission name is required"));
  }

  const newPermission = await Permission.create({
    name,
    slug,
    groupBy,
  });

  res.status(201).json({
    status: "success",
    data: newPermission,
    message: "Permission created successfully",
  });
});

exports.getAllPermissions = catchAsync(async (req, res, next) => {
  const permission = await Permission.findAll({});

  res.status(201).json({
    status: "success",
    data: permission,
  });
});

exports.updatePermission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, slug, groupBy } = req.body;

  const permission = await Permission.findByPk(id);
  if (!permission) {
    throw new Error("Permission not found");
  }

  // Update multiple fields
  permission.set(req.body);

  await permission.save();
  res.status(200).json({
    status: "success",
    data: permission,
  });
});

exports.deletePermission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const rolePermissions = await RolePermission.findAll({
    where: { permissionId: id },
  });

  if (rolePermissions.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Cannot delete permission because it is associated with one or more roles",
    });
  }

  // Find the permission
  const permission = await Permission.findByPk(id);
  if (!permission) {
    return res.status(404).json({ success: false, message: "Permission not found" });
  }
  await permission.destroy();
  res.status(204).json({
    status: "success",
    message: "Permission deleted successfully",
  });
});
