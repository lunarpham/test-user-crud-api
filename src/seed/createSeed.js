import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import { sequelize, connect } from "../config/db.config.js";
import { generateUsers } from "./user.factory.js";
import { generateProjects } from "./project.factory.js";

const createSeed = async () => {
  try {
    // Clear existing data first
    await Project.destroy({ where: {}, truncate: true });
    await User.destroy({ where: {}, truncate: true });
    console.log("Cleared existing data");

    // Generate and create users
    console.log("Creating users...");
    const userData = await generateUsers(10);
    const createdUsers = await User.bulkCreate(userData);
    console.log(`Created ${createdUsers.length} users`);

    // Extract user IDs for project assignment
    const userIds = createdUsers.map((user) => user.id);

    // Generate and create projects
    console.log("Creating projects...");
    const projectData = generateProjects(10, userIds);
    const createdProjects = await Project.bulkCreate(projectData);
    console.log(`Created ${createdProjects.length} projects`);

    console.log("Seed data created successfully!");
    console.log("\nSample users:");
    createdUsers.slice(0, 3).forEach((user) => {
      console.log(`- ${user.name} (${user.email}) - Age: ${user.age}`);
    });

    console.log("\nSample projects:");
    createdProjects.slice(0, 3).forEach((project) => {
      console.log(
        `- ${project.title} (Status: ${project.status}) - Assigned to ${project.userId.length} user(s)`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating seed data:", error);
    process.exit(1);
  }
};

async function runSeed() {
  try {
    await connect();
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    console.log("Database synchronized");
    await createSeed();
  } catch (err) {
    console.error("Failed to sync database:", err);
    process.exit(1);
  }
}

runSeed();
