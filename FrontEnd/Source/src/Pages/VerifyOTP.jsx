import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { resendOtpApi, verifyOtpApi } from "../api/loginAndVerify.Api";

const VerifyOTP = ({ loginDetails, setUser, setUserList }) => {
  const navigate = useNavigate();

  // state to store otp
  const [otp, setOtp] = useState({
    otp: "",
  });

  // state to store axios errors
  const [error, setError] = useState();

  // to set Login User
  const handleChange = (e) => {
    setOtp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // to Login and Generate OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    verifyOtpApi(loginDetails, otp, Cookies, setUser, navigate, setError); // Verify Otp Api
  };

  // to regenerate OTP
  const resendOtp = async (e) => {
    e.preventDefault();
    resendOtpApi(loginDetails, setError, navigate);
  };

  return (
    <div>
      <div className="flex justify-center">
        <img src="/images/LogoNavbarLogo.png" className="w-[20%]" alt="" />
      </div>
      <div className="flex flex-col items-center min-h-screen pt-6  sm:pt-0 bg-gray-50">
        <div className="w-full p-2 px-6 border border-gray-500 rounded-md py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <div>
            <a href="/">
              <img
                src="/images/LogoNavbarLogo.png"
                className="w-20 mx-auto"
                alt=""
              />
            </a>
          </div>
          <div>
            <h1 className="text-blue-800 text-center my-2 text-4xl font-bold">
              Two Factor Authentication:
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                OTP
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="otp"
                  value={otp.otp}
                  onChange={handleChange}
                  required
                  className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
                />
              </div>
            </div>

            {(error && error?.response.status == 400) ||
            error?.response.status == 404 ? (
              <span className="text-red-500">
                {error.response.data.message}
              </span>
            ) : (
              ""
            )}
            {/* <a href="#" className="text-xs text-blue-800 hover:underline">
              Forget Password?
            </a> */}
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800">
                Verify OTP
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            <span>
              <a
                className="text-blue-800 hover:underline"
                onClick={resendOtp}
                href="#"
              >
                Resend OTP
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
