import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/passwordHelper.js";
import { generateToken } from "../middleware/authJwt.js";

export const register = async (req, res) => {
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
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      age: req.body.age || null,
    };

    const newUser = await User.create(user);
    const { password, ...userWithoutPassword } = newUser.toJSON(); // Exclude password from response
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    const token = generateToken(user);

    return res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a fresh token
    const token = generateToken(user);

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
