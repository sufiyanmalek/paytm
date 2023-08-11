// import modules
import express from "express";
import { kycController } from "../Controllers/kyc.controller.js";

export const kycRouter = express.Router();
kycRouter.post("/kyc", kycController);
