const Router = require("express").Router();
const { createApp } = require("../controllers/appController");
const { appInfoDataValidation } = require("../validators/AppInfoValidations/appInfo");
Router.route("/").post(appInfoDataValidation, createApp);

module.exports = Router;
