import { Router } from "express";
import { createShortUrl } from "./url.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// Create short URL
router.post("/", authMiddleware, createShortUrl);

export default router;