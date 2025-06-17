import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { validateUserData } from "../middleware/validation.middleware.js";

const router = express.Router();
router.post("/", validateUserData, UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);
router.put("/:id", validateUserData, UserController.update);
router.delete("/:id", UserController.deleteById);

export default router;
