// imports
import express from "express";
import Controller from "../Controllers/userWallet.controller.js";
import { Validator } from "../Middlewares/joiValidator.js";
import { verifyAmount } from "../JoiObjects/joiObjects.js";

// Validator Middleware
const addMoneyValidator = new Validator(verifyAmount);

// Wallet Controller
const WalletController = new Controller();

//export wallet router
export const wallet = express.Router();

// get wallet
wallet.post("/wallet", WalletController.getWallet);

// add money to wallet
wallet.put(
  "/wallet/add",
  addMoneyValidator.validate,
  WalletController.addMoneyToWallet
);
