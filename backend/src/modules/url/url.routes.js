import { Router } from "express";
import {
  createShortUrl,
  getUrlAnalytics,
} from "./url.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// Create short URL (protected)
router.post("/", authMiddleware, createShortUrl);

// Get URL analytics (protected)
router.get("/:shortCode", authMiddleware, getUrlAnalytics);

export default router;
