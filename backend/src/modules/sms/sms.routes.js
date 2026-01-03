import { Router } from "express";
import { sendSms } from "./sms.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// Send SMS
router.post("/send", authMiddleware, sendSms);

export default router;
