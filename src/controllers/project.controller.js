import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      ],
    });

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

    const project = await Project.create({
      title: title,
      description: description ? description.trim() : null,
    });

    if (userId && Array.isArray(userId)) {
      const users = await User.findAll({
        where: { id: userId },
      });

      if (users.length !== userId.length) {
        const foundIds = users.map((user) => user.id);
        const missingIds = userId.filter((id) => !foundIds.includes(id));
        await project.destroy(); // Clean up
        return res.status(404).json({
          message: `Users not found: ${missingIds.join(", ")}`,
        });
      }

      await project.setUsers(users);
    }

    const projectWithUsers = await Project.findByPk(project.id, {
      include: [
        { model: User, as: "users", attributes: ["id", "name", "email"] },
      ],
    });

    return res.status(201).json(projectWithUsers);
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

    // Update basic fields
    if (title) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description ? description.trim() : null;
    }

    if (status) {
      project.status = status;
    }

    // Save basic field changes first
    await project.save();

    // Handle user associations using relationships
    if (userId && Array.isArray(userId)) {
      // Validate all users exist
      const users = await User.findAll({
        where: { id: userId },
      });

      if (users.length !== userId.length) {
        const foundIds = users.map((user) => user.id);
        const missingIds = userId.filter((id) => !foundIds.includes(id));
        return res.status(404).json({
          message: `Users not found: ${missingIds.join(", ")}`,
        });
      }

      // Update user associations using Sequelize relationship methods
      await project.setUsers(users);
    }

    // Return updated project with associated users
    const updatedProjectWithUsers = await Project.findByPk(project.id, {
      include: [
        { model: User, as: "users", attributes: ["id", "name", "email"] },
      ],
    });

    return res.status(200).json(updatedProjectWithUsers);
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
