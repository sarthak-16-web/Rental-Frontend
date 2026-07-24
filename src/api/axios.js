import axios from "axios";

const api = axios.create({
  baseURL: "https://rental-backend-un3m.onrender.com/api",
  withCredentials: true,
});

export default api;
