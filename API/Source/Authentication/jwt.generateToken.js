// Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// dotenv config
dotenv.config();

// Generate Token
export const generateToken = (user) => {
  try {
    const { _id } = JSON.parse(user);
    const token = jwt.sign({ id: _id.toString() }, process.env.jwt_secret, {
      expiresIn: "2h",
    });
    // console.log(token);
    return token;
  } catch (error) {
    // console.log(error);
  }
};
