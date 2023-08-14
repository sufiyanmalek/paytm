// import modules
import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { ContactList } from "../Models/contactList.model.js";
import { Wallet } from "../Models/wallet.model.js";
import { putObject } from "../utils/s3putObject.utils.js";

// register user controller
export const registerUser = async (req, res) => {
  const AcceptedFileType = ["image/png", "image/webp", "image/jpeg"];
  try {
    const data = JSON.parse(req.body.userData);
    // console.log(data);
    const pic = req.files?.profilePic;
    if (AcceptedFileType.includes(pic.mimetype)) {
      const userx = await User.findOne({
        email: data.email,
      });
      // console.log(userx);
      const user = await User.findOne({
        phone: data.phone,
      });

      if (user) {
        res.status(400).json({
          message:
            "Phone no already in Use, Login or Try with different number!",
        });
      } else if (userx) {
        res.status(400).json({
          message: "Email already in Use, try different email!",
        });
      } else {
        const profilePic = await putObject(pic.data);
        const password = await bcrypt.hash(data.password, 10);
        const pin = await bcrypt.hash(data.pin, 10);
        const newUser = new User({ ...data, password, pin, profilePic });
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
    } else {
      res.status(400).json({
        error: "Validation error",
        message: "Invalid file type Profile pic",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
