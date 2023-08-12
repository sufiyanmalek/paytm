// Imports
import mongoose from "mongoose";

// ContactList Schema
const ContactListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userPhone: { type: Number },
    contacts: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        profilePic: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// ContactList Model
export const ContactList = mongoose.model("ContactList", ContactListSchema);
