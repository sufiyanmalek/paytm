import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";
import TransactionTab from "../Components/TransactionTab";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Audio, InfinitySpin } from "react-loader-spinner";
import socket from "../socket";

import {
  fetchStatement,
  fetchTransactions,
  pageZero,
} from "../store/transactions/transactionSlice";
import Statement from "../Components/Statement";
import Footer from "../Components/Footer";
import VisibilitySensor from "react-visibility-sensor";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const TransactionPage = ({ user }) => {
  const statementRef = useRef();
  const [params] = useSearchParams();
  const statement = useSelector((state) => state.transaction.statement);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState(
    params.get("startDate") ||
      new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    params.get("endDate") || new Date().toISOString().slice(0, 10)
  );

  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  const dataFetching = useSelector((state) => state.transaction.dataFetching);
  const navigate = useNavigate();
  const pageNo = useSelector((state) => state.transaction.pageNo);

  //get wallet
  const getWallet = async () => {
    const params = { user, pageNo, startDate, endDate };
    dispatch(fetchTransactions(params));
  };

  useEffect(() => {
    getWallet();
  }, []);

  const print = useReactToPrint({
    content: () => statementRef.current,
    documentTitle: "PayTM Statement",
  });

  // Get Statement Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (startDate > endDate) {
      setError(true);
    } else {
      const invoiceData = {
        startDate,
        endDate,
      };
      console.log(invoiceData);
      const query = `startDate=${startDate}&endDate=${endDate}`;
      navigate(`?${query}`);
      const params = { user, pageNo, startDate, endDate };
      dispatch(fetchTransactions(params));
    }
  };

  // Visiblity Sensor on Change
  const onChange = (isVisible) => {
    if (isVisible) {
      const params = { user, pageNo, startDate, endDate };
      dispatch(fetchTransactions(params));
    }
  };

  const handlePrint = async () => {
    console.log(startDate, endDate);
    const params = { user, startDate, endDate, print };
    await dispatch(fetchStatement(params));
    print();
  };

  return (
    <div>
      <Navbar user={user} />

      <div className="bg-[#00174d] h-60  text-white mt-24">
        <div className="  border-2 border-[#21b1f8]"></div>

        <p className="text-center py-8 text-xs">
          Home {"  >   "}
          <span className="font-bold">Transactions</span>
        </p>
      </div>
      <div className="lg:w-[70%] md:w-[85%] h-[70%] mx-auto left-0 right-0 bg-white border border-black py-2   absolute top-44 rounded-2xl overflow-hidden ">
        <form className=" px-5 py-2 w-[80%] mx-auto" onSubmit={handleSubmit}>
          <p className="font-medium text-slate-900">
            Select Start And End date to generate Invoice : <br />
          </p>
          <span className="text-slate-800 font-medium ">StartDate : </span>
          <input
            type="date"
            className="border my-2  border-black px-2 py-[2px] mt-5 rounded-[5px]"
            name="startDate"
            onChange={(e) => {
              setStartDate(e.target.value);
              dispatch(pageZero());
            }}
            value={startDate}
            required
          />{" "}
          <br />
          <span className="text-slate-800 font-medium ">EndDate : </span>
          <input
            type="date"
            className="border ml-2 mb-2 border-black px-2 py-[2px] rounded-[5px]"
            name="endDate"
            onChange={(e) => {
              setEndDate(e.target.value);
              dispatch(pageZero());
            }}
            value={endDate}
            required
          />{" "}
          <br />
          {error && (
            <>
              <span className="text-red-500">
                EndDate should be greater than StartDate
              </span>
              <br />
            </>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#00174d] text-white py-1 px-2 my-2 font-semibold rounded-md"
            >
              Get Statement
            </button>
            <button
              type="button"
              className="bg-[#00174d] text-white py-1 px-2 my-2 font-semibold rounded-md"
              onClick={handlePrint}
            >
              print
            </button>
          </div>
        </form>
        <div className="  border-2 border-[#21b1f8]"></div>
        <div className="border-2 border-[#21066e]"></div>
        <div className="h-[68%] overflow-y-scroll">
          {
            <table className=" w-[90%] mx-auto ">
              <thead>
                <tr className="border-b-2 border-black  ">
                  <td className="text-[#9a9a9a] p-3 text-start">DATE & TIME</td>
                  <td className="text-[#9a9a9a] p-3 text-center">
                    TRANSACTION DETAILS
                  </td>
                  <td className="text-[#9a9a9a] p-3 text-center">AMOUNT</td>
                  <td className="text-[#9a9a9a] p-3 text-end md:block hidden">
                    CLOSING BALANCE
                  </td>
                </tr>
              </thead>
              <tbody>
                {dataFetching && transactions.length == 0 && (
                  <tr className="">
                    <td colSpan={4} className="">
                      <div className=" w-52 mx-auto ">
                        <InfinitySpin
                          className="mx-auto"
                          width="200"
                          color="#21b1f8"
                        />
                      </div>
                    </td>
                  </tr>
                )}
                {transactions &&
                  transactions.map((e, index) => {
                    return <TransactionTab key={index} e={e} User={user} />;
                  })}

                {dataFetching && (
                  <tr>
                    {transactions.length > 7 && (
                      <VisibilitySensor onChange={onChange}>
                        <td colSpan={4}>
                          <div className=" w-52 mx-auto ">
                            <InfinitySpin
                              className="mx-auto"
                              width="200"
                              color="#21b1f8"
                            />
                          </div>
                        </td>
                      </VisibilitySensor>
                    )}
                  </tr>
                )}
                {!dataFetching && (
                  <tr className="">
                    <td colSpan={4}>
                      <div className=" w-52 mx-auto p-2">
                        No more Transactions
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
      <div className=" border-2 border-[#21b1f8]"></div>

      <div className="hidden ">
        <Statement user={user} statementRef={statementRef}></Statement>
      </div>
      <div className="md:mt-[62vh] mt-[60vh]">
        <Footer />
      </div>
    </div>
  );
};

export default TransactionPage;
