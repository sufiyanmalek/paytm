import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="">
        <a href="/">
          <img
            src="/images/LogoNavbarLogo.png"
            className=" mx-auto w-[50%] sm:w-[30%] md:w-[35%] lg:w-[20%]"
            alt=""
          />
        </a>
      </div>
      <div className="flex  justify-center h-[100vh] ">
        <div>
          <img
            src="/images/404img.png"
            className="w-[300px] mt-28"
            alt="404 not found image"
          />
          <div className="text-center">
            <Link
              to={"/home"}
              className="mx-auto bg-blue-800 hover:bg-blue-600  text-white font-semibold px-2 py-2 rounded-md"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
