//imports
import { Transaction } from "../Models/transaction.model.js";
import { Wallet } from "../Models/wallet.model.js";
import bcrypt from "bcrypt";
import { User } from "../Models/user.model.js";
import mongoose from "mongoose";
import { transactionMailer } from "../utils/transactionMailer.js";
import { uid } from "uid";
import { io } from "../index.js";
import { ContactList } from "../Models/contactList.model.js";
import { SocketModel } from "../Models/socket.model.js";

// send Money Controller
export default class SendMoneyController {
  constructor() {}
  sendMoney = async (req, res) => {
    setTimeout(async () => {
      try {
        let user = req.user;
        user = await User.findOne({ phone: user.phone });

        const recieverPhone = req.params.phone;

        const receiver = await User.findOne({ phone: recieverPhone });
        if (user.phone == recieverPhone) {
          res.status(400).send("can't send money to yourself");
        } else {
          const session = await mongoose.startSession();
          if (receiver.isKycVerified) {
            const { amount, pin } = req.body;

            if (amount < 1) {
              res.status(401).send("amount must be greater than 1");
            } else {
              session.startTransaction();

              const senderWallet = await Wallet.findOne({
                userPhone: user.phone,
              });
              const recieverWallet = await Wallet.findOne({
                userPhone: recieverPhone,
              });
              const isValid = await bcrypt.compare(pin, user.pin);
              if (isValid) {
                if (amount > senderWallet.balance) {
                  res.status(400).send("Insufficient Balance");
                } else {
                  // Creates new Transaction
                  const newTransaction = new Transaction({
                    sender: user._id,
                    receiver: recieverWallet.userId,
                    senderOB: senderWallet.balance,
                    senderCB: senderWallet.balance - Number(amount),
                    receiverOB: recieverWallet.balance,
                    receiverCB: recieverWallet.balance + Number(amount),
                    transactionID: uid(16),
                    amount,
                  });
                  await newTransaction.save();

                  // Get receiver Contact List
                  const receiverCL = await ContactList.findOne({
                    userPhone: recieverPhone,
                  });

                  // Check if sender is in contacts
                  const senderContactExists = receiverCL.contacts.find(
                    (e) => e.userId.toString() == user._id
                  );
                  // If not add in contacts
                  if (senderContactExists === undefined) {
                    receiverCL.contacts.push({
                      userId: user._id,
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      profilePic: user.profilePic,
                    });
                    const updatedReceiverCL =
                      await ContactList.findOneAndUpdate(
                        {
                          userPhone: recieverPhone,
                        },
                        {
                          ...receiverCL,
                        }
                      );
                  }

                  // // Get sender contact list
                  const senderCL = await ContactList.findOne({
                    userPhone: user.phone,
                  });

                  // //check if receiver exists i his list

                  const receiverContactExists = senderCL.contacts.find((e) => {
                    if (e.userId.toString() == receiver._id) {
                      return e;
                    }
                  });

                  // // if not add it in contacts
                  if (receiverContactExists === undefined) {
                    senderCL.contacts.push({
                      userId: receiver._id,
                      name: receiver.name,
                      email: receiver.email,
                      phone: receiver.phone,
                      profilePic: receiver.profilePic,
                    });
                    const updatedSenderCL = await ContactList.findOneAndUpdate(
                      {
                        userPhone: user.phone,
                      },
                      {
                        ...senderCL,
                      },
                      { new: true }
                    );
                  }
                  const notificationTransaction = await Transaction.findById(
                    newTransaction._id
                  ).populate("sender");

                  const generalTransaction = await Transaction.findById(
                    newTransaction._id
                  )
                    .populate("sender", "name")
                    .populate("receiver", "name");

                  const senderData = await SocketModel.findOne({
                    userId: newTransaction.sender,
                  });
                  const receiverData = await SocketModel.findOne({
                    userId: newTransaction.receiver,
                  });
                  // console.log(senderData, receiverData);

                  // // On Transaction event emitter
                  if (receiverData) {
                    // console.log("rece");
                    io.to(receiverData.socketId).emit(
                      "on transaction",
                      newTransaction
                    );
                    io.to(receiverData.socketId).emit("general transaction", {
                      transaction: generalTransaction,
                      id: receiverData.userId,
                    });
                    // console.log(receiverData.socketId);
                    io.to(receiverData.socketId).emit("notification", {
                      transaction: notificationTransaction,
                    });
                  }
                  if (senderData) {
                    // console.log("senxd");
                    io.to(senderData.socketId).emit("general transaction", {
                      transaction: generalTransaction,
                      id: senderData.userId,
                    });
                  }

                  io.emit("update_wallet", "asd");

                  // Transaction id
                  const transactionId = newTransaction._id.toString();

                  // Change Wallet Balances
                  senderWallet.balance =
                    senderWallet.balance - parseFloat(amount);
                  recieverWallet.balance =
                    recieverWallet.balance + parseFloat(amount);
                  // Push Transaction id in history
                  senderWallet.transactionHistory.push(transactionId);
                  recieverWallet.transactionHistory.push(transactionId);
                  // Update both Wallets
                  const updatedSenderWallet = await Wallet.findOneAndUpdate(
                    {
                      userPhone: user.phone,
                    },
                    { ...senderWallet },
                    { new: true }
                  );
                  const updatedRecieverWallet = await Wallet.findOneAndUpdate(
                    {
                      userPhone: recieverPhone,
                    },
                    { ...recieverWallet },
                    { new: true }
                  );

                  // // Transaction Mailer

                  transactionMailer(
                    user.email,
                    user.name,
                    "Debited",
                    transactionId,
                    amount,
                    receiver.name,
                    receiver.phone
                  );
                  transactionMailer(
                    receiver.email,
                    receiver.name,
                    "Credited",
                    transactionId,
                    amount,
                    user.name,
                    user.phone
                  );

                  await session.commitTransaction();

                  res.status(200).send("Money sent Successfully");
                }
              } else {
                res.status(401).json("Your pin in Incorrect, please check");
              }
            }
          } else {
            res.status(401).json("Receiver's KYC is Pending");
          }
        }
      } catch (error) {
        await session.abortTransaction();
        res.status(500).send(error);
      }
    }, 1000);
  };
}
