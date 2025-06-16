# User CRUD API

## Overview

This project is a backend application built with Node.js and Express.js to manage user data. It supports basic CRUD operations and uses PostgreSQL as the database, integrated via Sequelize ORM

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Documentation:** Swagger
- **Environment Variables:** dotenv

## Project Structure

```
├── src
│ ├── config/
│ │ └── db.config.js             # Database connection config
│ ├── models/
│ │ └── user.model.js            # Define the user model
│ ├── controllers/
│ │ └── user.controller.js       # CRUD logic
│ ├── seed
│ │ └── createSeed.js            # Create dummy data
│ ├── routes/
│ │ └── user.routes.js           # Define route for CRUD
│ ├── app.js                     # Main application
├── .env                         # Environment Variables
```

## User Model

The `User` model has the following fields:

- `id` (string, primary key, required)
- `name` (string, required)
- `email` (string, unique, required)
- `age` (integer, optional)
- `version` (integer, required, default: 1)

## Environment Variables

```plaintext
HOST_DB = "POSTGRES_HOST"
PORT_DB = "5432"
DATABASE = "DATABASE_NAME"
USER_DB = "POSTGRES_USER"
PASSWORD_DB = "POSTGRES_PASSWORD"
```
