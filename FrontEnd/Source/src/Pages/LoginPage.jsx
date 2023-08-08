import React from "react";
import LoginForm from "../Components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = ({ setLoginDetails, loginDetails }) => {
  return (
    <div>
      <Link to={"/"} className="flex justify-center">
        <img src="/images/LogoNavbarLogo.png" className="w-[20%]" alt="" />
      </Link>
      <LoginForm setLoginDetails={setLoginDetails} />
    </div>
  );
};

export default LoginPage;
