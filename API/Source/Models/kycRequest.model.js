// Imports
import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: { type: String, required: true },
    aadharFront: { type: String, required: true },
    aadharBack: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Kyc = mongoose.model("kycrequest", kycSchema);
