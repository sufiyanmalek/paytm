// Imports
import mongoose from "mongoose";

// Message Schema
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Message Model
export const Message = mongoose.model("Message", MessageSchema);
