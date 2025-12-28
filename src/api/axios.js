import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? '/api' // development → Vite proxy
    : `${import.meta.env.VITE_API_BASE_URL}/api`, // production → Render
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
