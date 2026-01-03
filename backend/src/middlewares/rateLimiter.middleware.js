import rateLimit from "express-rate-limit";

// Rate Limiter for sms sending
export const smsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 SMS per hour per user/IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "SMS rate limit exceeded. Please try again later.",
  },
});
