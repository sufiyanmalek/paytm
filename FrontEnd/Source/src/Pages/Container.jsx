import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignIn from "./SignIn";
import LoginPage from "./LoginPage";
import VerifyOTP from "./VerifyOTP";
import HomePage from "./HomePage";
import WalletPage from "./WalletPage";
import { ToastContainer, toast } from "react-toastify";
import TransactionPage from "./TransactionPage";
import Pay from "./Pay";
import Contacts from "./Contacts";
import socket from "../socket";
import Cookies from "js-cookie";
import TextToSpeech from "../utils/Polly";
import { useDispatch } from "react-redux";
import { unshiftTransaction } from "../store/transactions/transactionSlice";
import PageNotFound from "./PageNotFound";
import { getContactsApi } from "../api/Contacts/contacts.Api";
import { playNotificationSound } from "../utils/notification";
import axios from "axios";
import { AuthRoute } from "./AuthRoute";
const url = import.meta.env.VITE_API_URL;

const Container = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  console.log(user, "123");

  //Connect to Socket

  useEffect(() => {
    // Payment Notification
    socket.on("notification", async (data) => {
      console.log(data);
      getContactsApi(user, undefined, dispatch);
      const id = toast.loading("You have one Notification", {
        position: "top-center",
      });
      toast.update(id, {
        render: `Rs.${data.transaction.amount} received from ${data.transaction.sender.name}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
        position: "top-center",
      });
      await TextToSpeech(data.transaction.amount);
    });
    // Message Notification
    socket.on("message_notification", (data) => {
      if (window.location.pathname !== "/contacts") {
        const id = toast.loading("You have one Notification", {
          position: "top-center",
        });
        toast.update(id, {
          render: (
            <>
              <Link to={"/contacts"}>
                <p>New message from {data.senderId.name}</p>
              </Link>
            </>
          ),
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
          position: "top-center",
          closeOnClick: true,
        });
        playNotificationSound();
      }
    });
    // Live transaction update
    socket.on("general transaction", ({ transaction, id }) => {
      console.log(transaction);
      console.log(user);
      let newTransaction;
      if (transaction.sender._id == transaction.receiver._id) {
        newTransaction = { ...transaction, status: "Added" };
      } else if (
        transaction.sender._id == id &&
        transaction.receiver._id != id
      ) {
        newTransaction = { ...transaction, status: "Debited" };
      } else if (
        transaction.receiver._id == id &&
        transaction.sender._id != id
      ) {
        newTransaction = { ...transaction, status: "Credited" };
      }
      console.log(newTransaction, "asd");
      dispatch(unshiftTransaction(newTransaction));
    });
    return () => {
      socket.off("notification");
      socket.off("message_notification");
      socket.off("general transaction");
    };
  }, [socket]);

  // State to store login details
  const [loginDetails, setLoginDetails] = useState({
    phone: "",
    password: "",
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route
          path="/login"
          element={
            <LoginPage
              setLoginDetails={setLoginDetails}
              loginDetails={loginDetails}
            />
          }
        ></Route>
        <Route
          path="/verify"
          element={<VerifyOTP loginDetails={loginDetails} setUser={setUser} />}
        ></Route>

        <Route
          path="/home"
          element={
            <AuthRoute user={user} setUser={setUser} Component={HomePage} />
          }
        />
        <Route
          path="/wallet"
          element={
            <AuthRoute user={user} setUser={setUser} Component={WalletPage} />
          }
        />
        <Route
          path="/pay"
          element={<AuthRoute user={user} setUser={setUser} Component={Pay} />}
        />
        <Route
          path="/contacts"
          element={
            <AuthRoute user={user} setUser={setUser} Component={Contacts} />
          }
        />
        <Route
          path="/transactions"
          element={
            <AuthRoute
              user={user}
              setUser={setUser}
              Component={TransactionPage}
            />
          }
        />

        {/* <Route element={<AuthRoute user={user} setUser={setUser} />}>
          <Route
            path="/home"
            element={<HomePage user={user} setUser />}
          ></Route>

          <Route path="/wallet" element={<WalletPage user={user} />}></Route>
          <Route path="/pay" element={<Pay user={user} />}></Route>
          <Route path="/contacts" element={<Contacts user={user} />}></Route>
          <Route
            path="/transactions"
            element={<TransactionPage setUser={setUser} user={user} />}
          ></Route>
        </Route> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Container;
