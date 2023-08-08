import axios from "axios";
import { toast } from "react-toastify";
import { getContactList } from "../../store/contacts/contactSlice";
const url = import.meta.env.VITE_API_URL;
// Get Contacts of User
export const getContactsApi = (user, setUserList, dispatch) => {
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
        if (setUserList) {
          setUserList(response.data.userList);
        }
        dispatch(getContactList(response.data.contactList));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Add Contacts
export const addContactApi = (
  contact,
  setUserList,
  setSearchList,
  dispatch
) => {
  const id = toast.loading("Please Wait...", { position: "top-center" });
  var data = JSON.stringify({
    userId: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
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
      console.log(response.data);
      dispatch(getContactList(response.data.contactList));
      setUserList(response.data.userList);
      setSearchList(response.data.userList);
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
export const removeContactApi = (
  contact,
  dispatch,
  setUserList,
  setSearchList
) => {
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
      setUserList(response.data.userList);
      setSearchList(response.data.userList);
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
