import React from "react";

const LandingPageSection = () => {
  return (
    <div className=" py-36 h-[auto]">
      <div className="grid md:grid-cols-2 ">
        <div className=" text-center">
          <div className=" sm:px-10 md:ms-16 md:me-0 lg:ms-36  2xl:ms-64 xl:me-10 2xl:me-16">
            <img src="/images/square-logo.png" className="w-28" alt="" />
            <div className="ms-3 ">
              <h1 className="text-start sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-medium my-7">
                India's Most-loved Payments App
              </h1>
              <p className=" text-start sm:text-lg lg:text-xl xl:text-2xl">
                Recharge & pay bills, book flights & movie tickets, open a
                savings account, invest in stocks & mutual funds, and do a lot
                more.
              </p>
              <div className="mt-7 hover:cursor-pointer w-fit rounded-3xl">
                <img
                  src="/images/Framedownload.png"
                  className=" hover:shadow-md hover:shadow-gray-500 rounded-3xl "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" text-center">
          <img
            src="/images/dashboard/landingPageImg.webp"
            className="w-[60%] float-right "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection;
