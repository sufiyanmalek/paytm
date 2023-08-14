import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import PaymentModal from "../Components/PaymentModal";
const url = import.meta.env.VITE_API_URL;
import { AiOutlineArrowUp } from "react-icons/ai";
import { toast } from "react-toastify";
import { KycModal } from "../Components/KycModal";

const PayByQr = ({ user }) => {
  // Show hide payment modal
  const [payBool, setPayBool] = useState(false);
  // set receiver while paying
  const [reciever, setReciever] = useState();

  // show hide KYC Modal
  const [kycPrompt, setKycPrompt] = useState(false);

  const seeTransactions = [];
  const handleChange = (e) => {
    const id = toast.loading("Please Wait...", { position: "top-center" });
    const data = new FormData();
    data.append("qr", e.target.files[0]);

    var config = {
      method: "post",
      url: `${url}/qr`,

      data: data,
    };

    axios(config)
      .then(function (response) {
        setReciever(response.data);
        if (user.isKycVerified) {
          setPayBool(true);
        } else {
          setKycPrompt(true);
        }
        toast.update(id, {
          render: "Valid QR!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
          position: "top-center",
        });
      })
      .catch(function (error) {
        toast.update(id, {
          render: error.response.data,
          type: "error",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
          position: "top-center",
        });
        // console.log(error);
      });
    e.target.value = null;
  };
  return (
    <div>
      <Navbar user={user} />
      <div className="bg-[#00174d] h-60  text-white mt-24">
        <div className="  border-2 border-[#21b1f8]"></div>

        <p className="text-center py-8 text-xs">
          Home {"  >   "}
          <span className="font-bold">Pay By QR</span>
        </p>
      </div>
      <div className="lg:w-[70%] p-4 md:w-[85%] mx-auto left-0 right-0 bg-white border border-black py-2   absolute top-44 rounded-2xl overflow-hidden ">
        <h1 className="text-center text-xl font-semibold">
          Upload QR Code to pay{" "}
        </h1>
        <form action="#" className="text-center  my-3 p-2">
          <label
            htmlFor="qr"
            className="border-dashed cursor-pointer block w-[60%] mx-auto border-2  p-3"
          >
            <div>
              <img
                src="/images/qr-code-scan-svgrepo-com.svg"
                className="w-24 mx-auto"
                alt=""
                srcSet=""
              />
              <p>
                Upload <AiOutlineArrowUp className="inline-block" />
              </p>
            </div>
            <input
              type="file"
              hidden
              name="qr"
              id="qr"
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
      {payBool && (
        <PaymentModal
          user={user}
          setPayBool={setPayBool}
          seeTransactions={seeTransactions}
          reciever={reciever}
        />
      )}
      {kycPrompt && <KycModal setKycPrompt={setKycPrompt} />}
    </div>
  );
};

export default PayByQr;
