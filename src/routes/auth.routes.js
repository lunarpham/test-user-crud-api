import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { validateUserData } from "../utils/inputDataHelper.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = express.Router();
router.post("/register", validateUserData, AuthController.register);
router.post("/login", validateUserData, AuthController.login);
router.get("/me", verifyToken, AuthController.refreshToken);

export default router;
