import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const KycModal = ({ setKycPrompt }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] bg-black bg-opacity-30 fixed -top-[0px] z-50 left-0 flex items-center justify-center">
      <div
        className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolut inset-0 z-0"></div>
        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="">
            <div className="text-center p-5 flex-auto justify-center">
              <AiFillWarning className="m-auto text-red-500" size={40} />
              <h2 className="text-xl font-bold py-4 ">
                KYC Verification Pending
              </h2>
              <p className="text-sm text-gray-500 px-8">
                Go to KYC Verifcation?
              </p>
            </div>
            <div className="p-3  mt-2 text-center space-x-4 md:block">
              <button
                onClick={() => setKycPrompt(false)}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/wallet")}
                className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
