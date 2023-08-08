// import modules
import express from "express";
import { registerUser } from "../Controllers/register.controller.js";
import { Validator } from "../Middlewares/joiValidator.js";
import { userSchema } from "../JoiObjects/joiObjects.js";

// Validator Middleware
const userValidator = new Validator(userSchema);

// export router
export const register = express.Router();

// register user
register.post("/register", userValidator.validate, registerUser);
