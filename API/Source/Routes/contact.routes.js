// import modules
import express from "express";
import Controller from "../Controllers/contacts.controller.js";
import { Validator } from "../Middlewares/joiValidator.js";
import { contactSchema } from "../JoiObjects/joiObjects.js";

// Contacts Controllers
const ContactController = new Controller();

// Validator Middleware
const contactValidator = new Validator(contactSchema);

// export contactlist Router
export const contactList = express.Router();

// get all contacts
contactList.post("/contacts", ContactController.getAllContacts);

// add contacts
contactList.post(
  "/contacts/add",
  contactValidator.validate,
  ContactController.addContact
);

//delete contacts
contactList.delete("/contacts/remove", ContactController.removeContact);
