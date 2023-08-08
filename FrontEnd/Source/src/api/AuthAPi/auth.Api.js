import axios from "axios";
const url = import.meta.env.VITE_API_URL;

// Auth Api
export const authApi = async (token) => {
  var config = {
    method: "get",
    url: `${url}/auth`,
    headers: {
      token: token,
    },
  };
  let result = axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
  return result;
};
