// src/api.js
import axios from 'axios';

function getCsrfTokenFromCookie() {
  const match = document.cookie.match(/CSRF-TOKEN=([^;]+)/);
  return match && decodeURIComponent(match[1]);
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfTokenFromCookie();
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});

export default api;
