const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");

const AppInfo = sequelize.define(
  "app_info",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    app_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    app_email: {
      type: DataTypes.STRING,
    },
    app_phone: {
      type: DataTypes.STRING,
    },
    app_address: {
      type: DataTypes.STRING,
    },
    app_description: {
      type: DataTypes.STRING,
    },
    app_logo: {
      type: DataTypes.STRING,
    },
    app_footer_text: {
      type: DataTypes.STRING,
    },
    app_primary_color: {
      type: DataTypes.STRING,
    },
    maintenance_mode: {
      type: DataTypes.ENUM("enabled", "disabled"),
      defaultValue: "disabled",
    },
    currency: {
      type: DataTypes.STRING,
    },
    app_website: {
      type: DataTypes.STRING,
    },
    app_facebook: {
      type: DataTypes.STRING,
    },
    app_twitter: {
      type: DataTypes.STRING,
    },
    app_instagram: {
      type: DataTypes.STRING,
    },
    app_snapchat: {
      type: DataTypes.STRING,
    },
    app_whatsapp: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = AppInfo;
