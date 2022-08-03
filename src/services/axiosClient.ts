import { getAccessToken } from "@/helper";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    Authorization: 'Bearer ' + getAccessToken()
  },
});

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     let res = error.response;
//     if (res.status == 401) {
//       // window.location.href = "https://localhost:5174";
//     }
//     console.error("Looks like there was a problem. Status Code: " + res.status);
//     return Promise.reject(error);
//   }
// );
