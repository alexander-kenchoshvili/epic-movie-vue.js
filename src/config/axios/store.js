import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
  },
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
