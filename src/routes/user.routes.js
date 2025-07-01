import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { validateUserData, validateIdParam } from "../utils/inputDataHelper.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = express.Router();
router.post("/", verifyToken, validateUserData, UserController.create);
router.get("/", verifyToken, UserController.findAll);
router.get("/:id", validateIdParam, verifyToken, UserController.findById);
router.put(
  "/:id",
  validateIdParam,
  verifyToken,
  validateUserData,
  UserController.update
);
router.delete("/:id", validateIdParam, verifyToken, UserController.deleteById);

export default router;
