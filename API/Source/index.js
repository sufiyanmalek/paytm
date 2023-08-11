import express from "express";
import { connectToDB } from "./config/connectDB.js";
import { register } from "./Routes/register.routes.js";
import { login } from "./Routes/loginUser.routes.js";
import { contactList } from "./Routes/contact.routes.js";
import { wallet } from "./Routes/wallet.routes.js";
import { sendMoneyRouter } from "./Routes/sendMoney.routes.js";
import cors from "cors";
import { transactionRouter } from "./Routes/transactions.routes.js";
import { AuthRouter } from "./Routes/auth.routes.js";
import { ConversationRouter } from "./Routes/conversation.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { saveMessage } from "./utils/save.messages.js";
import cookieParser from "cookie-parser";
import { SocketModel } from "./Models/socket.model.js";
import { verifyToken } from "./Authentication/jwt.verifyToken.js";
import { searchRouter } from "./Routes/search.routes.js";
import fileUpload from "express-fileupload";
import { fileRouter } from "./Routes/qrReader.routes.js";
import { kycRouter } from "./Routes/kyc.routes.js";

// express app
const app = express();

// http server
const httpServer = createServer(app);
const io = new Server(httpServer);

// Socket for messages
io.on("connection", async (socket) => {
  console.log(socket.id);

  socket.on("user joined", async (id) => {
    const socketData = await SocketModel.findOne({ userId: id });
    if (socketData) {
      const updatedSocketData = await SocketModel.findOneAndUpdate(
        {
          userId: id,
        },
        {
          $set: {
            socketId: socket.id,
          },
        }
      );
      console.log(updatedSocketData, "update");
    } else {
      const deleteSockets = await SocketModel.deleteMany({ userId: id });
      const socketData = new SocketModel({
        userId: id,
        socketId: socket.id,
      });
      await socketData.save();
      console.log(socketData, "new");
    }
  });

  socket.on("message", async (data) => {
    const sendMessage = await saveMessage(data);
    const senderData = await SocketModel.findOne({ userId: data.sender });
    const receiverData = await SocketModel.findOne({ userId: data.receiver });
    if (receiverData) {
      socket.to(receiverData.socketId).emit("message", sendMessage);
      io.to(receiverData.socketId || "aahjsdahjs").emit(
        "message_notification",
        sendMessage
      );
    }
    if (senderData) {
      io.to(senderData.socketId).emit("message", sendMessage);
    }
  });

  socket.on("sign_out", async (id) => {
    const deleteSocketData = await SocketModel.findOneAndDelete({
      userId: id,
    }).populate("userId");
    console.log(deleteSocketData, "deleted");
  });
});

// cors config
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.102.104:5173",
      "http://172.17.0.1:5173",
      "*",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(fileUpload());

// database connection
connectToDB();

// JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileRouter);

// Register User
app.use(register);

// Login User
app.use(login);

//Jwt Middleware
app.use(verifyToken);

// KYC Router
app.use(kycRouter);

// Search Router
app.use(searchRouter);

// Contacts
app.use(contactList);

// Wallet
app.use(wallet);

// Send Money
app.use(sendMoneyRouter);

// Transaction Router
app.use(transactionRouter);

// Auth Router
app.use(AuthRouter);

// Conversation Router
app.use(ConversationRouter);

httpServer.listen(3000, () => {
  console.log("server up and running on port 3000");
});

export { io };
