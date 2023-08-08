import React from "react";

const KYCsection = () => {
  return (
    <div className="text-center py-2 bg-gray-100 mt-24">
      <p className="text-xs md:text-sm  font-medium pb-1 px-2">
        No Wallet KYC Required{" "}
        <span className="text-xl" role="img">
          {" "}
          😊
        </span>{" "}
        to pay using UPI on Paytm.{"  "}
        <span className="font-lg font-bold">
          <a href="#">Learn more.</a>
        </span>
      </p>
    </div>
  );
};

export default KYCsection;
