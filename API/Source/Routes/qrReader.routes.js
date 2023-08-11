// imports
import express from "express";
import { qrController } from "../Controllers/qrReader.controller.js";

export const fileRouter = express.Router();
fileRouter.post("/qr", qrController);
