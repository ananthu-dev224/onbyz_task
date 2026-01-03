import { Router } from "express";
import { sendSms } from "./sms.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { smsLimiter } from "../../middlewares/rateLimiter.middleware.js";

const router = Router();

// Send SMS
router.post("/send", authMiddleware, smsLimiter, sendSms);

export default router;
