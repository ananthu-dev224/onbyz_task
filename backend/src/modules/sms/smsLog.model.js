import mongoose from "mongoose";

const smsLogSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SmsTemplate",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SENT", "FAILED"],
      default: "SENT",
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const SmsLog = mongoose.model("SmsLog", smsLogSchema);
