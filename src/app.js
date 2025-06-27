import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import projectRoute from "./routes/project.routes.js";
import authRoute from "./routes/auth.routes.js";
import { sequelize, connect } from "./config/db.config.js";
import { errorHandler } from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" with { type: "json" };
import dotenv from "dotenv";
import "./models/index.js"
dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));

const port = process.env.PORT || 8080;
const host = "0.0.0.0";

app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler)

async function startServer() {
  try {
    await connect(); // Connect to database
    await sequelize.sync({ force: false }); // Sync models
    console.log("Database synchronized");

    app.listen(port, host, () => {
      console.log(`Example app listening at http://${host}:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();