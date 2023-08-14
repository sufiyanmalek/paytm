import axios from "axios";
import { toast } from "react-toastify";
import { getContactList } from "../../store/contacts/contactSlice";
const url = import.meta.env.VITE_API_URL;
// Get Contacts of User
export const getContactsApi = (user, dispatch) => {
  var data = user;
  var config = {
    method: "post",
    url: `${url}/contacts`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        // console.log(response.data, "asd");
        dispatch(getContactList(response.data.contactList));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Add Contacts
export const addContactApi = (contact, dispatch) => {
  const id = toast.loading("Please Wait...", { position: "top-center" });
  var data = JSON.stringify({
    userId: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    profilePic: contact.profilePic,
  });
  var config = {
    method: "post",
    url: `${url}/contacts/add`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      // console.log(response.data);
      dispatch(getContactList(response.data.contactList));
      toast.update(id, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
        position: "top-center",
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Remove Contact
export const removeContactApi = (contact, dispatch) => {
  const id = toast.loading("Please Wait...", { position: "top-center" });
  var data = JSON.stringify(contact);
  var config = {
    method: "delete",
    url: `${url}/contacts/remove`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      dispatch(getContactList(response.data.contactList));
      toast.update(id, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
        position: "top-center",
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
