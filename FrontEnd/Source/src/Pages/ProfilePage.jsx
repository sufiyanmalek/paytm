import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import QRCode from "react-qr-code";
import { exportComponentAsJPEG } from "react-component-export-image";

const ProfilePage = ({ user }) => {
  const QRref = useRef();
  console.log(user, "asd");
  return (
    <div>
      <Navbar user={user} />
      <div className="bg-[#00174d] h-60  text-white mt-24">
        <div className="  border-2 border-[#21b1f8]"></div>

        <p className="text-center py-8 text-xs">
          Home {"  >   "}
          <span className="font-bold">Profile</span>
        </p>
      </div>
      <div className="lg:w-[50%] w-[90%]  md:p-5  md:w-[50%] mx-auto left-0 right-0 bg-white border border-black py-2   absolute top-44 rounded-2xl overflow-hidden ">
        <div className="">
          <img
            src={user.profilePic}
            className="w-40 rounded-full mx-auto aspect-square border-4  border-black"
            alt=""
          />
        </div>
        <div className=" md:w-[50%] w-[75%] mx-auto">
          <p className=" text-center text-3xl font-medium">{user.name}</p>
          <p className=" text-center m-0">{user.phone}</p>
          <p className=" text-center">{user.email}</p>
          <p className=" text-center">{user.address}</p>
        </div>

        <div className="my-3 p-2 text-center ">
          <p className="p-2 font-semibold text-xl">Your QR Code: </p>

          <div
            ref={QRref}
            className="border border-black w-fit p-3 flex justify-center mx-auto rounded-lg bg relative"
          >
            <QRCode value={JSON.stringify({ phone: user.phone.toString() })} />
          </div>
        </div>
        <div className="p-2 text-center">
          <button
            className="my-3 py-1 px-2 bg-[#00174d] text-white rounded-md font-semibold hover:bg-[#1158fd]"
            onClick={() => exportComponentAsJPEG(QRref)}
          >
            Download QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
