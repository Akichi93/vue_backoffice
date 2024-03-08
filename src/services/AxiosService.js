
import axios from "axios";
import AppStorage from '../db/AppStorage.js';

class AxiosService {
    constructor() {
        this.axiosService = axios.create({
            headers: this.getHeaders(),
        });
    }

    getHeaders() {
        const token = AppStorage.getToken();

        // Ajoutez ici toute logique nécessaire pour gérer le cas où le jeton est null ou undefined

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
