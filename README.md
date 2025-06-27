# User CRUD API

## Overview

This project is a backend application built with Node.js and Express.js to manage user and project data. It supports basic CRUD operations for users and projects, uses PostgreSQL as the database (integrated via Sequelize ORM), and provides JWT-based authentication.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Documentation:** Swagger (OpenAPI)
- **Environment Variables:** dotenv

## Project Structure

```
├── src
│   ├── config/
│   │   └── db.config.js             # Database connection config
│   ├── models/
│   │   ├── user.model.js            # Define the user model
│   │   ├── project.model.js         # Define the project model
│   │   └── index.js                 # Model associations
│   ├── controllers/
│   │   ├── user.controller.js       # User CRUD logic
│   │   ├── project.controller.js    # Project CRUD logic
│   │   └── auth.controller.js       # Auth logic (register/login)
│   ├── middleware/
│   │   ├── authJwt.js               # JWT auth middleware
│   │   └── errorHandler.js          # Error handling middleware
│   ├── routes/
│   │   ├── user.routes.js           # User routes
│   │   ├── project.routes.js        # Project routes
│   │   └── auth.routes.js           # Auth routes
│   ├── seed/
│   │   ├── createSeed.js            # Create dummy data
│   │   ├── user.factory.js          # User data factory
│   │   └── project.factory.js       # Project data factory
│   ├── utils/
│   │   ├── inputDataHelper.js       # Input validation helpers
│   │   └── passwordHelper.js        # Password hashing helpers
│   ├── swagger/
│   │   └── swagger.json             # Swagger/OpenAPI spec
│   └── app.js                       # Main application entry point
├── .env                             # Environment Variables
├── .env.example                     # Example environment file
├── Dockerfile                       # Docker build file
├── docker-compose.yml               # Docker Compose config
├── package.json                     # NPM dependencies and scripts
```

## User Model

The `User` model has the following fields:

- `id` (integer, primary key, auto-increment)
- `name` (string, required)
- `email` (string, unique, required)
- `password` (string, required, hashed)
- `age` (integer, optional)

## Project Model

The `Project` model has the following fields:

- `id` (integer, primary key, auto-increment)
- `title` (string, required)
- `description` (string, optional)
- `status` (enum: pending, in_progress, completed; default: pending)
- `userId` (array of integers, required; references assigned users)
- `createdAt` / `updatedAt` (timestamps)

## Running Locally

1. Install dependencies:
   ```
   npm install
   ```
2. Set up your `.env` file.
3. Start PostgreSQL and ensure credentials match your `.env`.
4. Run database seed (optional, for demo data):
   ```
   npm run seed
   ```
5. Start the server:
   ```
   npm run dev
   ```
6. Visit [http://localhost:8080/api-docs](http://localhost:8080/api-docs) for API docs.

## Docker

To run with Docker Compose:

```sh
docker-compose up --build
```