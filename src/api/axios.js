import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? '/api'
    : `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true, // required for refresh cookie
});

/* ======================================
   REQUEST: attach access token
====================================== */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ======================================
   RESPONSE: auto refresh on 401
====================================== */
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const res = await api.post('/auth/refresh');

      // ✅ store new access token
      localStorage.setItem('token', res.data.token);

      // ✅ update header for retry
      originalRequest.headers.Authorization = `Bearer ${res.data.token}`;

      return api(originalRequest);
    } catch (err) {
      // refresh failed → session expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = '/login';
      return Promise.reject(err);
    }
  }
);

export default api;
