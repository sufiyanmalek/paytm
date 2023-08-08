import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../api/loginAndVerify.Api";

const LoginForm = ({ setLoginDetails }) => {
  const navigate = useNavigate(); // to navigate
  const [loginDetails2, setLoginDetails2] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState(); //  to store axios errors

  // to set Login User
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails2((prev) => ({ ...prev, [name]: value }));
  };

  // to Login and Generate OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUserApi(loginDetails2, setLoginDetails, navigate, setError); // Login User Api
  };
  return (
    <div>
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
              Login
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Phone
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="phone"
                  onChange={handleChange}
                  value={loginDetails2.phone}
                  required
                  className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={loginDetails2.password}
                  onChange={handleChange}
                  required
                  className="block w-full p-2 mt-1 border border-gray-500 rounded-md "
                />
              </div>
            </div>

            {(error && error?.response.status == 401) ||
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
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            You don't have an account?{" "}
            <span>
              <Link
                to={"/signin"}
                className="text-blue-800 hover:underline"
                href="#"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
