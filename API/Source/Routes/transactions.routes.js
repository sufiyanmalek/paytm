// import modules
import express from "express";
import Controller from "../Controllers/transaction.controller.js";

// Transaction Controller
const TransactionController = new Controller();
// export transaction router
export const transactionRouter = express.Router();

// Get transaction of current User
transactionRouter.get("/transactions", TransactionController.getTransactions);

// Get Transaction with particular user
transactionRouter.get(
  "/p2ptransaction/:id",
  TransactionController.getP2pTransaction
);

// Get Custom Transactions
transactionRouter.get(
  "/statement",
  TransactionController.getCustomTransactions
);
