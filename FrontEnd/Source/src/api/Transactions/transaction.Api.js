import axios from "axios";
const url = import.meta.env.VITE_API_URL;

// Get Transactions Of user
// export const getTransactionsApi = (
//   token,
//   setStatus,
//   page,
//   setLoading,
//   setPageEnd,
//   dispatch
// ) => {
//   setLoading(true);
//   var config = {
//     method: "get",
//     url: `${url}/transactions`,
//     headers: {
//       token: token,
//       page: page,
//       "Content-Type": "application/json",
//     },
//   };

//   axios(config)
//     .then(function (response) {
//       setStatus(response.data.transactions);
//       dispatch(setPage(parseInt(response.data.page)));
//       setLoading(false);
//       if (response.data.transactions.length < 10) {
//         setPageEnd(true);
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// Get P2P Transactions
export const getP2pTransactions = (setTransactionList, id) => {
  var config = {
    method: "get",
    url: `${url}/p2ptransaction/${id}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      setTransactionList(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
