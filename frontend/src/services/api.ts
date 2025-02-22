import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Changed from '/api' to '/v1'
  withCredentials: true
});
export default api;