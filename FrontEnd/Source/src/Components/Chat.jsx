import React from "react";

const Chat = ({ date, transaction, user }) => {
  return (
    <div
      className={`block my-2 w-[150px] ${
        transaction.senderId._id == user._id && "ms-auto"
      }  md:w-[300px]   flex-wrap items-center justify-between  md:p-6 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 `}
    >
      <p className="w-[100%]  break-all  ">{transaction.message}</p>
      <div>
        <p className="md:text-xs text-xs text-gray-400">
          {date.getDate()}{" "}
          {date.toLocaleDateString("default", {
            month: "long",
          })}
          ,{" "}
          <span className="uppercase">
            {" "}
            {date.toLocaleString("default", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Chat;
