const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    person_type: {
      type: DataTypes.ENUM("supplier", "client", "carrier", "admin"),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: { model: "roles", key: "id" },
      },
      allowNull: false,
    },
    approval_code: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("active", "inActive"),
      allowNull: false,
      defaultValue: "inActive",
    },
  },
  {
    timestamps: true,
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

module.exports = User;
