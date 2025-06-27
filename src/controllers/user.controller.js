import User from "../models/user.model.js";
import { hashPassword } from "../utils/passwordHelper.js";

export const create = async (req, res) => {
  try {
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
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      age: req.body.age || null,
      password: await hashPassword(req.body.password),
    };

    const newUser = await User.create(user);
    const { password, ...userWithoutPassword } = newUser.toJSON(); // Exclude password from response
    return res.status(201).json(userWithoutPassword); // Return user without password
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" }); // Add missing return
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "age"], // Specify attributes to return, excluding password
      order: [["id", "ASC"]], // Order by id ascending
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const findById = async (req, res) => {
  try {
    // Find by primary key (id)
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "age"], // Specify attributes to return, excluding password
      order: [["id", "ASC"]], // Order by id ascending
    });
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

    // Check if email is being updated and if another user already has this email
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with this email already exists" });
      }
    }

    // Update user properties - validation already handled by middleware
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.age !== undefined) user.age = req.body.age;

    const updatedUser = await user.save();
    const { password, ...userWithoutPassword } = updatedUser.toJSON(); // Exclude password from response
    return res.status(200).json(userWithoutPassword);
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
