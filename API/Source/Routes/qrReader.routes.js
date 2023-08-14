// imports
import express from "express";
import { qrController } from "../Controllers/qrReader.controller.js";
import { verifyToken } from "../Authentication/jwt.verifyToken.js";

export const fileRouter = express.Router();
fileRouter.post("/qr", verifyToken, qrController);
