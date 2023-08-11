// Imports
import mongoose from "mongoose";

// Conversation Schema
const ConversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Conversation Model
export const Conversation = mongoose.model("Conversation", ConversationSchema);
