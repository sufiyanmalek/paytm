// Imports
import mongoose from "mongoose";

// Transaction Schema
const TransactionSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderOB: { type: Number, required: true },
    senderCB: { type: Number, required: true },
    receiverOB: { type: Number, required: true },
    receiverCB: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionID: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Transaction Model
export const Transaction = mongoose.model("Transaction", TransactionSchema);
