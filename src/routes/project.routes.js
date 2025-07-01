import express from "express";
import * as ProjectController from "../controllers/project.controller.js";
import {
  validateProjectData,
  validateIdParam,
} from "../utils/inputDataHelper.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = express.Router();
router.post(
  "/",
  verifyToken,
  validateProjectData,
  ProjectController.createProject
);
router.get("/", verifyToken, ProjectController.getAllProjects);
router.get(
  "/:id",
  validateIdParam,
  verifyToken,
  ProjectController.getProjectById
);
router.put(
  "/:id",
  validateIdParam,
  verifyToken,
  validateProjectData,
  ProjectController.updateProject
);
router.delete(
  "/:id",
  validateIdParam,
  verifyToken,
  ProjectController.deleteProject
);

export default router;
