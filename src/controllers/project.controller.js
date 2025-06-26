import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["id", "ASC"]], // Order by id ascending
    });
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Find users by userId
    if (req.body.userId && Array.isArray(userId)) {
      const userPromises = userId.map((id) => User.findByPk(id));
      const users = await Promise.all(userPromises);

      // Check if any user wasn't found
      const missingIndex = users.findIndex((user) => user === null);
      if (missingIndex !== -1) {
        return res
          .status(404)
          .json({ message: `User with id ${userId[missingIndex]} not found` });
      }
    }

    const project = await Project.create({
      title: title,
      description: description ? description.trim() : null,
      userId,
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { title, description, userId, status } = req.body;

    if (title) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description ? description.trim() : null;
    }

    if (userId) {
      // Find users by userId
      if (Array.isArray(userId)) {
        const userPromises = userId.map((id) => User.findByPk(id));
        const users = await Promise.all(userPromises);

        // Check if any user wasn't found
        const missingIndex = users.findIndex((user) => user === null);
        if (missingIndex !== -1) {
          return res.status(404).json({
            message: `User with id ${userId[missingIndex]} not found`,
          });
        }
      }
      project.userId = userId;
    }
    if (status) {
      project.status = status;
    }
    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
