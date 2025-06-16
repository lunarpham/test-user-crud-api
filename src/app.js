import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import { sequelize, connect } from "./config/db.config.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" with { type: "json" };

const app = express();
app.use(cors({
  origin: "*"
}));

const port = 3000;

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startServer() {
  try {
    await connect(); // Connect to database
    await sequelize.sync({ force: false }); // Sync models
    console.log("Database synchronized");

    app.listen(port, () => {
      console.log(`Example app listening at http://0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();