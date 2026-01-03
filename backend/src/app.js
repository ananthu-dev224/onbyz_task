import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running...",
  });
});

// Error Handler
app.use(errorHandler);

export default app;
