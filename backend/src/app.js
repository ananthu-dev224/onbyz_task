import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import urlRoutes from "./modules/url/url.routes.js";
import { redirectShortUrl } from "./modules/url/url.controller.js";

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

// Public Redirect Route
app.get("/:shortCode", redirectShortUrl);

// Error Handler
app.use(errorHandler);

export default app;
