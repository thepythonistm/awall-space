import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://awall-space.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

export default apiClient;
