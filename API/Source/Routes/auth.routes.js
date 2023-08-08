// imports
import express from "express";
import { authController } from "../Controllers/auth.controller.js";

// Auth Router
export const AuthRouter = express.Router();

// Verify Token
AuthRouter.get("/auth", authController);
