import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { validateUserDataFormat } from "../utils/inputDataHelper.js";

const router = express.Router();
router.post("/register", validateUserDataFormat, AuthController.register);
router.post("/login", validateUserDataFormat, AuthController.login);

export default router;
