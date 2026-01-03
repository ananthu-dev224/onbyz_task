import api from "../api/api";

// Create short URL
export const createShortUrl = async (originalUrl) => {
  const res = await api.post("/urls", { originalUrl });
  return res.data.data;
};

// Get URL analytics
export const getUrlAnalytics = async (shortCode) => {
  const res = await api.get(`/urls/${shortCode}`);
  return res.data.data; 
};
