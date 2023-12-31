import axios from "axios";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_API_URL;

// Send Money Api
export const sendMoneyApi = async (
  reciever,
  paymentDetails,
  user,
  seeTransactions,
  setPaymentDetails,
  setPayBool
) => {
  // console.log(reciever, "asd");
  const id = toast.loading("Processing your Payment!", {
    position: "top-center",
  });
  // console.log(reciever);
  var data = paymentDetails;

  var config = {
    method: "post",
    url: `${url}/send/${reciever.phone}`,
    data: data,
  };

  axios(config)
    .then(function (response) {
      toast.update(id, {
        render: response.data,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
        position: "top-center",
      });
      setPaymentDetails();
      setPayBool(false);
      if (seeTransactions) {
        seeTransactions(reciever);
      }
    })
    .catch(function (error) {
      console.log(error);
      toast.update(id, {
        render: error.response.data,
        type: "error",
        isLoading: false,
        autoClose: 1500,
        closeButton: true,
        position: "top-center",
      });
    });
};
