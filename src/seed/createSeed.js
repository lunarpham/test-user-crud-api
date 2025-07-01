import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import { sequelize, connect } from "../config/db.config.js";
import { generateUsers } from "./user.factory.js";
import { generateProjects } from "./project.factory.js";
import "../models/index.js"; // Import relationships

const createSeed = async () => {
  try {
    // Clear existing data first (relationships will be cleared automatically)
    await Project.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
    console.log("Cleared existing data");

    // Generate and create users
    console.log("Creating users...");
    const userData = await generateUsers(10);
    const createdUsers = await User.bulkCreate(userData);
    console.log(`Created ${createdUsers.length} users`);

    // Generate and create projects (without user associations)
    console.log("Creating projects...");
    const projectData = generateProjects(15); // Create more projects
    const createdProjects = await Project.bulkCreate(projectData);
    console.log(`Created ${createdProjects.length} projects`);

    // Create user-project associations using relationships
    console.log("Creating user-project associations...");
    let associationCount = 0;

    for (const project of createdProjects) {
      // Assign 1-4 random users to each project
      const numberOfUsers = Math.floor(Math.random() * 4) + 1;
      const shuffledUsers = [...createdUsers].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledUsers.slice(0, numberOfUsers);

      // Use Sequelize relationship method
      await project.setUsers(selectedUsers);
      associationCount += selectedUsers.length;
    }

    console.log(`Created ${associationCount} user-project associations`);
    console.log("Seed data created successfully!");

    // Display sample data with relationships
    console.log("\nSample users:");
    createdUsers.slice(0, 3).forEach((user) => {
      console.log(`- ${user.name} (${user.email}) - Age: ${user.age}`);
    });

    console.log("\nSample projects with users:");
    for (let i = 0; i < 3; i++) {
      const project = createdProjects[i];
      const projectWithUsers = await Project.findByPk(project.id, {
        include: [
          { model: User, as: "users", attributes: ["id", "name", "email"] },
        ],
      });

      console.log(
        `- ${projectWithUsers.title} (Status: ${projectWithUsers.status})`
      );
      console.log(
        `  Assigned to: ${projectWithUsers.users.map((u) => u.name).join(", ")}`
      );
    }

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
