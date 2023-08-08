import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ContactSection from "../Components/ContactSection";
import Cookies from "js-cookie";
import { getContactsApi } from "../api/Contacts/contacts.Api";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";

const Pay = ({ user }) => {
  const contacts = useSelector((state) => state.contacts.contactList);
  const dispatch = useDispatch();
  // User's Contact List
  const [userList, setUserList] = useState([]);
  //gets current users Contact List
  useEffect(() => {
    getContacts();
  }, []);

  // get Contacts
  const getContacts = () => {
    getContactsApi(user, setUserList, dispatch);
  };
  return (
    <>
      <Navbar user={user} />
      <div className="bg-[#00174d] h-60  text-white mt-24">
        <div className="  border-2 border-[#21b1f8]"></div>

        <p className="text-center py-8 text-xs">
          Home {"  >   "}
          <span className="font-bold">Send Money</span>
        </p>
      </div>
      <div className="  border-2 border-[#21b1f8]"></div>

      <ContactSection
        user={user}
        userList={userList}
        contactList={contacts}
        setUserList={setUserList}
      />
      <div className="md:mt-[40vh] mt-[65vh]">
        <Footer />
      </div>
    </>
  );
};

export default Pay;
