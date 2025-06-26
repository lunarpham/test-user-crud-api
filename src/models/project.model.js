import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import User from "./user.model.js";

/*
id (Integer, Primary Key, Auto Increment)
title (String, Required)
description (Text, Optional)
status (Enum (pending, in_progress, completed), Default: pending)
userId (Integer,Foreign Key (references User.id))
*/

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default Project;
