// import modules
import express from "express";
import Controller from "../Controllers/sendMoney.controller.js";

// Send Money Controller
const SendMoneyController = new Controller();

// export send money router
export const sendMoneyRouter = express.Router({ mergeParams: true });

// send money request
sendMoneyRouter.post("/send/:phone", SendMoneyController.sendMoney);
