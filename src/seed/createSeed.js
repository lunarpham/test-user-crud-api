import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize, connect } from "../config/db.config.js";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    age: 30,
  },
  {
    name: "Jane Smith",
    email: "smj@lyh.ch",
    age: 29,
  },
  {
    name: "Alice Johnson",
    email: "alice.js@exm.ms",
    age: 28,
  },
];

const createSeed = async () => {
  try {
    // Clear existing users first (optional)
    await User.destroy({ where: {}, truncate: true });
    console.log("Cleared existing user data");

    for (const user of users) {
      const newUser = {
        id: uuidv4(),
        name: user.name,
        email: user.email,
        age: user.age || null,
      };
      await User.create(newUser);
    }
    console.log("Seed data created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating seed data:", error);
    process.exit(1);
  }
};

async function runSeed() {
  try {
    await connect();
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
    await createSeed();
  } catch (err) {
    console.error("Failed to sync database:", err);
    process.exit(1);
  }
}

runSeed();
