import express from "express";
import * as UserController from "../controllers/user.controller.js";

const router = express.Router();
router.post("/", UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.deleteById);

export default router;
