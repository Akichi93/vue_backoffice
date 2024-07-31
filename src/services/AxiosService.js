// src/services/apiService.js

import axios from 'axios';
import router from '../routers';
import AppStorage from '../db/AppStorage';
import { apiUrl } from '../utils/constants/apiUrl';

const AxiosService = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token dans le header
AxiosService.interceptors.request.use(config => {
  const token = AppStorage.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Fonction pour rafraîchir le token
async function refreshToken() {
  try {
    const response = await axios.post(apiUrl.refresh, {}, {
      headers: {
        'Authorization': `Bearer ${AppStorage.getRefreshToken()}`
      }
    });
    const { token } = response.data;
    AppStorage.storeToken(token);
    return token;
  } catch (error) {
    AppStorage.clear(); // Supprimez les tokens stockés
    router.push('/lockscreen'); // Redirigez vers la page de connexion
    return Promise.reject(error);
  }
}

// Intercepteur pour gérer les erreurs de réponse
AxiosService.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newToken = await refreshToken();
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return AxiosService(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
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
