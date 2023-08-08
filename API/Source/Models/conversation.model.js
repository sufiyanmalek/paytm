// Imports
import mongoose from "mongoose";

// Conversation Schema
const ConversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Conversation Model
export const Conversation = mongoose.model("Conversation", ConversationSchema);
