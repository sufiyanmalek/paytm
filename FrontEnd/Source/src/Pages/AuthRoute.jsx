import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import socket from "../socket";
const url = import.meta.env.VITE_API_URL;

export const AuthRoute = ({ setUser, user, Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Socket Connect
  const connectSocket = async () => {
    var config = {
      method: "get",
      url: `${url}/auth`,
    };
    try {
      const response = await axios(config);
      socket.emit("user joined", response.data.user._id);
    } catch (error) {}
  };
  //gets current users Contact List
  useEffect(() => {
    connectSocket();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    AuthUser();
  }, [window.location.href]);

  const AuthUser = async () => {
    var config = {
      method: "get",
      url: `${url}/auth`,
    };
    try {
      const response = await axios(config);
      setIsAuthenticated(response.data.auth);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
      Cookies.remove("user");
      navigate("/login");
    }
  };
  return <>{isAuthenticated && <Component user={user} />}</>;
};
