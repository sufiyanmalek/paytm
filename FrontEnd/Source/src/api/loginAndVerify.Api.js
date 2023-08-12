import axios from "axios";
import { authApi } from "./AuthAPi/auth.Api";
import socket from "../socket";
const url = import.meta.env.VITE_API_URL;

// Register User
export const registerUserApi = async (user, profilePic, navigate, setError) => {
  var data = new FormData();
  data.append(
    "userData",
    JSON.stringify({
      ...user,
      phone: parseInt(user.phone),
    })
  );
  data.append("profilePic", profilePic);

  var config = {
    method: "post",
    url: `${url}/register`,
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.status == 200) {
        navigate("/login");
      }
    })
    .catch(function (error) {
      setError(error);
    });
};

// Login User
export const loginUserApi = async (
  loginDetails2,
  setLoginDetails,
  navigate,
  setError
) => {
  var data = JSON.stringify({
    ...loginDetails2,
    phone: parseInt(loginDetails2.phone),
  });

  var config = {
    method: "post",
    url: `${url}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      alert(response.data.message);
      setLoginDetails(loginDetails2);
      navigate("/verify");
    })
    .catch(function (error) {
      setError(error);
    });
};

// Verify Otp
export const verifyOtpApi = async (
  loginDetails,
  otp,
  Cookies,
  setUser,
  navigate,
  setError
) => {
  var data = JSON.stringify({
    phone: loginDetails.phone,
    otp: parseInt(otp.otp),
  });

  var config = {
    method: "post",
    url: `${url}/verify`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.status == 200) {
        setUser(response.data.user);
        socket.emit("user joined", response.data.user._id);
        navigate("/home");
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
      setError(error);
    });
};

// Resend Otp
export const resendOtpApi = (loginDetails, setError, navigate) => {
  var data = JSON.stringify({
    ...loginDetails,
    phone: parseInt(loginDetails.phone),
  });

  var config = {
    method: "post",
    url: `${url}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      alert(response.data.message);
    })
    .catch(function (error) {
      setError(error);
      if (error.response.status == 404) {
        navigate("/login");
      }
    });
};
