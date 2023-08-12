// Imports
import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    profilePic: { type: String, required: true },
    password: { type: String, required: true },
    pin: { type: String, required: true },
    address: { type: String },
    isKycVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// User Model
export const User = mongoose.model("User", UserSchema);
