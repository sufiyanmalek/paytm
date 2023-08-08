import Cookies from "js-cookie";
import React from "react";
import { BsFillPlusCircleFill, BsSearch } from "react-icons/bs";

const SearchContact = ({
  searchUser,
  userList,
  addToContacts,
  payContact,
  user,
}) => {
  return (
    <div className="border-e border-black p-2 ">
      <h1 className="text-center my-2 font-semibold text-2xl">
        Search Users:{" "}
      </h1>
      <div>
        <div className="relative  rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <BsSearch />
            </span>
          </div>
          <input
            type="text"
            name="userPhone"
            id="userPhone"
            onChange={searchUser}
            className="block w-full outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0f4a8a] sm:text-sm sm:leading-6"
            placeholder="Search User By Phone Number"
          />
        </div>
        <div className=" w-[100%] md:h-[300px] h-[100px] p-2 my-2 overflow-y-scroll rounded-md ">
          {userList.length > 0 &&
            userList.map((e) => {
              if (e._id !== user._id) {
                return (
                  <div
                    className="border-b my-1 border-gray-300 p-1  flex justify-between align-items-center"
                    key={e._id}
                  >
                    <div className=" ">
                      <p className="text-normal text-[#0f4a8a] font-semibold">
                        {e.name}
                      </p>
                      <p className="text-sm text-gray-500 font-semibold">
                        {e.phone}
                      </p>
                    </div>
                    <div className="my-auto mx-3  p-1 flex">
                      <button
                        className="bg-[#0f4a8a] text-white font-semibold py-1 px-2 rounded-lg"
                        title="Send Money"
                        onClick={() => payContact(e)}
                      >
                        pay
                      </button>
                      <button
                        onClick={() => {
                          addToContacts(e);
                        }}
                        className="ms-3 my-auto"
                      >
                        <BsFillPlusCircleFill
                          title="Add to Contacts"
                          color="#0f4a8a"
                        />
                      </button>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchContact;
