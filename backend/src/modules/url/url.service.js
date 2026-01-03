import { Url } from "./url.model.js";
import { generateShortCode } from "../../utils/shortCode.js";

// createShortUrlService creates a new short URL or returns existing one
export const createShortUrlService = async ({
  originalUrl,
  userId,
  expiresAt,
}) => {
  // Check if URL already exists for this user
  const existingUrl = await Url.findOne({
    originalUrl,
    createdBy: userId,
  });

  if (existingUrl) {
    return existingUrl;
  }

  let shortCode;
  let isUnique = false;

  // Ensure unique shortCode
  while (!isUnique) {
    shortCode = generateShortCode();
    const codeExists = await Url.findOne({ shortCode });
    if (!codeExists) isUnique = true;
  }

  const url = await Url.create({
    originalUrl,
    shortCode,
    createdBy: userId,
    expiresAt: expiresAt || null,
  });

  return url;
};
