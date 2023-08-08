// imports
import { generateToken } from "../Authentication/jwt.generateToken.js";
import { userOtpModel } from "../Models/otp.model.js";
import { User } from "../Models/user.model.js";

// verify otp controller
export const verifyOtp = async (req, res) => {
  try {
    const otp = await userOtpModel.findOne({ phone: req.body.phone });
    if (otp) {
      if (otp.otp == req.body.otp) {
        setTimeout(async () => {
          await userOtpModel.findOneAndDelete({ phone: req.body.phone });
        }, 3000);
        const user = await User.findOne({ phone: req.body.phone });
        const userList = await User.find({}, { phone: 1, name: 1, email: 1 });
        const token = generateToken(JSON.stringify(user));
        res.cookie("token", token, {
          httpOnly: false,
        });
        res
          .status(200)
          .json({ message: "Successfully logged in!", user, userList, token });
      } else {
        res
          .status(400)
          .json({ message: "invalid Otp, retry or generate new otp" });
      }
    } else {
      res.status(404).json({
        message: "Otp has been expired! regenerate Otp",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
