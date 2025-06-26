import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "HOST_DB",
  "USER_DB",
  "PASSWORD_DB",
  "DATABASE",
  "SECRET_KEY",
];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.HOST_DB,
  port: parseInt(process.env.PORT_DB || "5432", 10),
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Database connection has been established successfully with PostgreSQL."
    );
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
