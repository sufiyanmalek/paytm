import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const Accordian = ({ heading, content }) => {
  const [show, setShow] = useState(false);

  //Hello

  return (
    <div className="w-full py-5">
      <div
        onClick={() => setShow(!show)}
        className="flex gap-2 items-center cursor-pointer"
      >
        {show ? (
          <AiOutlineClose className="text-slate-700 font-bold" size={22} />
        ) : (
          <AiOutlinePlus className="text-slate-700 font-bold" size={22} />
        )}

        <p className="text-sm font-semibold text-slate-700">{heading}</p>

        <div className="border flex-1 border-gray-200"></div>
      </div>

      <div
        className={`text-sm font-semibold text-[#5b5b63] ${
          show ? `xl:h-[fit] h-fit p-5 px-10` : `xl:h-0 h-0 px-10`
        } transition-all ease-in-out duration-500  overflow-hidden xl:grid xl:grid-cols-6 gap-5 block justify-between`}
      >
        {content.map((e, index) => {
          return (
            <p
              key={index}
              className={`xl:p-0 py-3 text-gray-700 hover:text-black hover:font-normal cursor-pointer font-light ${
                content.length === 1 ? "col-span-6" : "col-span-1"
              }`}
            >
              {e}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Accordian;
