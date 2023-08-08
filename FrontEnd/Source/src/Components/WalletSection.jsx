import React from "react";

const WalletSection = ({ addMoney, handleChange, wallet, addMoneyDetails }) => {
  return (
    <div className="md:w-[80%] lg:w-[70%] w-[95%] mx-auto left-0 right-0 bg-white border border-[#f0f6f7] py-2 z-0  absolute top-44 rounded-2xl ">
      <div className=" flex justify-between md:px-10 px-5 items-center">
        <div className="border-b-2 border-[#00baf2]  flex items-center  py-6">
          <img className=" w-14" src="/images/wallet-newIcon.svg" alt="" />
          <div className="   text-[#333333] ">
            <div className="">
              <p className="px-2 text-[0.7rem] leading-3 font-semibold tracking-wider">
                PAYTM WALLET
              </p>
              <p className="px-2 text-sm font-semibold tracking-wide">
                ₹ {wallet?.balance}
              </p>
            </div>
          </div>
        </div>
        <div className=" text-[#333333]">
          <div className="border-s ps-10 border-gray-400">
            <p className="px-2 text-[0.7rem] leading-3 font-semibold tracking-wider">
              TOTAL BALANCE
            </p>
            <p className="px-2 text-2xl font-semibold tracking-wide">
              ₹ {wallet?.balance}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-8">
        <p className="text-xs text-[#413a42]  md:px-14 px-5  tracking-widest font-semibold">
          ADD MONEY TO PAYTM WALLET
        </p>
      </div>
      <div className="p-8 rounded-xl  bg-[rgba(250,251,251,255)]">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-2 gap-2 rounded-md ">
          <div className="relative ">
            <div className="absolute left-3 top-[0.6rem] ">₹</div>
            <input
              type="number"
              name="amount"
              id="amount"
              value={addMoneyDetails?.amount || ""}
              onChange={handleChange}
              autoComplete="new-password"
              className="inline-block w-[100%]  focus:outline-none  rounded-md border-0 ing-1 py-[0.6rem] pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00baf2] sm:text-sm sm:leading-6"
              placeholder="Enter Amount"
            />
          </div>
          <div className="">
            <input
              type="password"
              name="pin"
              value={addMoneyDetails?.pin || ""}
              onChange={handleChange}
              autoComplete="new-password"
              className="inline-block w-[100%]  focus:outline-none  rounded-md border-0 ing-1 py-[0.6rem] pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00baf2] sm:text-sm sm:leading-6"
              placeholder="UPI Pin"
            />
          </div>
          <div className="">
            <button
              onClick={addMoney}
              className="inline-block bg-[#00baf2] p-2 w-[100%]  text-white font-semibold  rounded-sm"
            >
              {" "}
              Add Money
            </button>
          </div>
        </div>
        <div className="p-8 ms-8"></div>
      </div>
    </div>
  );
};

export default WalletSection;
