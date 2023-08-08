import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ContactSection from "../Components/ContactSection";
import { getContactsApi } from "../api/Contacts/contacts.Api";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";

const Pay = ({ user }) => {
  const dispatch = useDispatch();
  //gets current users Contact List
  useEffect(() => {
    getContacts();
  }, []);

  // get Contacts
  const getContacts = () => {
    getContactsApi(user, dispatch);
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

      <ContactSection user={user} />
      <div className="md:mt-[40vh] mt-[65vh]">
        <Footer />
      </div>
    </>
  );
};

export default Pay;
