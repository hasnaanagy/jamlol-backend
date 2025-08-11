const { body, param, query } = require("express-validator");
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const { appInfoSchema } = require("../../ajv/appInfoSchema");
const AppError = require("../../utils/appError");

exports.appInfoDataValidation = [
  (req, res, next) => {
    const isValid = ajv.validate(appInfoSchema, req.body);
    if (!isValid) {
      return next(new AppError(ajv.errorsText(), 400));
    }
    next();
  },
];
