import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://awall-space.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;