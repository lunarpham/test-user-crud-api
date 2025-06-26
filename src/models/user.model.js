import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      notEmpty: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    age: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
