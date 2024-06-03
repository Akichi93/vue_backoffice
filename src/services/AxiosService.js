
import axios from "axios";
import AppStorage from '../db/AppStorage.js';
import { apiUrl } from "../utils/constants/apiUrl.js";
import router from '../routers';

class AxiosService {
    constructor() {
        this.axiosService = axios.create({
            // baseURL: 'http://your-laravel-api-url/api'
            headers: this.getHeaders(),
        });

        // Intercepter les requêtes pour ajouter le token
        this.axiosService.interceptors.request.use(
            (config) => {
                const token = AppStorage.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Intercepter les réponses pour gérer les erreurs d'authentification
        this.axiosService.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshResponse = await this.post(apiUrl.refresh);
                        console.log(refreshResponse)
                        const newToken = refreshResponse.access_token;

                        // AppStorage.storeToken(newToken);
                        this.axiosService.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                        return this.axiosService(originalRequest);
                    } catch (refreshError) {
                        AppStorage.clear(); // Supprimez le token du stockage
                        router.push('/login'); // Redirigez vers la page de login
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    getHeaders() {
        const token = AppStorage.getToken();

        return {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };
    }

    async get(url, params = {}) {
        try {
            const response = await this.axiosService.get(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post(url, data = {}) {
        try {
            const response = await this.axiosService.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}


export default new AxiosService();
