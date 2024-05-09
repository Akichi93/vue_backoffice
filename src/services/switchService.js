import AppStorage from "../db/AppStorage";
import offlineService from "./offlineService";
import onlineService from "./onlineService";

class switchService {
    constructor() {
        this.currentMode = AppStorage.getMode();
    }

    async getAdresses() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAdresses();
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

    async getBranches() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getBranches();
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

    async storeProspect(formData, userId, entrepriseId) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeProspect(formData, userId, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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

    async storeClient(form, entrepriseId, userId, numeroClient) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeClient(form, entrepriseId, userId, numeroClient);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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

    async getApporteurs() {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getApporteurs();
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

    async getApporteurByUuid(uuid) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getApporteurByUuid(uuid);
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

    async storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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

    async updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
                // return await onlineService.storeBranche(nomBranche, entrepriseId);
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
