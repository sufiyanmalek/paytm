// imports
import mongoose from "mongoose";

// socket schema
const socketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    socketId: String,
  },
  {
    timestamps: true,
  }
);

// Socket Model
export const SocketModel = mongoose.model("socket", socketSchema);
