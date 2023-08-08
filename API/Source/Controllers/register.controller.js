// import modules
import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { ContactList } from "../Models/contactList.model.js";
import { Wallet } from "../Models/wallet.model.js";

// register user controller
export const registerUser = async (req, res) => {
  try {
    const users = await User.find();
    const user = users.find((e) => e.phone == req.body.phone);
    const userx = users.find((e) => e.email == req.body.email);
    if (user) {
      res.status(400).json({
        message: "Phone no already in Use, Login or Try with different number!",
      });
    } else if (userx) {
      res.status(400).json({
        message: "Email already in Use, try different email!",
      });
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      const pin = await bcrypt.hash(req.body.pin, 10);
      const newUser = new User({ ...req.body, password, pin });
      await newUser.save();

      const contactList = new ContactList({
        userId: newUser._id,
        userPhone: newUser.phone,
        contacts: [],
      });
      await contactList.save();
      const wallet = new Wallet({
        userId: newUser._id,
        userPhone: newUser.phone,
        transactionHistory: [],
      });
      await wallet.save();
      res.status(200).json({
        message: "User registered successfully",
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
