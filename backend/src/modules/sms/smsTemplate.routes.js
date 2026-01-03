import { Router } from "express";
import {
  createSmsTemplate,
  listSmsTemplates,
} from "./smsTemplate.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// Create template
router.post("/templates", authMiddleware, createSmsTemplate);

// List templates
router.get("/templates", authMiddleware, listSmsTemplates);

export default router;
