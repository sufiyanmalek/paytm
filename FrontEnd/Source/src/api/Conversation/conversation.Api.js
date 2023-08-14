import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getMessages = async (sender, receiver, setTransactionList) => {
  try {
    var config = {
      method: "get",
      url: `${url}/conversation`,
      headers: {
        data: JSON.stringify({
          receiver: receiver,
          sender: sender,
        }),
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    setTransactionList((prev) =>
      [...prev, ...response.data].sort((a, b) => {
        return a.timestamp > b.timestamp
          ? 1
          : a.timestamp < b.timestamp
          ? -1
          : 0;
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendMessageApi = async (sender, receiver, message) => {
  try {
    var data = JSON.stringify({
      sender: sender,
      receiver: receiver,
      message: message,
    });
    var config = {
      method: "post",
      url: `${url}/conversation`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};
