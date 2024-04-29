import AppStorage from "../db/AppStorage";
import offlineService from "./offlineService";
import onlineService from "./onlineService";

class switchService {
    constructor() {
        this.currentMode = AppStorage.getMode();
    }

    async storeBranche(nomBranche, entrepriseId) {
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeBranche(nomBranche, entrepriseId);
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

    async changeProspect(uuidProspectToUpdate,newState,newSyncState,prospectoedit,entrepriseId,userId,numeroClient){
        try {
            if (this.currentMode === "Local") {
                return await offlineService.changeProspect(uuidProspectToUpdate,newState,newSyncState,prospectoedit,entrepriseId,userId,numeroClient);
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

    async deleteProspect(uuidProspectToUpdate, newDelete, newSyncState){
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

    async addProspectBranche(form, userId, entrepriseId, uuidProspect){
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

    async getProspects(){
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

    async getProspectByUuid(uuid){
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

    async searchProspectsByName(name){
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
}

export default new switchService();
