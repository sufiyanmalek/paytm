// imports
import express from "express";
import Controller from "../Controllers/conversation.controller.js";

// Conversation Controller
const ConversationController = new Controller();

// Conversation Router
export const ConversationRouter = express.Router();

// Send Message
ConversationRouter.post("/conversation", ConversationController.sendMessage);

// Get all messages of a conversation
ConversationRouter.get(
  "/conversation",
  ConversationController.getConversationMessages
);
