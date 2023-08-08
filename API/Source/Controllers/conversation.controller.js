// Imports
import { Conversation } from "../Models/conversation.model.js";
import { Message } from "../Models/message.model.js";

export default class ConversationController {
  constructor() {}
  sendMessage = async (req, res) => {
    try {
      const { sender, receiver, message } = req.body;
      const conversation = await Conversation.findOne({
        $and: [
          {
            members: { $in: [sender] },
          },
          {
            members: { $in: [receiver] },
          },
        ],
      });
      if (conversation) {
        const newMessage = new Message({
          conversationId: conversation._id,
          senderId: sender,
          message: message,
        });
        await newMessage.save();
        res.status(200).send(newMessage);
      } else {
        const conversation = new Conversation({
          members: [sender, receiver],
        });
        await conversation.save();
        const newMessage = new Message({
          conversationId: conversation._id,
          senderId: sender,
          message: message,
        });
        await newMessage.save();
        res.status(200).send(newMessage);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getConversationMessages = async (req, res) => {
    try {
      const { sender, receiver } = JSON.parse(req.headers.data);
      const conversation = await Conversation.findOne({
        $and: [
          {
            members: { $in: [sender] },
          },
          {
            members: { $in: [receiver] },
          },
        ],
      });
      if (conversation) {
        const messages = await Message.find({
          conversationId: conversation._id,
        }).populate("senderId");
        res.status(200).send(messages);
      } else {
        const conversation = new Conversation({
          members: [sender, receiver],
        });
        await conversation.save();
        const messages = await Message.find({
          conversationId: conversation._id,
        }).populate("senderId");

        res.status(200).send(messages);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
