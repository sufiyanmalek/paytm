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
      <div className="lg:w-[70%] p-5 md:w-[85%] mx-auto left-0 right-0 bg-white border border-black py-2   absolute top-44 rounded-2xl overflow-hidden ">
        <p className="p-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="p-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="p-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="p-2">
          <strong>Address:</strong> {user.address}
        </p>
        <p className="p-2 font-semibold text-xl">Your QR Code: </p>

        <div className="my-3 p-2 ">
          <div
            ref={QRref}
            className="border border-black w-fit p-5 flex justify-center rounded-lg bg relative"
          >
            <QRCode value={JSON.stringify({ phone: user.phone.toString() })} />
          </div>
        </div>
        <div className="p-2">
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
