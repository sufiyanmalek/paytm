import React, { useState } from "react";
import axios from "axios";
import { BsFillPlusCircleFill, BsSearch } from "react-icons/bs";
import { ColorRing } from "react-loader-spinner";

const SearchContact = ({ addToContacts, payContact, user }) => {
  const [searchData, setSearchData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const searchUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const searchText = e.target.elements.userPhone.value;
    // console.log(searchText);

    var config = {
      method: "get",
      url: `http://192.168.102.104:3000/search?phone=${searchText}`,
    };
    try {
      const response = await axios(config);
      setSearchData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-e border-black p-2 ">
      <h1 className="text-center my-2 font-semibold text-2xl">
        Search Users:{" "}
      </h1>
      <div>
        <div className="relative  rounded-md shadow-sm">
          <form onSubmit={searchUser} onChange={() => setSearchData([])}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <BsSearch />
              </span>
            </div>
            <input
              type="text"
              name="userPhone"
              id="userPhone"
              className="block w-full outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0f4a8a] sm:text-sm sm:leading-6"
              placeholder="Search User By Phone Number"
            />
            <button className="hidden" type="submit"></button>
          </form>
        </div>
        <div className=" w-[100%] md:h-[300px] h-[100px] p-2 my-2 overflow-y-scroll rounded-md ">
          {isloading ? (
            <div className="m-auto w-max">
              <ColorRing
                visible={true}
                height="80"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#00174d"]}
              />
            </div>
          ) : (
            searchData.map((e) => {
              if (e._id !== user._id) {
                return (
                  <div
                    className="border-b my-1 border-gray-300 p-2  flex justify-between align-items-center"
                    key={e._id}
                  >
                    <div className="flex items-center">
                      <div className="border-4 mx-2 border-[#0f4a8a] overflow-hidden rounded-full">
                        <img
                          src={e.profilePic}
                          className="    object-cover  aspect-square w-14 "
                          alt=""
                        />
                      </div>
                      <div className="me-2">
                        <p className="text-normal text-[#0f4a8a] font-semibold">
                          {e.name}
                        </p>
                        <p className="text-sm text-gray-500 font-semibold">
                          {e.phone}
                        </p>
                      </div>
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
                          setSearchData([]);
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContact;
