const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.TEXT,
    },
    groupBy: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: "tbl_permissions",
  }
);

module.exports = Permission;
