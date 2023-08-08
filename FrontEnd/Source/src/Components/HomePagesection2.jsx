import React from "react";

const HomePagesection2 = () => {
  return (
    <div className=" lg:px-[13%]   md:px-[10%] px-[4%] sm:px-[10%]  py-12 bg-[#0f4a8a]">
      <div className=" text-white">
        <h1 className="text-4xl font-bold">Book & Buy on Paytm.</h1>

        <div className="  grid xl:grid-cols-7  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 py-8 md:px-2">
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16  hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img src="/images/dashboard/img8.png" className="w-16" alt="" />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">Movie</span>
                <span className="text-md font-medium p-0 m-0">
                  Tickets <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16  hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img src="/images/dashboard/img9.png" className="w-16" alt="" />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">
                  Flight
                </span>
                <span className="text-md font-medium p-0 m-0">
                  Tickets <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16  hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img
                  src="/images/dashboard/img10.png"
                  className="w-16"
                  alt=""
                />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">Bus</span>
                <span className="text-md font-medium p-0 m-0">
                  Tickets <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16  hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img
                  src="/images/dashboard/img11.png"
                  className="w-16"
                  alt=""
                />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">Train</span>
                <span className="text-md font-medium p-0 m-0">
                  Tickets <span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16 hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img
                  src="/images/dashboard/img12.png"
                  className="w-16"
                  alt=""
                />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">Buy</span>
                <span className="text-md font-medium p-0 m-0">
                  Insurance<span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16 hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img
                  src="/images/dashboard/img13.png"
                  className="w-16"
                  alt=""
                />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">
                  International
                </span>
                <span className="text-md font-medium p-0 m-0">
                  Flights<span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="inline-block    rounded-lg py-4 ps-2 pe-16  hover:cursor-pointer ">
              <div className="inline-block bg-white  rounded-full">
                <img
                  src="/images/dashboard/img14.webp"
                  className="w-16"
                  alt=""
                />
              </div>
              <div className="ms-2">
                <span className="text-md block font-medium p-0 m-0">
                  Invest in
                </span>
                <span className="text-md font-medium p-0 m-0">
                  Stocks<span className="text-xl my-auto">{">"}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePagesection2;
