import React from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import { useSelector } from "react-redux";

const MyContacts = ({ removeContact, payContact, user }) => {
  const contactList = useSelector((state) => state.contacts.contactList);

  return (
    <div className="p-2">
      <h1 className="text-center my-2 font-semibold text-2xl">Contacts:</h1>

      <div className=" w-[100%] h-[300px] mt-[3.3rem] p-2 my-2 overflow-y-scroll rounded-md ">
        {contactList.contacts && contactList.contacts.length > 0 ? (
          contactList.contacts.map((e) => {
            if (e.userId !== user._id) {
              return (
                <div
                  className="border-b py-2  border-gray-300 p-1 flex justify-between align-items-center hover:bg-gray-200 cursor-pointer"
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
                      title="Remove Contact"
                      className="ms-3"
                      onClick={() => removeContact(e)}
                    >
                      <IoMdRemoveCircle color="#0f4a8a" size={20} />
                    </button>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <h1 className="text-center text-lg font-bold text-[#0f4a8a]">
            No Contacts Search and add some!
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyContacts;
