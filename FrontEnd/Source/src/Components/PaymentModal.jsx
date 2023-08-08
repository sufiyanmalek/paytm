import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { sendMoneyApi } from "../api/SendMoney/payments.Api";
import { getWalletApi } from "../api/Wallet/wallet.Api";

const PaymentModal = ({ setPayBool, reciever, seeTransactions, user }) => {
  const [wallet, setWallet] = useState(); // wallet details

  const [paymentDetails, setPaymentDetails] = useState(); // Payment Details

  const [error, setError] = useState();

  // handle change payment detail
  const handleChange = (e) => {
    setError();
    setPaymentDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //gets current users wallet details
  useEffect(() => {
    getWallet();
  }, []);

  //get wallet
  const getWallet = async () => {
    const wallet = await getWalletApi(user); // Get Wallet Api
    console.log(wallet);
    setWallet(wallet.data);
  };

  // send money
  const sendMoney = (e) => {
    e.preventDefault();

    if (paymentDetails?.amount?.length > 0) {
      sendMoneyApi(
        reciever,
        paymentDetails,
        user,
        seeTransactions,
        setPaymentDetails,
        setPayBool
      );
    } else {
      setError("Enter Amount First");
    }
    // Send Money Api
    //  sendMoneyApi(
    //    reciever,
    //    paymentDetails,
    //    user,
    //    token,
    //    seeTransactions,
    //    setPaymentDetails,
    //    setPayBool
    //  );
  };
  return (
    <div className="h-[100vh] w-[100vw]  absolute top-0 bg-[#000000ab] ">
      <div
        onClick={() => setPayBool(false)}
        className="h-[100vh] w-[100vw] cursor-pointer  absolute top-0  "
      ></div>
      <div className="border rounded-md absolute left-0 right-0 lg:w-[30%] md:w-[50%] sm:w-[60%] w-[90%] mx-auto my-72 bg-white">
        <button
          onClick={() => setPayBool(false)}
          className="absolute right-0 top-0 p-2"
        >
          <ImCross />
        </button>
        <h1 className="text-center text-xl font-semibold mt-5">Send Money</h1>
        {wallet && (
          <h1 className="text-center text-lg font-normal mt-5">
            Your Balance : <span className="text-base">₹{wallet.balance}</span>
          </h1>
        )}
        <div className="text-center">
          <form className="relative mt-2 rounded-md " onSubmit={sendMoney}>
            <div className="inline-block">
              <input
                type="number"
                name="amount"
                id="amount"
                autoComplete="new-password"
                onChange={handleChange}
                value={paymentDetails?.amount || ""}
                className="my-2 block focus:outline-none rounded-md border-0 py-[0.6rem] pl-7 md:pr-20 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00baf2] sm:text-sm sm:leading-6"
                placeholder="Enter Amount"
              />
            </div>
            <br />
            <input
              type="password"
              name="pin"
              autoComplete="new-password"
              onChange={handleChange}
              required
              value={paymentDetails?.pin || ""}
              className="my-2 inline-block focus:outline-none  rounded-md border-0 ing-1 py-[0.6rem] pl-7 md:pr-20 pr-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00baf2] sm:text-sm sm:leading-6"
              placeholder="UPI Pin"
            />
            <br />
            {error && <span className="text-sm text-red-500">{error}</span>}

            <br />

            <button className="my-2 inline-block bg-[#00baf2] p-2  text-white font-semibold px-24 rounded-md hover:bg-[#0f4a8a] ">
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
