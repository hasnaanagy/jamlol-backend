const AppInfo = require("../Model/appInfoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createApp = catchAsync(async (req, res, next) => {
  // Check if any AppInfo document already exists
  const existingApp = await AppInfo.count();

  if (existingApp > 0) {
    return next(new AppError("Only one company can be created", 400));
  }

  // Create new app if no document exists
  const newApp = await AppInfo.create(req.body);

  if (!newApp) {
    return next(new AppError("Failed to create app information", 500));
  }

  res.status(201).json({
    status: "success",
    app: newApp,
  });
});
