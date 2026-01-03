import { SmsTemplate } from "./smsTemplate.model.js";
import { SmsLog } from "./smsLog.model.js";
import { renderTemplate } from "../../utils/renderTemplate.js";

// Mock SMS sending function
const mockSendSms = async (phoneNumber, message) => {
  console.log("📲 Sending SMS");
  console.log("To:", phoneNumber);
  console.log("Message:", message);
  return true;
};

export const sendSmsService = async ({
  phoneNumber,
  templateId,
  variables,
  userId,
}) => {
  const template = await SmsTemplate.findOne({
    _id: templateId,
    createdBy: userId,
  });

  if (!template) {
    throw new Error("SMS template not found");
  }

  const message = renderTemplate(template.content, variables);

  const isSent = await mockSendSms(phoneNumber, message);

  const log = await SmsLog.create({
    phoneNumber,
    template: template._id,
    message,
    status: isSent ? "SENT" : "FAILED",
    sentBy: userId,
  });

  return log;
};
