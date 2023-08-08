import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewSignInForm from "./NewSignInForm";

const SignInForm = ({ setUser }) => {
  const [error, setError] = useState();

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6  sm:pt-0 bg-gray-50">
        <div className="w-full p-2 px-6 border border-gray-500 rounded-md py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <div>
            <a href="/">
              <img
                src="/images/LogoNavbarLogo.png"
                className="w-20 mx-auto "
                alt=""
              />
            </a>
          </div>
          <div>
            <h1 className="text-blue-800 text-center my-2 text-4xl font-bold">
              Register
            </h1>
          </div>
          <NewSignInForm setError={setError} error={error} />
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link
                to={"/login"}
                className="text-blue-800 hover:underline"
                href="#"
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
