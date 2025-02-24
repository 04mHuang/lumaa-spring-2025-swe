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
      alert("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);
export const logout =  () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
};

export default api;