import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model.js";

export const create = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const user = {
      id: uuidv4(),
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      age: req.body.age || null,
    };

    const newUser = await User.create(user);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const findById = async (req, res) => {
  try {
    // Find by primary key (id)
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check version
    if (user.version !== req.body.version) {
      return res.status(409).json({ message: "Version conflict" });
    }

    // Update user properties - validation already handled by middleware
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.age !== undefined) user.age = req.body.age;

    // Increment version
    user.version += 1;

    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
