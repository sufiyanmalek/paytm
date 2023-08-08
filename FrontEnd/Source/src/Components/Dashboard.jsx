import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  return (
    <div className=" lg:px-[13%]   md:px-[10%] px-[4%] sm:px-[10%] py-12 bg-[#00baf2] w-[100%]">
      <div className=" text-white">
        <h1 className="text-4xl font-bold">Hi, {user.name} Welcome!</h1>
        <div className="  grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 py-8 md:px-2">
          <Link to={"/wallet"} className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16 hover:bg-[#00afe3] hover:cursor-pointer ">
              <div className="inline-block bg-white p-3 rounded-full">
                <img
                  src="/images/addMoneyToWallet.png"
                  className="w-11"
                  alt=""
                />
              </div>
              <div className="ms-2">
                <p className="text-xl ">Wallet</p>
                <span className="text-md block font-medium p-0 m-0">
                  Wallet
                </span>

                <span className="text-md font-medium p-0 m-0">
                  Details <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/contacts"} className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-14 hover:bg-[#00afe3] hover:cursor-pointer">
              <div className="inline-block bg-white p-3 rounded-full">
                <img src="/images/dashboard/img2.png" className="w-11" alt="" />
              </div>
              <div className="ms-2">
                <p className="text-xl ">Contacts</p>
                <span className="text-md block font-medium p-0 m-0">
                  Contacts
                </span>

                <span className="text-md font-medium p-0 m-0">
                  Details <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/contacts"} className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-14 hover:bg-[#00afe3] hover:cursor-pointer">
              <div className="inline-block bg-white p-3 rounded-full">
                <img src="/images/dashboard/img3.png" className="w-11" alt="" />
              </div>
              <div className="ms-2">
                <p className="text-xl ">Payment</p>
                <span className="text-md block font-medium p-0 m-0">Send</span>

                <span className="text-md font-medium p-0 m-0">
                  Money <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </Link>
          <Link to={"/transactions"} className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-14 hover:bg-[#00afe3] hover:cursor-pointer">
              <div className="inline-block bg-white p-3 rounded-full">
                <img src="/images/dashboard/img4.png" className="w-11" alt="" />
              </div>
              <div className="ms-2">
                <p className="text-xl ">PassBook</p>
                <span className="text-md block font-medium p-0 m-0">
                  Transaction
                </span>

                <span className="text-md font-medium p-0 m-0">
                  History <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </Link>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-14 hover:bg-[#00afe3] hover:cursor-pointer">
              <div className="inline-block bg-white p-3 rounded-full">
                <img src="/images/dashboard/img5.png" className="w-11" alt="" />
              </div>
              <div className="ms-2">
                <p className="text-xl ">Pay</p>
                <span className="text-md block font-medium p-0 m-0">
                  Broadband
                </span>

                <span className="text-md font-medium p-0 m-0">
                  & Bills <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-14 hover:bg-[#00afe3] hover:cursor-pointer">
              <div className="inline-block bg-white p-3 rounded-full">
                <img src="/images/dashboard/img6.png" className="w-11" alt="" />
              </div>
              <div className="ms-2">
                <p className="text-xl ">Recharge</p>
                <span className="text-md block font-medium p-0 m-0">
                  Prepaid
                </span>

                <span className="text-md font-medium p-0 m-0">
                  Mobile <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-14 hover:bg-[#00afe3] hover:cursor-pointer">
              <div className="inline-block bg-white p-3 rounded-full">
                <img src="/images/dashboard/img7.png" className="w-11" alt="" />
              </div>
              <div className="ms-2">
                <p className="text-xl ">All</p>
                <span className="text-md block font-medium p-0 m-0">
                  Payement
                </span>

                <span className="text-md font-medium p-0 m-0">
                  Services<span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
