import api from "../api/api";

// Fetch all templates
export const fetchTemplates = async () => {
  const res = await api.get("/sms/templates");
  return res.data.data;
};

// Create SMS template
export const createSmsTemplate = async (data) => {
  const res = await api.post("/sms/templates", data);
  return res.data;
};

// Send SMS
export const sendSms = async ({ phoneNumber, templateId, variables }) => {
  const res = await api.post("/sms/send", {
    phoneNumber,
    templateId,
    variables,
  });
  return res.data;
};
