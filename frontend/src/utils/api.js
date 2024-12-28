import axios from 'axios';

const API = axios.create({
  baseURL: 'https://location-tracker-backend-tpeq.onrender.com', // Replace with your backend URL
});

// Add Authorization header if a token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;
