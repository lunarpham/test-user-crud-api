export const validateUserDataFormat = (req, res, next) => {
  const { name, email, age, password } = req.body;
  const errors = [];

  // First, trim and normalize string values
  if (req.body.name && typeof req.body.name === "string") {
    req.body.name = req.body.name.trim().replace(/\s+/g, " ");
  }
  if (req.body.email && typeof req.body.email === "string") {
    req.body.email = req.body.email.trim();
  }
  if (req.body.age) req.body.age = parseInt(req.body.age, 10);
  if (req.body.password && typeof req.body.password === "string") {
    req.body.password = req.body.password.trim().replace(/\s+/g, "");
  }

  // Now validate using the formatted values
  const {
    name: formattedName,
    email: formattedEmail,
    age: formattedAge,
    password: formattedPassword,
  } = req.body;

  // Check if request is for creating a new user or registering
  const isCreatingUser = req.method === "POST" && req.path === "/";
  const isRegistering = req.method === "POST" && req.path === "/register";
  const isLoggingIn = req.method === "POST" && req.path === "/login";

  // Check required fields first
  if (isCreatingUser || isRegistering) {
    if (!formattedName) errors.push("Name is required");
    if (!formattedEmail) errors.push("Email is required");
  }

  if (isRegistering) {
    if (!formattedPassword) errors.push("Password is required");
  }

  if (isLoggingIn) {
    if (!formattedEmail) errors.push("Email is required");
    if (!formattedPassword) errors.push("Password is required");
  }

  // Validate name if provided
  if (name !== undefined) {
    if (
      typeof name !== "string" ||
      !formattedName ||
      formattedName.length === 0
    ) {
      errors.push("Name must be a non-empty string");
    } else if (formattedName.length > 100) {
      errors.push("Name cannot exceed 100 characters");
    } else if (!/^[a-zA-Z0-9.\-'\s]+$/.test(formattedName)) {
      errors.push("Name contains invalid characters");
    }
  }

  // Validate email if provided
  if (email !== undefined) {
    if (
      typeof email !== "string" ||
      !formattedEmail ||
      formattedEmail.length === 0
    ) {
      errors.push("Email must be a non-empty string");
    } else if (formattedEmail.length > 255) {
      errors.push("Email cannot exceed 255 characters");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formattedEmail)
    ) {
      errors.push("Invalid email format");
    }
  }

  // Validate age if provided
  if (age !== undefined && age !== null) {
    if (isNaN(formattedAge) || formattedAge < 0 || formattedAge > 120) {
      errors.push("Age must be a number between 0 and 120");
    }
  }

  // Validate password if provided
  if (password !== undefined) {
    if (
      typeof password !== "string" ||
      !formattedPassword ||
      formattedPassword.length === 0
    ) {
      errors.push("Password must be a non-empty string");
    } else if (formattedPassword.length < 8 || formattedPassword.length > 20) {
      errors.push("Password must be between 8 and 20 characters");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateProjectDataFormat = (req, res, next) => {
  const { title, description, userId, status } = req.body;
  const errors = [];

  // First, trim and normalize string values
  if (req.body.title && typeof req.body.title === "string") {
    req.body.title = req.body.title.trim().replace(/\s+/g, " ");
  }
  if (req.body.status && typeof req.body.status === "string") {
    req.body.status = req.body.status.trim().toLowerCase().replace(/\s+/g, "");
  }
  if (req.body.description && typeof req.body.description === "string") {
    req.body.description = req.body.description.trim().replace(/\s+/g, " ");
  }

  // Now validate using the formatted values
  const formattedTitle = req.body.title;
  const formattedDescription = req.body.description;
  const formattedStatus = req.body.status;

  // Check if request is for creating a new project
  const isCreatingProject = req.method === "POST" && req.path === "/";

  // Check required fields first
  if (isCreatingProject) {
    if (!formattedTitle) errors.push("Title is required");
    if (!userId || !Array.isArray(userId) || userId.length === 0) {
      errors.push("UserId is required and must be a non-empty array");
    }
  }

  // Validate title if provided
  if (title !== undefined) {
    if (
      typeof title !== "string" ||
      !formattedTitle ||
      formattedTitle.length === 0
    ) {
      errors.push("Title must be a non-empty string");
    } else if (formattedTitle.length > 100) {
      errors.push("Title cannot exceed 100 characters");
    } else if (!/^[a-zA-Z0-9.\-'\s]+$/.test(formattedTitle)) {
      errors.push("Title contains invalid characters");
    }
  }

  // Validate description if provided
  if (description !== undefined && description !== null) {
    if (
      typeof description === "string" &&
      formattedDescription &&
      formattedDescription.length > 500
    ) {
      errors.push("Description cannot exceed 500 characters");
    }
  }

  // Validate if userId is provided and is an array of integers
  if (userId !== undefined) {
    if (!Array.isArray(userId)) {
      errors.push("UserId must be an array");
    } else if (userId.length === 0) {
      errors.push("UserId array cannot be empty");
    } else if (userId.some((id) => !Number.isInteger(id) || id <= 0)) {
      errors.push("UserId must be an array of positive integers");
    } else {
      // Check for duplicate IDs
      const uniqueIds = new Set(userId);
      if (uniqueIds.size !== userId.length) {
        errors.push("UserId array cannot contain duplicate IDs");
      }
    }
  }

  // Validate status if provided
  if (status !== undefined) {
    const validStatuses = ["pending", "in_progress", "completed"];
    if (!validStatuses.includes(formattedStatus)) {
      errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: ["ID parameter is required"] });
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || numericId <= 0) {
    return res.status(400).json({ errors: ["ID must be a positive integer"] });
  }

  req.params.id = numericId;
  next();
};
