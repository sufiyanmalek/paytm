//imports
import Joi from "joi";
import { Wallet } from "../Models/wallet.model.js";
import bcrypt from "bcrypt";
import { Transaction } from "../Models/transaction.model.js";
import { User } from "../Models/user.model.js";
import { uid } from "uid";
import { io } from "../index.js";
import { SocketModel } from "../Models/socket.model.js";

export default class WalletController {
  constructor() {}
  // create or get wallet details
  getWallet = async (req, res) => {
    try {
      const user = req.user;
      const wallet = await Wallet.findOne({ userPhone: user.phone }).populate({
        path: "transactionHistory",
        model: "Transaction",
        populate: [
          {
            path: "sender",
            model: "User",
            select: { name: 1 },
          },
          {
            path: "receiver",
            model: "User",
            select: { name: 1 },
          },
        ],
      });
      if (wallet) {
        res.status(200).send(wallet);
      } else {
        const wallet = new Wallet({
          userId: user._id,
          userPhone: user.phone,
          transactionHistory: [],
        });
        await wallet.save();
        res.status(200).send(wallet);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // add money to wallet
  addMoneyToWallet = async (req, res) => {
    setTimeout(async () => {
      try {
        const amount = req.body.amount;
        const pin = req.body.pin;
        let user = req.user;
        user = await User.findOne({ phone: user.phone });

        const wallet = await Wallet.findOne({ userPhone: user.phone });
        const addMoney = await bcrypt.compare(pin, user.pin);
        if (addMoney) {
          const transaction = new Transaction({
            receiver: user._id,
            sender: user._id,
            senderOB: wallet.balance,
            senderCB: wallet.balance + Number(amount),
            receiverOB: wallet.balance,
            receiverCB: wallet.balance + Number(amount),
            transactionID: uid(16),
            amount,
          });
          await transaction.save();
          wallet.balance = wallet.balance + amount;
          wallet.transactionHistory.push(transaction._id);

          const updatedWallet = await Wallet.findOneAndUpdate(
            { userPhone: user.phone },
            wallet,
            { new: true }
          );

          const generalTransaction = await Transaction.findById(transaction._id)
            .populate("sender", "name")
            .populate("receiver", "name");

          const socketData = await SocketModel.findOne({ userId: user._id });

          io.to(socketData.socketId).emit("Added_wallet", {
            transaction: generalTransaction,
            id: user._id,
          });

          res.status(200).json({
            message: "Money Added to wallet",
            updatedWallet,
          });
        } else {
          res
            .status(401)
            .json({ message: "Your payment pin in Incorrect, please check" });
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }, 1500);
  };
}
