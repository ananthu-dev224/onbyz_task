import { sendSmsService } from "./sms.service.js";

// Send SMS
export const sendSms = async (req, res, next) => {
  try {
    const { phoneNumber, templateId, variables } = req.body;

    if (!phoneNumber || !templateId) {
      return res.status(400).json({
        success: false,
        message: "Phone number and templateId are required",
      });
    }

    const smsLog = await sendSmsService({
      phoneNumber,
      templateId,
      variables: variables || {},
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "SMS sent successfully",
      data: smsLog,
    });
  } catch (error) {
    next(error);
  }
};
