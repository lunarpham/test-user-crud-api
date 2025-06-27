export const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err);

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((error) => error.message);
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  // Handle Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Resource already exists",
      errors: ["A record with this data already exists"],
    });
  }

  // Handle Sequelize foreign key constraint errors
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      message: "Invalid reference",
      errors: ["Referenced resource does not exist"],
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  // Handle bcrypt errors
  if (err.message && err.message.includes("bcrypt")) {
    return res.status(500).json({
      message: "Authentication error",
    });
  }

  // Handle database connection errors
  if (err.name === "SequelizeConnectionError") {
    return res.status(503).json({
      message: "Database connection error",
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Async error wrapper for controllers
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
