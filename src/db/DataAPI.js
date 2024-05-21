// GraveDataAPI.js

import { apiUrl } from "../utils/constants/apiUrl";
import AppStorage from "./AppStorage";
import AxiosService from "../services/AxiosService";  // Import the AxiosService

export default {
    async getGraveBranchesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getbranche);
            await AppStorage.updateSyncIndexedDB("branches", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des branches:', error);
            throw error;
        }
    },

    async getGraveProspectsData() {
        try {
            const newData = await AxiosService.get(apiUrl.getprospect);
            await AppStorage.updateSyncIndexedDB("prospects", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des prospects:', error);
            throw error;
        }
    },

    async getGraveClientsData() {
        try {
            const newData = await AxiosService.get(apiUrl.getclient);
            await AppStorage.updateSyncIndexedDB("clients", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des clients:', error);
            throw error;
        }
    },

    async getGraveCompagniesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getcompagnie);
            await AppStorage.updateSyncIndexedDB("compagnies", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des compagnies:', error);
            throw error;
        }
    },

    async getGraveTauxCompagniesData() {
        try {
            const newData = await AxiosService.get(apiUrl.gettauxcompagnie);
            await AppStorage.updateSyncIndexedDB("tauxcompagnies", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des taux compagnies:', error);
            throw error;
        }
    },

    async getGraveApporteursData() {
        try {
            const newData = await AxiosService.get(apiUrl.getapporteur);
            await AppStorage.updateSyncIndexedDB("apporteurs", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des apporteurs:', error);
            throw error;
        }
    },

    async getGraveTauxApporteursData() {
        try {
            const newData = await AxiosService.get(apiUrl.gettauxapporteur);
            await AppStorage.updateSyncIndexedDB("tauxapporteurs", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des taux apporteurs:', error);
            throw error;
        }
    },

    async getGraveContratsData() {
        try {
            const newData = await AxiosService.get(apiUrl.getcontrat);
            await AppStorage.updateSyncIndexedDB("contrats", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des contrats:', error);
            throw error;
        }
    },

    async getGraveAvenantsData() {
        try {
            const newData = await AxiosService.get(apiUrl.getavenant);
            await AppStorage.updateSyncIndexedDB("avenants", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des avenants:', error);
            throw error;
        }
    },

    async getGraveAutomobilesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getautomobile);
            await AppStorage.updateSyncIndexedDB("automobiles", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des automobiles:', error);
            throw error;
        }
    },

    async getGraveGarantiesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getgarantie);
            await AppStorage.updateSyncIndexedDB("garanties", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des garanties:', error);
            throw error;
        }
    },

    async getGraveSinistresData() {
        try {
            const newData = await AxiosService.get(apiUrl.getsinistre);
            await AppStorage.updateSyncIndexedDB("sinistres", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des sinistres:', error);
            throw error;
        }
    },

    async getGraveReglementsData() {
        try {
            const newData = await AxiosService.get(apiUrl.getreglement);
            await AppStorage.updateSyncIndexedDB("reglements", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des règlements:', error);
            throw error;
        }
    },

    async getGraveCategoriesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getcategorie);
            await AppStorage.updateSyncIndexedDB("categories", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des categories:', error);
            throw error;
        }
    },

    async getGraveMarquesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getmarque);
            await AppStorage.updateSyncIndexedDB("marques", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des marques:', error);
            throw error;
        }
    },

    async getGraveGenresData() {
        try {
            const newData = await AxiosService.get(apiUrl.getgenre);
            await AppStorage.updateSyncIndexedDB("genres", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des genres:', error);
            throw error;
        }
    },

    async getGraveCouleursData() {
        try {
            const newData = await AxiosService.get(apiUrl.getcouleur);
            await AppStorage.updateSyncIndexedDB("couleurs", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des couleurs:', error);
            throw error;
        }
    },

    async getGraveEnergiesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getenergie);
            await AppStorage.updateSyncIndexedDB("energies", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des energies:', error);
            throw error;
        }
    },

    async getGraveReductionGroupsData() {
        try {
            const newData = await AxiosService.get(apiUrl.getreductiongroup);
            await AppStorage.updateSyncIndexedDB("reductiongroups", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des groups de réduction:', error);
            throw error;
        }
    },

    async getGraveAssuranceTemporairesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getassurancetemporaire);
            await AppStorage.updateSyncIndexedDB("assurancetemporaires", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des assurances temporaires:', error);
            throw error;
        }
    },

    async getGraveActivitesData() {
        try {
            const newData = await AxiosService.get(apiUrl.getactivite);
            await AppStorage.updateSyncIndexedDB("activites", newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données graves des assurances temporaires:', error);
            throw error;
        }
    },

    async getGraveTarificateurAccidentsData() {

    },

    async getGraveTarificationAccidentsData() {

    }
};
