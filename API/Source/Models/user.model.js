// Imports
import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  pin: { type: String, required: true },
  address: { type: String },
});

// User Model
export const User = mongoose.model("User", UserSchema);
