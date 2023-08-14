import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";
import WalletSection from "../Components/WalletSection";
import { addMoneyToWalletApi, getWalletApi } from "../api/Wallet/wallet.Api";
import Footer from "../Components/Footer";
import socket from "../socket";
import VerifyKyc from "../Components/VerifyKyc";

const WalletPage = ({ user }) => {
  const [wallet, setWallet] = useState(); // wallet details
  const [addMoneyDetails, setAddMoneyDetails] = useState({}); //add money details
  const [isKycVerified, setIsKycVerified] = useState(user.isKycVerified);

  //gets current users wallet details
  useEffect(() => {
    socket.on("update_wallet", (data) => {
      if (user.isKycVerified) {
        getWallet();
      }
    });
    if (user.isKycVerified) {
      getWallet();
    }
  }, [socket]);

  //get wallet
  const getWallet = async () => {
    const wallet = await getWalletApi(user); // Get Wallet Api
    setWallet(wallet.data);
  };

  // add money state changer
  const handleChange = (e) => {
    setAddMoneyDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add Money To Wallet function
  const addMoney = async () => {
    const response = await addMoneyToWalletApi(addMoneyDetails, user); // Add Money Api
    if (response.status == 200) {
      setWallet(response.data.updatedWallet);
      setAddMoneyDetails();
    }
  };
  return (
    <div>
      <Navbar user={user} />
      <div className="bg-[#00174d] h-60  text-white mt-24">
        <div className="  border-2 border-[#21b1f8]"></div>

        <p className="text-center py-8 text-xs">
          Home {"  >   "}
          <span className="font-bold">Wallet</span>
        </p>
      </div>
      {isKycVerified && (
        <WalletSection
          addMoney={addMoney}
          handleChange={handleChange}
          wallet={wallet}
          addMoneyDetails={addMoneyDetails}
        />
      )}
      {!isKycVerified && (
        <VerifyKyc
          getWallet={getWallet}
          setIsKycVerified={setIsKycVerified}
          user={user}
        />
      )}
      <div className="border-2 border-[#21b1f8]"></div>
      <div className="md:mt-[40vh] mt-[50vh]">
        <Footer />
      </div>
    </div>
  );
};

export default WalletPage;
