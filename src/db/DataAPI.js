// GraveDataAPI.js
// const API_BASE_URL = 'https://fl4ir.loca.lt/api/auth/';
import { apiUrl } from "../utils/constants/apiUrl";
import AppStorage from "./AppStorage";
import axios from "axios";

export default {
    async getGraveBranchesData() {
        const token = AppStorage.getToken();
        try {
            const response = await fetch(apiUrl.getbranche, {
                headers: {
                    Authorization: "Bearer " + token,
                    "x-access-token": token,
                }
            });
            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des branches.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("branches", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des branches:', error);
            throw error;
        }
    },

    async getGraveProspectsData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {

            const response = await axios.get(apiUrl.getprospect, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des prospects.');
            // }
            const newData = response.data;

            await AppStorage.updateSyncIndexedDB("prospects", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des prospects:', error);
            throw error;
        }
    },

    async getGraveClientsData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.getclient, { headers });
            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des clients.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("clients", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des clients:', error);
            throw error;
        }
    },

    async getGraveCompagniesData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.getcompagnie, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des compagnies.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("compagnies", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des compagnies:', error);
            throw error;
        }
    },

    async getGraveTauxCompagniesData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.gettauxcompagnie, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des taux compagnies.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("tauxcompagnies", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des taux compagnies:', error);
            throw error;
        }
    },

    async getGraveApporteursData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.getapporteur, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des apporteurs.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("apporteurs", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des apporteurs:', error);
            throw error;
        }
    },

    async getGraveTauxApporteursData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.gettauxapporteur, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des taux apporteurs.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("tauxapporteurs", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des taux apporteurs:', error);
            throw error;
        }
    },

    // async getGraveTauxApporteursData() {
    //     const token = AppStorage.getToken();
    //     try {
    //         const response = await fetch(apiUrl.gettauxapporteur, {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //                 "x-access-token": token,
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error('Erreur lors de la récupération des données graves des taux apporteurs.');
    //         }
    //         const newData = await response.json();
    //         await AppStorage.updateSyncIndexedDB('branches', newData);
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des données graves des taux apporteurs:', error);
    //         throw error;
    //     }
    // },

    async getGraveContratsData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.getcontrat, { headers });

            // Vérification de la réussite de la requête
            // if (response.status !== 200) {
            //     throw new Error('Erreur lors de la récupération des données graves des contrats.');
            // }
            const newData = response.data;

            await AppStorage.updateSyncIndexedDB("contrats", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des contrats:', error);
            throw error;
        }
    },

    async getGraveAvenantsData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.getavenant, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des avenants.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("avenants", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des avenants:', error);
            throw error;
        }
    },

    async getGraveGarantiesData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {
            const response = await axios.get(apiUrl.getgarantie, { headers });

            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des garanties.');
            // }
            const newData = await response.json();
            await AppStorage.updateSyncIndexedDB("garanties", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des garanties:', error);
            throw error;
        }
    },

    async getGraveAutomobilesData() {
        const token = AppStorage.getToken();

        const headers = {
            Authorization: "Bearer " + token,
            "x-access-token": token,
        };

        try {

            const response = await axios.get(apiUrl.getautomobile, { headers });
            
            // if (!response.ok) {
            //     throw new Error('Erreur lors de la récupération des données graves des automobiles.');
            // }
            const newData = response.data;
            await AppStorage.updateSyncIndexedDB("automobiles", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des automobiles:', error);
            throw error;
        }
    },

};
