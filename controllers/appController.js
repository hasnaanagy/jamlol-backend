const AppInfo = require("../Model/appInfoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createApp = catchAsync(async (req, res, next) => {
  const newApp = await AppInfo.create(req.body);

  if (!newApp) {
    return next(new AppError("Failed to create app information", 500));
  }

  res.status(201).json({
    status: "success",
    data: {
      app: newApp,
    },
  });
});
