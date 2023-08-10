import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import socket from "../socket";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const ref = useRef();
  const [toggle, setToggle] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  //to signout
  const signOut = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    socket.emit("sign_out", user._id);
    navigate("/login");
  };

  return (
    <nav className="fixed z-50 bg-white w-[100%] top-0 ">
      <div className="p-4 flex  justify-between items-center ">
        <div className="flex justify-center items-center ">
          <div>
            {sidebarToggle ? (
              <RxCross1
                size={25}
                className="sm:block md:block lg:hidden cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSidebarToggle((prev) => !prev);
                }}
              />
            ) : (
              <RxHamburgerMenu
                size={25}
                className="sm:block md:block lg:hidden cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSidebarToggle((prev) => !prev);
                }}
              />
            )}
          </div>
          <Link
            to={`${location.pathname !== "/home" ? "/home" : "/home"}`}
            className="xl:ms-3 my-auto"
          >
            <img
              src="/images/LogoNavbarLogo.png"
              className="w-40 md:w-48"
              alt=""
            />
          </Link>
        </div>
        {location.pathname === "/" ? (
          <ul className="hidden sm:hidden md:hidden lg:flex align-items-center ">
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <a href="#">Paytm for Consumer</a>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <a href="#">Paytm For Business</a>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <a href="#">Company</a>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <a href="#">Career</a>
            </li>
          </ul>
        ) : (
          <ul className="hidden sm:hidden md:hidden lg:flex align-items-center ">
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <Link to="/wallet">Your Wallet</Link>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <Link to="/contacts">P2P Transactions</Link>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <Link to="/pay">Search and Pay</Link>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <Link to="/transactions">All Transactions</Link>
            </li>
            <li className="md:px-2 xl:px-5 navLinks my-auto font-medium xl:text-lg">
              <Link to="/paybyQR">Pay By QR</Link>
            </li>
          </ul>
        )}

        {location.pathname == "/" && (
          <Link to={"/signin"} className="w-20 sm:w-auto my-auto rounded-3xl">
            <img
              src="/images/SignIn Buttonsignin button.png "
              className="hover:shadow-md hover:shadow-blue-500 rounded-3xl"
              alt=""
            />
          </Link>
        )}
        {location.pathname !== "/" && (
          <>
            <div className=" my-auto text-white  ">
              {
                <Link
                  to={"/Profile"}
                  className="bg-[#002970]  me-5 sm:p-2 sm:py-3  rounded-full "
                >
                  <p className="mx-2 ms-4 sm:inline-block hidden">
                    {" "}
                    Hi, {user.phone}
                  </p>
                  <img
                    className="inline-block w-12 sm:w-auto"
                    src="/images/userIcon.svg"
                    alt="user"
                  ></img>
                </Link>
              }
              <button
                onClick={signOut}
                className="bg-transparent hidden sm:hidden md:hidden lg:inline-block  hover:bg-[#002970] text-[#002970] font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
      {
        <div
          className={` sm:block md:block lg:hidden  ${
            sidebarToggle ? "w-[100%]" : "w-0"
          }  h-[100vh] overflow-hidden transition-all duration-500 fixed z-50 bg-white  `}
        >
          <ul className="p-4">
            <li className="text-base font-medium p-5 border-b border-gray-500">
              <Link to="/wallet">Your Wallet</Link>
            </li>
            <li className="text-base font-medium p-5 border-b border-gray-500">
              <Link to="/contacts">P2P Transactions</Link>
            </li>
            <li className="text-base font-medium p-5 border-b border-gray-500">
              <Link to="/pay">Search and Pay</Link>
            </li>
            <li className="text-base font-medium p-5 border-b border-gray-500">
              <Link to="/transactions">All Transactions</Link>
            </li>
            <li className="text-base font-medium p-5 border-b border-gray-500">
              <Link to="/paybyQR">Pay By QR</Link>
            </li>
          </ul>
          <button
            onClick={signOut}
            className="bg-transparent m-4 hover:bg-[#002970] text-[#002970] font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          >
            Sign Out
          </button>
        </div>
      }
    </nav>
  );
};

export default Navbar;
