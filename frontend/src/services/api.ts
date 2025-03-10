import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      alert("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default api;