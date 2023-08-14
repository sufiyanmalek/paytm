// Imports
import { Transaction } from "../Models/transaction.model.js";

export default class TransactionController {
  constructor() {}
  // Get All Transactions of User
  getTransactions = async (req, res) => {
    setTimeout(async () => {
      try {
        const user = req.user;
        const pageNo = parseInt(req.query.pageNo);
        let { startDate, endDate } = req.query;
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const hoursToAdd = 23;
        const minutesToAdd = 59;
        const secondsToAdd = 59;
        endDate.setHours(endDate.getHours() + hoursToAdd);
        endDate.setMinutes(endDate.getMinutes() + minutesToAdd);
        endDate.setSeconds(endDate.getSeconds() + secondsToAdd);
        endDate = new Date(endDate);

        const limit = 10;
        let transactions = await Transaction.find({
          $or: [{ receiver: user._id }, { sender: user._id }],
          $and: [
            { timestamp: { $gte: startDate } },
            { timestamp: { $lte: endDate } },
          ],
        })
          .populate("sender", "name")
          .populate("receiver", "name")
          .sort({ timestamp: -1 })
          .skip(limit * pageNo)
          .limit(limit);

        if (transactions) {
          res.status(200).json({ transactions, pageNo: pageNo + 1 });
        } else {
          res.status(200).send("User hasn't made any payements yet");
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }, 2000);
  };

  // Get Transaction with particular user
  getP2pTransaction = async (req, res) => {
    try {
      const user = req.user;
      const { id } = req.params;
      let transaction = await Transaction.find({
        $and: [
          { receiver: { $in: [user._id, id] } },
          { sender: { $in: [user._id, id] } },
        ],
      })
        .populate("sender", "name ")
        .populate("receiver", "name");
      transaction = transaction.filter((e) => {
        if (e.sender._id.toString() !== e.receiver._id.toString()) {
          return e;
        }
      });
      // console.log(transaction);
      res.send(transaction);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // Get Custom Transactions
  getCustomTransactions = async (req, res) => {
    try {
      const user = req.user;
      // console.log(req.query);
      let { startDate, endDate } = req.query;
      startDate = new Date(startDate);
      const millisecondsInOneDay = 24 * 60 * 60 * 1000;
      const millisecondsToSubtract =
        startDate.getTime() - (startDate.getTime() % millisecondsInOneDay);
      startDate.setTime(millisecondsToSubtract);
      startDate = startDate.toISOString();

      endDate = new Date(endDate);

      if (startDate > endDate) {
        res.status(400).send("Start date should be smaller than End date!");
      } else {
        endDate = new Date(new Date(endDate).getTime() + 86400000);

        let transaction = await Transaction.find({
          $and: [
            { $or: [{ receiver: user._id }, { sender: user._id }] },
            { timestamp: { $gte: startDate, $lte: endDate } },
          ],
        })
          .populate("sender", "name")
          .populate("receiver", "name")
          .sort({ timestamp: -1 });

        // console.log(transaction.length);
        if (transaction.length > 0) {
          let openingBalance;
          if (
            transaction[transaction.length - 1].sender._id.toString() ===
            user._id.toString()
          ) {
            openingBalance = transaction[transaction.length - 1].senderOB;
            // console.log(openingBalance);
          } else {
            openingBalance = transaction[transaction.length - 1].receiverOB;
            // console.log(openingBalance);
          }
          let closingBalance;
          if (transaction[0].sender._id.toString() === user._id.toString()) {
            closingBalance = transaction[0].senderCB;
            // console.log(closingBalance);
          } else {
            closingBalance = transaction[0].receiverCB;
            // console.log(closingBalance);
          }

          let Out = 0;
          let In = 0;
          transaction.forEach((e) => {
            if (
              e.sender._id.toString() == user._id.toString() &&
              e.receiver._id.toString() != user._id.toString()
            ) {
              Out = Out + e.amount;
            } else if (
              e.receiver._id.toString() == user._id.toString() &&
              e.sender._id.toString() != user._id.toString()
            ) {
              In = In + e.amount;
            } else {
              In = In + e.amount;
            }
          });

          // console.log(Out, In);

          res.status(200).json({
            transaction,
            Out,
            In,
            startDate,
            endDate,
            openingBalance,
            closingBalance,
          });
        } else {
          res.status(200).send("No Transactions on this Dates");
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
