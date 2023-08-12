import React from "react";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const Chat = ({ date, transaction, user }) => {
  // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");
  return (
    <div
      className={`block my-2 w-[150px] ${
        transaction.senderId._id == user._id
          ? "ms-auto rounded-l-3xl rounded-br-3xl bg-gray-200"
          : "rounded-r-3xl rounded-bl-3xl bg-[#d2f0ff]"
      }  md:w-[300px]   flex-wrap items-center justify-between  md:p-3 p-3    `}
    >
      <p className="w-[100%]  break-all p-0 m-0">{transaction.message}</p>
      <div className="text-gray-400 text-sm text-end p-0 m-0">
        <p className={`inline-block  `}>{timeAgo.format(date)}</p>
        {/* <p className="md:text-xs text-xs text-gray-400">
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
        </p> */}
      </div>
    </div>
  );
};

export default Chat;
