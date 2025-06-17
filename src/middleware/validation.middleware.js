export const validateUserData = (req, res, next) => {
  const { name, email, age } = req.body;
  const errors = [];

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name must be a non-empty string");
    } else if (name.trim().length > 100) {
      errors.push("Name cannot exceed 100 characters");
    } else if (!/^[a-zA-Z0-9.\-'\s]+$/.test(name.trim())) {
      errors.push("Name contains invalid characters");
    }
  }

  // Validate email if provided
  if (email !== undefined) {
    if (typeof email !== "string" || email.trim().length === 0) {
      errors.push("Email must be a non-empty string");
    } else if (email.trim().length > 255) {
      errors.push("Email cannot exceed 255 characters");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    ) {
      errors.push("Invalid email format");
    }
  }

  // Validate age if provided
  if (age !== undefined && age !== null) {
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      errors.push("Age must be a number between 0 and 120");
    }
  }

  // Check if request is for creating a new user
  if (req.method === "POST" && req.path === "/") {
    // Check required fields for new user creation
    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
  }

  // Handle version for updates
  if (req.method === "PUT" && req.params.id) {
    if (req.body.version === undefined) {
      errors.push("Version is required for updates");
    } else if (typeof req.body.version !== "number" || req.body.version < 1) {
      errors.push("Version must be a positive number");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Trim and normalize string values
  if (req.body.name) {
    req.body.name = req.body.name.trim().replace(/\s+/g, " ");
  }

  if (req.body.email) req.body.email = req.body.email.trim();

  next();
};
