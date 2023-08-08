import { ContactList } from "../Models/contactList.model.js";
import { User } from "../Models/user.model.js";

export const searchController = async (req, res) => {
  setTimeout(async () => {
    try {
      const user = req.user;
      const id = user._id;

      const contactList = await ContactList.findOne({
        userPhone: user.phone,
      });
      let userList = await User.find({}, { phone: 1, name: 1, email: 1 });
      userList = userList.filter((e) => {
        if (e._id != id) {
          console.log("object");
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
      const { phone } = req.query;
      const searchData = userList.filter((e) =>
        e.phone.toString().match(phone)
      );

      console.log(searchData);
      res.status(200).send(searchData);
    } catch (error) {
      res.status(500).send(error);
    }
  }, 2000);
};
