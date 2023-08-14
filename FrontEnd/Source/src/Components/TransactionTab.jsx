import React from "react";

const TransactionTab = ({ e, User }) => {
  const date = new Date(e?.timestamp);

  return (
    <tr className="border-b border-gray-400">
      <td className="text-start  p-3">
        <p className="md:text-lg text-sm font-normal">
          {date.getDate()}{" "}
          {date.toLocaleDateString("default", {
            month: "short",
          })}{" "}
          {date.toLocaleDateString("default", {
            year: "2-digit",
          })}
        </p>
        <p className="uppercase text-[#a4a4a4] md:text-sm text-xs">
          {date.toLocaleString("default", {
            hour: "2-digit",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </td>
      <td className="text-center  p-3 ">
        <p
          className={`font-normal text-sm md:text-base ${
            e.status == "Credited" || e.status == "Added"
              ? "text-green-600"
              : "Black"
          } `}
        >
          {e.sender.name == User.name && e.receiver.name != User.name
            ? `Paid to ${e.receiver.name}`
            : e.receiver.name == User.name && e.sender.name != User.name
            ? `Recieved from ${e.sender.name}`
            : `Money Added to  Wallet`}
        </p>
        <p className="md:text-sm text-xs  text-[#9a9a9a]">
          Transaction ID - {e.transactionID}
        </p>
      </td>
      <td className="text-center md:text-base text-sm  p-3">
        <p
          className={` ${
            e.status == "Credited" || e.status == "Added"
              ? "text-green-600"
              : "Black"
          } `}
        >
          Rs.{e.amount.toFixed(2)}
        </p>
      </td>
      <td className="text-end   p-3 text-[#a4a4a4] md:flex justify-end items-center hidden  h-max py-6">
        <p className="my-auto ">
          {e.receiver._id == User._id
            ? `Rs.${e.receiverCB.toFixed(2)}`
            : `Rs.${e.senderCB.toFixed(2)}`}
        </p>
      </td>
    </tr>
  );
};

export default TransactionTab;
