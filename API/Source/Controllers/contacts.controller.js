// imports
import { ContactList } from "../Models/contactList.model.js";

export default class ContactController {
  constructor() {}
  // get all contacts of current User
  getAllContacts = async (req, res) => {
    try {
      const user = req.user;
      const id = user._id;

      const contactList = await ContactList.findOne({
        userPhone: user.phone,
      });

      if (!contactList) {
        const contactList = new ContactList({
          userId: user._id,
          userPhone: user.phone,
          contacts: [],
        });
        await contactList.save();
        userList = userList.filter((e) => {
          if (e._id != id) {
            const user = contactList.contacts.find((user) => {
              if (user.userId == e._id.toString()) {
                return user;
              }
            });
            if (user == undefined) {
              return e;
            } else {
              return;
            }
          } else {
            return;
          }
        });
        res.status(200).json({
          message:
            "There was no contact list for this user so created a new one",
          contactList: contactList,
        });
      } else {
        res.status(200).json({
          messsage: "Contact List Already Exists",
          contactList,
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // add contact to contact List of current user and create a new contact List if doesnt exist
  addContact = async (req, res) => {
    setTimeout(async () => {
      try {
        const user = req.user;
        // console.log(req.body);
        // console.log(user);
        const contactList = await ContactList.findOne({
          userPhone: user.phone,
        });

        // console.log(req.body);

        const contact = contactList.contacts.find(
          (e) => e.userId == req.body.userId
        );
        if (contact) {
          res.status(200).json({
            message: `${req.body.name} is already  your contact!`,
            contactList,
          });
        } else {
          contactList.contacts.push(req.body);
          const updatedContactList = await ContactList.findOneAndUpdate(
            { userPhone: user.phone },
            { ...contactList },
            { new: true }
          );

          res.status(200).json({
            message: `${req.body.name} has been added to your Contacts`,
            contactList: updatedContactList,
          });
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }, 1000);
  };

  // remove contact from user contact list
  removeContact = async (req, res) => {
    setTimeout(async () => {
      try {
        let user = req.user;
        const contactList = await ContactList.findOne({
          userPhone: user.phone,
        });

        const contacts = contactList.contacts.filter(
          (user) => user.phone !== req.body.phone
        );
        const updatedContactList = await ContactList.findOneAndUpdate(
          {
            userPhone: user.phone,
          },
          {
            $set: {
              contacts: contacts,
            },
          },
          {
            new: true,
          }
        );

        res.status(200).json({
          message: `${req.body.name} has been removed from Contacts`,
          contactList: updatedContactList,
        });
      } catch (error) {
        res.status(500).send(error);
      }
    }, 1000);
  };
}
