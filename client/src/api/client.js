import axios from 'axios';

const API_BASE_URL = 'https://swastk-creations-catlog.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bride_store_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Surface a friendly message on auth failure
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject({ ...error, message });
  }
);

export default api;
