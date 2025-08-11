// validators/usevalidations/insertedData.js
const { body } = require("express-validator");
const userModel = require("../../Model/userModel"); // تأكدي إن ده model بتاع Sequelize
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const loginSchema = require("../../ajv/loginSchema");
const RegisterSchema = require("../../ajv/registerationSchema");

module.exports = {
  userData: [
    body("name").isString().withMessage("name must be a string"),
    body("name").isLength({ min: 3 }).withMessage("name must be at least 3 chars long"),
  ],
  userId: [
    (req, res, next) => {
      const id = req.params.id * 1;
      if (typeof id !== "number" || isNaN(id)) {
        next(new Error("id is not valid"));
      }
      next();
    },
  ],
  loginDataValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(loginSchema, req.body);
      if (!isValid) {
        next(new Error(ajv.errorsText()));
      }
      next();
    },
  ],
  signUpDataValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(RegisterSchema, req.body);
      if (!isValid) {
        next(new Error(ajv.errorsText()));
      }
      next();
    },
  ],
  checkUserExists: [
    async (req, res, next) => {
      try {
        const email = req.body.email;
        const user = await userModel.findOne({ where: { email } });
        if (user) {
          const validPassword = await bcrypt.compare(req.body.password, user.password);
          if (!validPassword) {
            next(new Error("invalid password"));
          }
        } else {
          next(new Error("user not found"));
        }
        next();
      } catch (err) {
        next(err);
      }
    },
  ],
  checkUserNotExists: [
    async (req, res, next) => {
      try {
        const email = req.body.email;
        const user = await userModel.findOne({ where: { email } });
        if (user) {
          next(new Error("user already exists"));
        }
        next();
      } catch (err) {
        next(err);
      }
    },
  ],
};
