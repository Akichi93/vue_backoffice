// src/services/apiService.js

import axios from 'axios';
import { apiUrl } from '../utils/constants/apiUrl.js';

const AxiosService = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token dans le header
AxiosService.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  get(endpoint) {
    return AxiosService.get(endpoint);
  },
  post(endpoint, data) {
    return AxiosService.post(endpoint, data);
  },
  put(endpoint, data) {
    return AxiosService.put(endpoint, data);
  },
  delete(endpoint) {
    return AxiosService.delete(endpoint);
  },
};
