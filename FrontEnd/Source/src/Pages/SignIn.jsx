import React, { useEffect } from "react";
import SignInForm from "../Components/SignInForm";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get("token");
    if (!cookie) {
      navigate("/signin");
    } else {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      <Link to={"/"} className="flex justify-center">
        <img src="/images/LogoNavbarLogo.png" className="w-[20%]" alt="" />
      </Link>
      <SignInForm setUser={setUser} />
    </div>
  );
};

export default SignIn;
