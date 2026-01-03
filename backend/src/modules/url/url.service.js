import { Url } from "./url.model.js";
import { generateShortCode } from "../../utils/shortCode.js";

// Create short URL
export const createShortUrlService = async ({
  originalUrl,
  userId,
}) => {
  const existingUrl = await Url.findOne({
    originalUrl,
    createdBy: userId,
  });

  if (existingUrl) {
    return existingUrl;
  }

  let shortCode;
  let isUnique = false;

  while (!isUnique) {
    shortCode = generateShortCode();
    const codeExists = await Url.findOne({ shortCode });
    if (!codeExists) isUnique = true;
  }

  const url = await Url.create({
    originalUrl,
    shortCode,
    createdBy: userId,
  });

  return url;
};

// Get URL by short code
export const getUrlByShortCodeService = async (shortCode) => {
  return await Url.findOne({ shortCode });
};

// Track click on short URL
export const trackClickService = async (urlId) => {
  await Url.findByIdAndUpdate(urlId, {
    $inc: { clickCount: 1 },
    lastAccessedAt: new Date(),
  });
};
