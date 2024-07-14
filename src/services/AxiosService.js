// src/services/apiService.js

import axios from 'axios';
import { apiUrl } from '../utils/constants/apiUrl.js';
import router from '../routers';

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

// Intercepteur pour gérer les erreurs de réponse
AxiosService.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // Si une réponse 401 est reçue, redirigez vers la page de connexion
    router.push('/lockscreen');
  }
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
