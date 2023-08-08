import React, { useState } from "react";
import Cookies from "js-cookie";
import PaymentModal from "./PaymentModal";
import SearchContact from "./SearchContact";
import MyContacts from "./MyContacts";
import { addContactApi, removeContactApi } from "../api/Contacts/contacts.Api";
import { useDispatch, useSelector } from "react-redux";

const ContactSection = ({ userList, setUserList, user }) => {
  const contactList = useSelector((state) => state.contacts.contactList);
  console.log(contactList);
  const dispatch = useDispatch();
  const [payBool, setPayBool] = useState(false);
  const [reciever, setReciever] = useState();
  const [searchList, setSearchList] = useState(userList);
  const searchUser = (e) => {
    const users = userList.filter((user) => {
      if (e.target.value === "") {
        return;
      }
      if (user.phone.toString().match(e.target.value)) {
        return user;
      }
    });
    setSearchList(users);
  };

  //add to User's Contact List
  const addToContacts = (contact) => {
    addContactApi(contact, setUserList, setSearchList, dispatch); // Add to Contact Api
  };

  // Pay to Contact
  const payContact = (user) => {
    console.log(user);
    console.log(user, "a");
    setReciever(user);
    setPayBool(true);
  };

  // Remove Contact
  const removeContact = (contact) => {
    removeContactApi(contact, dispatch, setUserList, setSearchList);
  };
  return (
    <>
      <div className="grid md:grid-cols-2  w-[70%] mx-auto left-0 right-0 bg-white border border-gray-500    absolute top-44 rounded-2xl ">
        <SearchContact
          user={user}
          searchUser={searchUser}
          userList={searchList}
          addToContacts={addToContacts}
          payContact={payContact}
        />
        <MyContacts
          user={user}
          contactList={contactList}
          removeContact={removeContact}
          payContact={payContact}
        />
      </div>
      {payBool && (
        <PaymentModal setPayBool={setPayBool} user={user} reciever={reciever} />
      )}
    </>
  );
};

export default ContactSection;
