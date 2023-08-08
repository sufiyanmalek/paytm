import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import StatementTab from "./StatementTab";
const Statement = ({ statementRef, user }) => {
  const statement = useSelector((state) => state.transaction.statement);
  const startDate = new Date(
    useSelector((state) => state.transaction.dates.startDate)
  );
  const endDate = new Date(
    useSelector((state) => state.transaction.dates.endDate)
  );
  const openingBalance = useSelector(
    (state) => state.transaction.openingBalance
  );
  const closingBalance = useSelector(
    (state) => state.transaction.closingBalance
  );
  const Expenses = useSelector((state) => state.transaction.Expenses);
  const Added = useSelector((state) => state.transaction.Added);

  return (
    <div ref={statementRef} className="">
      {statement.length > 0 ? (
        <>
          <div className="bg-[#eaf9ff] flex justify-between items-center px-10 py-8">
            <div>
              <img className="w-52" src="/images/statementLogo.png" alt="" />
            </div>
            <div className="text-end">
              <p className="text-3xl font-light ">{user.name}</p>
              <p className="mt-3">+91-{user.phone}</p>
              <p className="">{user.email}</p>
            </div>
          </div>
          <div className="px-10 py-8">
            <p className="text-[#a4a4a4] py-3">
              Paytm balance Statement for{" "}
              <span className="text-black">
                {startDate.getDate()}{" "}
                {startDate.toLocaleDateString("default", { month: "long" })}{" "}
                {startDate.toLocaleDateString("default", {
                  year: "numeric",
                })}{" "}
                to {" " + endDate.getDate() - 1}{" "}
                {endDate.toLocaleDateString("default", { month: "long" })}{" "}
                {endDate.toLocaleDateString("default", {
                  year: "numeric",
                })}
              </span>
            </p>
            <div className="grid grid-cols-4 justify-center gap-5">
              <div className="border-4 border-gray-200  px-2 py-4">
                <div>
                  <p className="text-xl ">
                    Rs.
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(openingBalance)}
                  </p>
                  <span className="my-2 text-sm">Opening Balance</span>
                </div>
                <div>
                  <p className="text-[#a4a4a4]">as on</p>
                  <p className="text-[#a4a4a4]">
                    {startDate.getDate()}{" "}
                    {startDate.toLocaleDateString("default", { month: "long" })}{" "}
                  </p>
                </div>
              </div>
              <div className=" col-span-2 grid grid-cols-2 gap-5">
                <div className="border-4 border-gray-200 p-2">
                  <p className="text-lg">
                    Rs.
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(Expenses)}
                  </p>
                  <p className="text-xs text-[#a4a4a4]">Expenses/Transfer</p>
                </div>
                <div className="border-4 border-gray-200 p-2">
                  <p className="text-lg text-green-500">Rs.0.00</p>
                  <p className="text-xs text-[#a4a4a4]">Cashback</p>
                </div>
                <div className="border-4 border-gray-200 p-2">
                  <p className="text-lg">
                    Rs.
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(Added)}
                  </p>
                  <p className="text-xs text-[#a4a4a4]">Added/Recieved</p>
                </div>
                <div className="border-4 border-gray-200 p-2">
                  <p className="text-lg text-green-500">Rs.0.00</p>
                  <p className="text-xs text-[#a4a4a4]">Refund</p>
                </div>
              </div>
              <div className="border-4 border-gray-200  px-2 py-4 bg-[#00baf5] text-white">
                <div>
                  <p className="text-xl ">
                    Rs.
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(closingBalance)}
                  </p>
                  <span className="my-2 text-sm">Closing Balance</span>
                </div>
                <div>
                  <p className="text-[white]">as on</p>
                  <p className="text-[white]">
                    {endDate.getDate() - 1}{" "}
                    {endDate.toLocaleDateString("default", { month: "long" })}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="  border-2 border-[#21b1f8]"></div>
          <div className="border-2 border-[#21066e]"></div>

          <table className="overflow-y-auto w-[90%] mx-auto ">
            <thead>
              <tr className="border-b-2 border-black ">
                <td className="text-[#9a9a9a] p-3 text-start">DATE & TIME</td>
                <td className="text-[#9a9a9a] p-3 text-center">
                  TRANSACTION DETAILS
                </td>
                <td className="text-[#9a9a9a] p-3 text-center">AMOUNT</td>
                <td className="text-[#9a9a9a] p-3 text-end">CLOSING BALANCE</td>
              </tr>
            </thead>
            <tbody>
              {statement.map((e, index) => {
                return <StatementTab key={index} e={e} User={user} />;
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          {" "}
          <div className="bg-[#eaf9ff] flex justify-between items-center px-10 py-8">
            <div>
              <img className="w-52" src="/images/statementLogo.png" alt="" />
            </div>
            <div className="text-end">
              <p className="text-3xl font-light ">{user.name}</p>
              <p className="mt-3">+91-{user.phone}</p>
              <p className="">{user.email}</p>
            </div>
          </div>
          <h1 className="text-center text-xl mt-10">No Transactions</h1>
        </>
      )}
    </div>
  );
};

export default Statement;
