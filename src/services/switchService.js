import AppStorage from "../db/AppStorage";
import offlineService from "./offlineService";
import onlineService from "./onlineService";

class switchService {
    constructor() {
        this.currentMode = AppStorage.getMode();
    }



    async getBranches() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getBranches();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getBranches();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getMarque() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getMarque();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getMarque();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeMarque(marque){
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeMarque(marque);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeMarque(marque);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getGenre() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getGenre();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getGenre();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeGenre(genre){
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getGenre(genre);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getGenre(genre);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getCategorie() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getCategorie();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getCategorie();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeCategorie(categorie) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeCategorie(categorie);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeCategorie(categorie);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getCouleur() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getCouleur();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getCouleur();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeEnergie(couleur) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeEnergie(couleur);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeEnergie(couleur);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getEnergie() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getEnergie();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getEnergie();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeCouleur(energie) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeEnergie(energie);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeEnergie(energie);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeBranche(nomBranche, entrepriseId) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeBranche(nomBranche, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getBrancheByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getBrancheByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getBrancheByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateBranche(branchetoedit, uuidBrancheToUpdate) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateBranche(branchetoedit, uuidBrancheToUpdate);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.updateBranche(branchetoedit, uuidBrancheToUpdate);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error update Branche:", error);
            throw error;
        }
    }

    async deleteBranche(uuidBrancheToUpdate) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.deleteBranche(uuidBrancheToUpdate);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.deleteBranche(uuidBrancheToUpdate);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error update Branche:", error);
            throw error;
        }
    }


    async deleteBranche() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateBranche(branchetoedit, uuidBrancheToUpdate);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.updateBranche(branchetoedit, uuidBrancheToUpdate);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error update Branche:", error);
            throw error;
        }
    }

    async storeProspect(formData, userId, entrepriseId) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeProspect(formData, userId, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeProspect(formData, userId, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error; // Propagate the error for handling
        }
    }

    async ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateProspect(prospectoedit, uuidProspectToUpdate) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateProspect(prospectoedit, uuidProspectToUpdate);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async deleteProspect(uuidProspectToUpdate, newDelete, newSyncState) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.deleteProspect(uuidProspectToUpdate, newDelete, newSyncState);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.deleteProspect(uuidProspectToUpdate, newDelete, newSyncState);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getNameProspectParUUID(uuidProspect) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getNameProspectParUUID(uuidProspect);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getNameProspectParUUID(uuidProspect);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getDifferenceOfBranches(uuidProspect) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getDifferenceOfBranches(uuidProspect);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getDifferenceOfBranches(uuidProspect);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getBrancheProspectsByuuidProspect(uuidProspect) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getBrancheProspectsByuuidProspect(uuidProspect);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getBrancheProspectsByuuidProspect(uuidProspect);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }



    async addProspectBranche(form, userId, entrepriseId, uuidProspect) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.addProspectBranche(form, userId, entrepriseId, uuidProspect);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.addProspectBranche(form, userId, entrepriseId, uuidProspect);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getProspects() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getProspects();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getProspects();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getProspectByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getProspectByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getProspectByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async searchProspectsByName(name) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchProspectsByName(name);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    // Clients

    async storeClient(form, entrepriseId, userId, numeroClient) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeClient(form, entrepriseId, userId, numeroClient);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeClient(form, entrepriseId, userId, numeroClient);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateClient(clientoedit, uuidClientToUpdate) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateClient(clientoedit, uuidClientToUpdate);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateClient(clientoedit, uuidClientToUpdate);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getClients() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getClients();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getClients();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getClientNameByUUID() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getProspectByUuid(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getClientByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getClientByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getClientByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async searchClientsByName(name) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchClientsByName(name);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    //Apporteurs
    async getApporteurs() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getApporteurs();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getApporteurs();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getApporteurByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getApporteurByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getApporteurByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateApporteur(apporteurtoedit, uuidApporteurToUpdate) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateApporteur(apporteurtoedit, uuidApporteurToUpdate);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateApporteur(apporteurtoedit, uuidApporteurToUpdate);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async searchApporteursByName(name) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchApporteursByName(name);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getTauxApporteurs(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getTauxApporteurs(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getTauxApporteurs(uuid);
                return response;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getNameApporteur(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getNameApporteur(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getNameApporteur(uuid);
                return response.data.nom_apporteur;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getTauxApporteurByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getTauxApporteurByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getTauxApporteurByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async searchTauxApporteurByNomBranche(name, uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchTauxApporteurByNomBranche(name, uuid);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState, uuidApporteur) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState, uuidApporteur);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState, uuidApporteur);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAvenantByUuid(uuidAvenant) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAvenantByUuid(uuidAvenant);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getAvenantByUuid(uuidAvenant);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateApporteur(apporteurtoedit, uuidApporteurToUpdate) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateApporteur(apporteurtoedit, uuidApporteurToUpdate);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getInfoApporteur(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getInfoApporteur(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getInfoApporteur(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getSommeCommissionsApporteur(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getSommeCommissionsApporteur(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getSommeCommissionsApporteur(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getSommeCommissionsApporteurPayer(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getSommeCommissionsApporteurPayer(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getSommeCommissionsApporteurPayer(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }


    async getAdresse() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAdresses();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getAdresses();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeAdresse(adresse) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeAdresse(adresse);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeAdresse(adresse);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getProfession() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getProfession();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getProfession();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    // Compagnies

    async getCompagnies() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getCompagnies();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getCompagnies();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getCompagnieByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getCompagnieByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getCompagnieByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing compagnie:", error);
            throw error;
        }
    }

    async searchCompagnieByName(name) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchCompagniesByName(name);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.searchCompagniesByName(name);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }


    async getTauxCompagnies(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getTauxCompagnies(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getTauxCompagnies(uuid);

                return response;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getNameCompagnie(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getNameCompagnie(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getNameCompagnie(uuid);
                return response.data.nom_compagnie;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getTauxCompagnieByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getTauxCompagnieByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.getTauxCompagnieByUuid(uuid);
                const response = await onlineService.getTauxCompagnieByUuid(uuid);
                console.log(response)
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async searchTauxCompagnieByNomBranche(name, uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchTauxCompagnieByNomBranche(name, uuid);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeCompagnie(form, userId, entrepriseId, unique, donnees, datas) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeCompagnie(form, userId, entrepriseId, unique, donnees, datas);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeCompagnie(form, userId, entrepriseId, unique, donnees, datas);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing compagnie:", error);
            throw error;
        }
    }

    async updateCompagnie(compagnietoedit, uuidCompagnieToUpdate, entrepriseId) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateCompagnie(compagnietoedit, uuidCompagnieToUpdate, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateCompagnie(compagnietoedit, uuidCompagnieToUpdate, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getContrats() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getContrats();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getContrats();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getContratByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getContratByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getContratByUuid(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getInfoContratByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getInfoContratByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getInfoContratByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAvenantsSommeByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAvenantsSommeByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getAvenantsSommeByUuid(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAvenantsByUuidContrat(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAvenantsByUuidContrat(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getAvenantsByUuidContrat(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAutomobileByUuidContrat(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAutomobileByUuidContrat(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getAutomobileByUuidContrat(uuid);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getTauxParIdBrancheEtCompagnie(id_branche, option) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getTauxParIdBrancheEtCompagnie(id_branche, option);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getTauxParIdBrancheEtCompagnie(id_branche, option);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getTauxParIdBrancheEtApporteur(id_branche, optional) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getTauxParIdBrancheEtApporteur(id_branche, optional);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getTauxParIdBrancheEtApporteur(id_branche, optional);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }
}

export default new switchService();
