import User from "./user.model.js";
import Project from "./project.model.js";

User.belongsToMany(Project, {
  through: "UserProjects",
  foreignKey: "userId",
  otherKey: "projectId",
  as: "projects",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Project.belongsToMany(User, {
  through: "UserProjects",
  foreignKey: "projectId",
  otherKey: "userId",
  as: "users",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
