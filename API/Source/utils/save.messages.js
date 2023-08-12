import { ContactList } from "../Models/contactList.model.js";
import { Conversation } from "../Models/conversation.model.js";
import { Message } from "../Models/message.model.js";
import { User } from "../Models/user.model.js";

export const saveMessage = async (data) => {
  try {
    const { sender, receiver, message } = data;
    const senderData = await User.findById(sender);
    const receiverData = await User.findById(receiver);

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
      // Get receiver Contact List
      const receiverCL = await ContactList.findOne({
        userPhone: receiverData.phone,
      });

      // Check if sender is in contacts
      const senderContactExists = receiverCL.contacts.find(
        (e) => e.userId.toString() == senderData._id
      );

      // If not add in contacts
      if (senderContactExists === undefined) {
        receiverCL.contacts.push({
          userId: senderData._id,
          name: senderData.name,
          email: senderData.email,
          phone: senderData.phone,
          profilePic: senderData.profilePic,
        });
        const updatedReceiverCL = await ContactList.findOneAndUpdate(
          {
            userPhone: receiverData.phone,
          },
          {
            ...receiverCL,
          }
        );
      }

      const messagePopulated = await Message.findById(newMessage._id).populate(
        "senderId",
        "name"
      );
      return messagePopulated;
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

      const messagePopulated = await Message.findById(newMessage._id).populate(
        "senderId",
        "name"
      );
      return messagePopulated;
    }
  } catch (error) {
    console.log(error);
  }
};
