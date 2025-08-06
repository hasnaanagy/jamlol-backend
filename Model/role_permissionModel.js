const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" },
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "permissions", key: "id" },
    },
  },
  {
    timestamps: true,
    tableName: "role_permissions",
  }
);

module.exports = RolePermission;
