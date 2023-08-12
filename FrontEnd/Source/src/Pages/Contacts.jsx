import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getContactsApi } from "../api/Contacts/contacts.Api";
import Cookies from "js-cookie";
import { getP2pTransactions } from "../api/Transactions/transaction.Api";
import PaymentModal from "../Components/PaymentModal";
import { BiArrowBack } from "react-icons/bi";
import Footer from "../Components/Footer";
import { getMessages } from "../api/Conversation/conversation.Api";
import socket from "../socket";
import TransactionCard from "../Components/TransactionCard";
import Chat from "../Components/Chat";
import { KycModal } from "../Components/KycModal";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
const Contacts = ({ user }) => {
  // ref for autoscroll
  const lastDiv = useRef();

  // message state
  const [message, setMessage] = useState("");

  // Contacts from store
  const contacts = useSelector((state) => state.contacts.contactList.contacts);

  // to dispatch actions
  const dispatch = useDispatch();

  // P2p Transaction List
  const [transactionList, setTransactionList] = useState([]);

  // Select user For Transaction list
  const [selectedUser, setSelectedUser] = useState({});

  // Show hide payment modal
  const [payBool, setPayBool] = useState(false);

  // Show hide transactions
  const [showTransaction, setShowTransaction] = useState(false);

  // set receiver while paying
  const [reciever, setReciever] = useState();

  // show hide KYC Modal
  const [kycPrompt, setKycPrompt] = useState(false);

  // isTyping
  const [isTyping, setIsTyping] = useState(false);

  //gets current users Contact List
  useEffect(() => {
    getContacts();
  }, []);

  // Socket listner
  useEffect(() => {
    socket.on("message", (data) => {
      getContacts();
      const recieverId = localStorage.getItem("receiver");
      console.log(recieverId);
      if (data.senderId._id == recieverId || data.senderId._id == user._id) {
        setTransactionList((prev) => [...prev, data]);
      }
    });
    socket.on("on transaction", (transaction) => {
      setTransactionList((prev) => [...prev, transaction]);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("typing_stopped", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("message");
      socket.off("on transaction");
      socket.off("typing");
      socket.off("typing_stopped");
    };
  }, [socket]);

  // to scroll to latest payement
  useEffect(() => {
    lastDiv.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [transactionList]);

  // get Contacts
  const getContacts = () => {
    getContactsApi(user, dispatch);
  };

  // Get P2p Transactions
  const seeTransactions = (user2) => {
    setReciever(user2);
    localStorage.setItem("receiver", user2.userId);
    const id = user2.userId;
    setSelectedUser(user2);

    getP2pTransactions(setTransactionList, id);
    getMessages(user._id, id, setTransactionList);
    setShowTransaction(true);
  };

  // Pay to Contact
  const payContact = () => {
    console.log(selectedUser);
    setReciever(selectedUser);
    if (user.isKycVerified) {
      setPayBool(true);
    } else {
      setKycPrompt(true);
    }
  };

  // Send Message
  const sendMessage = (e) => {
    e.preventDefault();
    // sendMessageApi(User._id, reciever.userId, message);

    const data = {
      sender: user._id,
      receiver: reciever.userId,
      message,
    };
    if (message.length > 0) {
      socket.emit("message", data);
      setMessage("");
    }
  };

  let timer;

  // handle Typing
  const startTyping = () => {
    console.log("typing..");
    const data = {
      sender: user._id,
      receiver: reciever.userId,
    };
    socket.emit("typing", data);
    clearTimeout(timer);
  };

  const stoppedTyping = () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log("stopped");
      const data = {
        sender: user._id,
        receiver: reciever.userId,
      };
      socket.emit("typing_stopped", data);
    }, [500]);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="bg-[#00174d] h-60  text-white mt-24">
        <div className="  border-2 border-[#21b1f8]"></div>

        <p className="text-center py-8 text-xs">
          Home {"  >   "}
          <span className="font-bold">Contacts</span>
        </p>
      </div>
      {user.name && (
        <>
          <div className="  border-2 border-[#21b1f8]"></div>
          <div
            className={`${
              showTransaction ? "md:w-[50%]" : "md:w-[50%]"
            } grid w-[90%]  mx-auto left-0 right-0 bg-white border border-gray-500    absolute top-44 rounded-2xl `}
          >
            {!showTransaction && (
              <div className="p-2 ">
                <div className="h-full  max-h-[65vh] overflow-y-auto">
                  {contacts && contacts.length > 0 ? (
                    contacts.map((user, index) => {
                      return (
                        <div
                          className={`sm:flex text-center sm:text-left  justify-between p-2 mx-2 ${
                            index !== contacts.length - 1 &&
                            "border-b border-gray-400"
                          }`}
                          key={user._id}
                        >
                          <div className=" ">
                            <p className="text-normal text-[#0f4a8a] font-semibold">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500 font-semibold">
                              {user.phone}
                            </p>
                          </div>
                          <div className="my-auto mx-3   ">
                            <button
                              className="bg-[#0f4a8a]  text-white font-semibold py-2 px-4 rounded-lg"
                              title="Send Money"
                              onClick={() => {
                                seeTransactions(user);
                              }}
                            >
                              <BsFillChatSquareDotsFill />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h1 className="text-center text-lg mt-10 font-bold text-[#0f4a8a]">
                      You don't have any contacts
                    </h1>
                  )}
                </div>
              </div>
            )}
            {showTransaction && (
              <div className="h-full  max-h-[70vh]  ">
                {selectedUser.name && (
                  <div className="h-[70vh]  p-2">
                    <div className="border-b border-gray-300 p-2 flex justify-between">
                      <div className="flex items-center">
                        <BiArrowBack
                          className="cursor-pointer"
                          onClick={() => setShowTransaction(false)}
                        />
                        <div className="mx-4">
                          <p className="text-normal text-[#0f4a8a] font-semibold">
                            {selectedUser.name}
                          </p>
                          <p className="text-sm text-gray-500 font-semibold">
                            {selectedUser.phone}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={payContact}
                        className="bg-[#0f4a8a] text-white font-semibold  px-3 me-3 rounded-lg"
                        title="Send Money"
                      >
                        pay
                      </button>
                    </div>
                    <div className=" p-2 m-2 h-[75%] overflow-y-auto ">
                      {transactionList.map((e, index) => {
                        const date = new Date(e.timestamp);
                        if (e.amount) {
                          return (
                            <TransactionCard
                              key={index}
                              date={date}
                              transaction={e}
                              user={user}
                            />
                          );
                        } else {
                          return (
                            <Chat
                              key={index}
                              date={date}
                              transaction={e}
                              user={user}
                            />
                          );
                        }
                      })}
                      <div ref={lastDiv}></div>
                    </div>
                    <div className="px-5">
                      {isTyping ? (
                        <ThreeDots
                          height="24"
                          width="24"
                          radius="9"
                          color="#00174d"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClassName=""
                          visible={true}
                        />
                      ) : (
                        <span className="invisible">asdas</span>
                      )}
                    </div>
                    <form
                      className="flex relative w-[80%] mx-auto"
                      onSubmit={sendMessage}
                    >
                      <input
                        type="text"
                        className="border border-black m-2 w-full p-2  rounded-md"
                        value={message || ""}
                        onKeyUp={stoppedTyping}
                        onChange={(e) => {
                          startTyping();
                          setMessage(e.target.value);
                        }}
                        placeholder="Your messages..."
                      />
                      <button
                        type="submit"
                        className="bg-[#0f4a8a] text-white font-semibold  px-3 my-auto py-2  rounded-lg absolute right-4 top-[0.80rem]"
                        title="Send Money"
                      >
                        <RiSendPlaneFill />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {payBool && (
        <PaymentModal
          user={user}
          setPayBool={setPayBool}
          seeTransactions={seeTransactions}
          reciever={reciever}
        />
      )}
      {kycPrompt && <KycModal setKycPrompt={setKycPrompt} />}
      <div className="mt-[50vh]">
        <Footer />
      </div>
    </>
  );
};

export default Contacts;
