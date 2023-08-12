import React from "react";

const TransactionCard = ({ date, transaction, user }) => {
  return (
    <div
      className={`block my-2 w-[150px] ${
        transaction.sender._id == user._id
          ? "ms-auto rounded-l-3xl rounded-br-3xl bg-gray-200"
          : "rounded-r-3xl rounded-bl-3xl bg-[#d2f0ff]"
      }  md:w-[300px]  p-6    `}
    >
      <h5 className=" text-xl font-bold tracking-tight text-gray-900 ">
        ₹{transaction.amount}
      </h5>
      <p className="font-normal md:text-base text-sm text-gray-500 ">
        {transaction.sender._id == user._id ? "Sent" : "Recieved"}
      </p>
      <p className="md:text-base text-xs">
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
  );
};

export default TransactionCard;
