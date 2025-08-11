const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Role, User } = require("../Model");
const { where } = require("sequelize");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const users = await User.findAndCountAll({
    include: [{ model: Role, attributes: ["name"] }],
    attributes: { exclude: ["password"] }, // Exclude password field
    offset,
    limit,
  });

  res.status(200).json({
    status: "succeed",
    data: users.rows,
    totalCount: users.count,
    totalPages: Math.ceil(users.count / limit),
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    include: [{ model: Role, attributes: ["name"] }],
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "succeed",
    data: user,
  });
});

// ! not working yet

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  // Update multiple fields
  user.set({
    ...user,
    ...req.body,
  });

  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await user.destroy();
  res.status(204).json({
    status: "success",
  });
});

exports.updateMyData = catchAsync(async (req, res, next) => {
  // TODO 1) check if user want change password

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('if you want to change password go to "/updatepassword" ', 400));
  }

  // TODO 2) check if user want to change it's role  which isn't his responsability

  if (req.body.role) {
    return next(new AppError("you don't have permession to change your role ", 403));
  }

  // TODO 3) update user data

  const { _id } = req.user;
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true }).select(
    "-password"
  );

  if (!updatedUser) {
    return next(new AppError("user doesn't exist or input data is invalid ", 404));
  }

  res.status(200).json({
    status: "succeed",
    updatedUser,
  });
});

exports.deActivateUser = catchAsync(async (req, res, next) => {
  // TODO 1) get user id from
  const { _id } = req.user;

  const deActivatedUser = await User.findByIdAndUpdate(
    _id,
    { active: false },
    { new: true, runValidators: true }
  ).select("-password");

  if (!deActivatedUser) {
    return next(new AppError("user doesn't exist or input data is invalid ", 404));
  }
  res.status(204).json({
    status: "succeed",
    data: null,
  });
});

exports.CreateUser = catchAsync(async (req, res, next) => {
  const { role_id, name, username, phone, email, photo, address, password, person_type, approval_code, status } =
    req.body;

  // TODO 3) Role check and assigning role with user to user role tabel
  const roleData = await Role.findOne({
    where: { id: role_id },
  });

  if (!roleData) {
    return next(new AppError("Role not found", 404));
  }
  //  TODO 4) Create user
  const newUser = await User.create({
    role_id,
    name,
    username,
    phone,
    email,
    photo,
    address,
    password,
    person_type,
    approval_code,
    status,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }

  res.status(201).json({
    status: "succeed",
    message: "User created successfully",
    data: {
      user: newUser,
    },
  });
});
