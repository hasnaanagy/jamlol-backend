const { validationResult } = require("express-validator");
const appError = require("../utils/appError");

module.exports = {
  insertedErrors: (req, res, next) => {
    const errors = validationResult(req);
    let message = errors
      .array()
      .map((error) => error.msg)
      .join(",");
    let error = new appError(message, 400);
    if (!errors.isEmpty()) {
      error.status = 500;
      next(error);
    }
    next();
  },
};
