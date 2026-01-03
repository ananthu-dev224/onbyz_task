import { createShortUrlService } from "./url.service.js";
import { redisClient } from "../../config/redis.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, expiresAt } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required",
      });
    }

    const url = await createShortUrlService({
      originalUrl,
      userId: req.user.id,
      expiresAt,
    });

    // Cache shortCode → originalUrl
    // await redisClient.set(
    //   `short:${url.shortCode}`,
    //   url.originalUrl
    // );

    res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
        expiresAt: url.expiresAt,
      },
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
