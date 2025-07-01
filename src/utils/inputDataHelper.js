import { body, param, validationResult } from "express-validator";

// Common validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

// User validation rules
export const validateUserData = [
  body("name")
    .if((value, { req }) => {
      // Required for POST requests to / and /register
      return (
        req.method === "POST" && (req.path === "/" || req.path === "/register")
      );
    })
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/\s+/g, " ");
    })
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters")
    .matches(/^[a-zA-Z0-9.\-'\s]+$/)
    .withMessage("Name contains invalid characters"),

  body("email")
    .if((value, { req }) => {
      // Required for POST requests
      return req.method === "POST";
    })
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "");
    })
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 255 })
    .withMessage("Email cannot exceed 255 characters"),

  body("password")
    .if((value, { req }) => {
      // Required for register, login, and user creation
      return (
        req.method === "POST" &&
        (req.path === "/register" || req.path === "/login" || req.path === "/")
      );
    })
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/\s+/g, "");
    })
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]+$/)
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),

  body("age")
    .optional()
    .toInt()
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be a number between 0 and 120"),

  handleValidationErrors,
];

// Project validation rules
export const validateProjectData = [
  body("title")
    .if((value, { req }) => {
      // Required only for creating new projects
      return req.method === "POST" && req.path === "/";
    })
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/\s+/g, " ");
    })
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters")
    .matches(/^[a-zA-Z0-9.\-'\s]+$/)
    .withMessage("Title contains invalid characters"),

  body("description")
    .optional()
    .trim()
    .customSanitizer((value) => {
      return value.replace(/\s+/g, " ");
    })
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("status")
    .optional()
    .trim()
    .customSanitizer((value) => {
      return value.replace(/\s+/g, "");
    })
    .toLowerCase()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status must be one of: pending, in_progress, completed"),

  body("userId")
    .if((value, { req }) => {
      // Required only for creating new projects
      return req.method === "POST" && req.path === "/";
    })
    .notEmpty()
    .withMessage("UserId is required")
    .isArray({ min: 1 })
    .withMessage("UserId must be a non-empty array")
    .custom((userIds) => {
      // Check that all IDs are positive integers
      if (userIds.some((id) => !Number.isInteger(id) || id <= 0)) {
        throw new Error("UserId must be an array of positive integers");
      }

      // Check for duplicates
      const uniqueIds = new Set(userIds);
      if (uniqueIds.size !== userIds.length) {
        throw new Error("UserId array cannot contain duplicate IDs");
      }

      return true;
    }),

  handleValidationErrors,
];

// ID parameter validation
export const validateIdParam = [
  param("id")
    .notEmpty()
    .withMessage("ID parameter is required")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("ID must be a positive integer"),

  handleValidationErrors,
];
