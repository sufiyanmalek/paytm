// Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/user.model.js";

// dotenv config
dotenv.config();

// Verify Token
export const verifyToken = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.jwt_secret, async (err, data) => {
    try {
      if (err) {
        console.log();
        throw "Invalid User";
      } else {
        const user = await User.findById(data.id);
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).send(error);
    }
  });
};
