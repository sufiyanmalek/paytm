import axios from "axios";
import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";

const VerifyKyc = ({ user, getWallet, setIsKycVerified }) => {
  const [aadharFront, setAadharFront] = useState();
  const [aadharBack, setAadharBack] = useState("");
  const [email, setEmail] = useState("");
  const url = import.meta.env.VITE_API_URL;

  const verifyAadhar = (e) => {
    e.preventDefault();
    const id = toast.loading("Please Wait...", { position: "top-center" });
    const data = new FormData();
    data.append("email", user.email);
    data.append("aadharFront", aadharFront);
    data.append("aadharBack", aadharBack);

    var config = {
      method: "post",
      url: `${url}/kyc`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        toast.update(id, {
          render: response.data,
          type: "success",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
          position: "top-center",
        });
        getWallet();
        setIsKycVerified(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="md:w-[80%] lg:w-[70%] w-[95%] mx-auto left-0 right-0 bg-white border border-[#f0f6f7] py-2 z-0  absolute top-44 rounded-2xl ">
      <div className="">
        <h1 className="text-center text-xl font-bold text-red-500 my-2">
          KYC Verication is Pending!
        </h1>
        <div className=" p-5 border border-gray-300 w-[80%] md:w-[70%] lg:w-[60%] mx-auto rounded-md my-2">
          <form className="gap-2" onSubmit={verifyAadhar}>
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                disabled
                className="border border-gray-300 w-full  py-1 px-2 rounded-md "
              />
            </div>
            <div className="my-3">
              <p className="font-medium mb-2">Aadhar Card Front</p>
              {!aadharFront && (
                <label
                  htmlFor="aadharFront"
                  className="block cursor-pointer font-medium "
                >
                  <div className="border-dashed rounded-md   border-2 border-gray-300  p-1">
                    <BiCloudUpload
                      size={50}
                      color="#21b1f8"
                      className="mx-auto"
                    />
                    <p className="text-center text-slate-700 hidden md:block">
                      Drag & Drop or{" "}
                      <span className="text-blue-800">Choose file</span> to
                      upload
                    </p>
                    <p className="text-center text-sm my-1 text-gray-500">
                      JPEG or PNG or WEBP
                    </p>
                  </div>

                  <input
                    type="file"
                    name="aadharFront"
                    id="aadharFront"
                    onChange={(e) => {
                      setAadharFront(e.target.files[0]);
                    }}
                    accept="image/*"
                    className="border border-black py-1 px-2 hidden rounded-md "
                  />
                </label>
              )}
            </div>
            {aadharFront && (
              <div className=" relative p-1">
                <img
                  src={URL.createObjectURL(aadharFront)}
                  className="w-36 border border-black rounded-md "
                />
                <RxCrossCircled
                  style={{ backgroundColor: "gray ", borderRadius: "100%" }}
                  className="absolute top-0 left-[8.5rem]"
                  size={20}
                  onClick={() => setAadharFront()}
                />
              </div>
            )}
            <div className="my-3">
              <p className="font-medium mb-2">Aadhar Card Front</p>
              {!aadharBack && (
                <label
                  htmlFor="aadharBack"
                  className="block cursor-pointer font-medium "
                >
                  <div className="border-dashed rounded-md   border-2 border-gray-300  p-1">
                    <BiCloudUpload
                      size={50}
                      color="#21b1f8"
                      className="mx-auto"
                    />
                    <p className="text-center text-slate-700 hidden md:block">
                      Drag & Drop or{" "}
                      <span className="text-blue-800">Choose file</span> to
                      upload
                    </p>
                    <p className="text-center text-sm my-1 text-gray-500">
                      JPEG or PNG or WEBP
                    </p>
                  </div>

                  <input
                    type="file"
                    name="aadharBack"
                    id="aadharBack"
                    onChange={(e) => {
                      setAadharBack(e.target.files[0]);
                    }}
                    accept="image/png image/jpeg image/jpg"
                    className="border border-black py-1 px-2 hidden rounded-md "
                  />
                </label>
              )}
            </div>
            {aadharBack && (
              <div className=" relative p-1">
                <img
                  src={URL.createObjectURL(aadharBack)}
                  className="w-36 border border-black rounded-md "
                />
                <RxCrossCircled
                  style={{ backgroundColor: "gray ", borderRadius: "100%" }}
                  className="absolute top-0 left-[8.5rem]"
                  size={20}
                  onClick={() => setAadharBack()}
                />
              </div>
            )}
            <div className="my-3 text-end">
              <button className=" bg-blue-800 px-2 py-1 text-white rounded-md hover:bg-blue-600 ">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyKyc;
