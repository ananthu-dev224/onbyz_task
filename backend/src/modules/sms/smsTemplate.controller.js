import { SmsTemplate } from "./smsTemplate.model.js";

// Create SMS Template
export const createSmsTemplate = async (req, res, next) => {
  try {
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        success: false,
        message: "Template name and content are required",
      });
    }

    const existingTemplate = await SmsTemplate.findOne({
      name,
      createdBy: req.user.id,
    });

    if (existingTemplate) {
      return res.status(409).json({
        success: false,
        message: "Template with this name already exists",
      });
    }

    const template = await SmsTemplate.create({
      name,
      content,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "SMS template created successfully",
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// List SMS Templates
export const listSmsTemplates = async (req, res, next) => {
  try {
    const templates = await SmsTemplate.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    next(error);
  }
};
