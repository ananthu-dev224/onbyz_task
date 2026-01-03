import {
  createShortUrlService,
  getUrlByShortCodeService,
  trackClickService,
} from "./url.service.js";

// Create short URL
export const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required",
      });
    }

    const url = await createShortUrlService({
      originalUrl,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Redirect short URL
export const redirectShortUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const url = await getUrlByShortCodeService(shortCode);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    // Increment click count
    trackClickService(url._id);

    return res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

// Get URL analytics
export const getUrlAnalytics = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const url = await getUrlByShortCodeService(shortCode);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        clickCount: url.clickCount,
        lastAccessedAt: url.lastAccessedAt,
        createdAt: url.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
