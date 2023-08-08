// Imports
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//connect to Database
export const connectToDB = () => {
  const connection = mongoose
    .connect(`${process.env.MONGO_URL}/paytmDB`)
    .then(() => {
      console.log("connected to DB successfully...");
    })
    .catch((e) => {
      console.log(e);
    });
};
