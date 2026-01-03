import mongoose from "mongoose";

const smsTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

smsTemplateSchema.index(
  { name: 1, createdBy: 1 },
  { unique: true }
);

export const SmsTemplate = mongoose.model(
  "SmsTemplate",
  smsTemplateSchema
);
