import React, { useState } from "react";
import Cookies from "js-cookie";
import PaymentModal from "./PaymentModal";
import SearchContact from "./SearchContact";
import MyContacts from "./MyContacts";
import { addContactApi, removeContactApi } from "../api/Contacts/contacts.Api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KycModal } from "./KycModal";

const ContactSection = ({ user }) => {
  const contactList = useSelector((state) => state.contacts.contactList);
  // console.log(contactList);
  const dispatch = useDispatch();
  const [payBool, setPayBool] = useState(false);
  const [reciever, setReciever] = useState();
  const [kycPrompt, setKycPrompt] = useState(false);

  //add to User's Contact List
  const addToContacts = (contact) => {
    addContactApi(contact, dispatch); // Add to Contact Api
  };

  // Pay to Contact
  const payContact = (receiver) => {
    // console.log(receiver);
    // console.log(receiver, "a");
    setReciever(receiver);
    if (user.isKycVerified) {
      setPayBool(true);
    } else {
      setKycPrompt(true);
    }
  };

  // Remove Contact
  const removeContact = (contact) => {
    removeContactApi(contact, dispatch);
  };
  return (
    <>
      <div className="grid md:grid-cols-2 mg:[80%] w-[90%] lg:w-[70%] mx-auto left-0 right-0 bg-white border border-gray-500    absolute top-44 rounded-2xl ">
        <SearchContact
          user={user}
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
      {kycPrompt && <KycModal setKycPrompt={setKycPrompt} />}
    </>
  );
};

export default ContactSection;
