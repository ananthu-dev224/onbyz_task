import api from "../api/api";

// Create short URL
export const createShortUrl = async (originalUrl) => {
  const res = await api.post("/urls", { originalUrl });
  return res.data.data;
};
