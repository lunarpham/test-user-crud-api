import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user still exists in database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
