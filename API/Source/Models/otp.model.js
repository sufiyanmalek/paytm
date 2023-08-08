// imports
import mongoose, { mongo } from "mongoose";

// otp Schema
const userOtpSchema = new mongoose.Schema({
  phone: { type: Number, required: true },
  otp: { type: Number, required: true },
  time: { type: Date, default: Date.now() },
});

// userOTP Model
export const userOtpModel = mongoose.model("otp", userOtpSchema);
