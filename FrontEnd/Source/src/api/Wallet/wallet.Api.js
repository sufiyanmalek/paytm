import axios from "axios";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_API_URL;

// Get Wallet Of User
export const getWalletApi = async (user) => {
  var data = user;
  var config = {
    method: "post",
    url: `${url}/wallet`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let result = await axios(config);
  console.log(result);

  return result;
};

// Add money to Wallet
export const addMoneyToWalletApi = async (addMoneyDetails, user) => {
  const id = toast.loading("Adding Money...", { position: "top-center" });

  var data = JSON.stringify({
    ...addMoneyDetails,
    amount: parseFloat(addMoneyDetails.amount),
  });

  var config = {
    method: "put",
    url: `${url}/wallet/add`,
    headers: {
      user: user,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const result = axios(config)
    .then(function (response) {
      if (response.status == 200) {
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          position: "top-center",
        });
      }
      return response;
    })
    .catch(function (error) {
      toast.update(id, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
        position: "top-center",
      });
    });
  return result;
};
