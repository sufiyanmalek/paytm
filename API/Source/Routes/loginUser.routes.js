// import modules
import express from "express";
import { loginUser } from "../Controllers/login.controller.js";
import { verifyOtp } from "../Controllers/vertifyOtp.controller.js";

// export login router
export const login = express.Router();

// login user
login.post("/login", loginUser);
login.post("/verify", verifyOtp);
