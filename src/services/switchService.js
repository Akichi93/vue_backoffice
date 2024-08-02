import offlineService from "./offlineService";
import onlineService from "./onlineService";

class switchService {
    currentMode = '';
    constructor() {
        // Initialisation

        // console.log(this.currentMode)
    }

    refreshMode() {
        this.currentMode = localStorage.getItem('mode') ?? '';
    }



    async getBranches() {
        this.refreshMode();
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
        this.refreshMode();
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

    async storeMarque(marque) {
        this.refreshMode();
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
        this.refreshMode();
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

    async storeGenre(genre) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeGenre(genre);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeGenre(genre);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getCategorie() {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeCouleur(energie);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeCouleur(energie);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeBranche(nomBranche, entrepriseId) {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeProspect(formData, userId, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeProspect(formData, userId, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Erreur d'ajoût du prospect:", error);
            throw error; // Propagate the error for handling
        }
    }

    async ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState) {
        this.refreshMode();
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
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateProspect(prospectoedit, uuidProspectToUpdate);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.updateProspect(prospectoedit, uuidProspectToUpdate);
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient) {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
    


    async getContratByUuidClient(uuidClient) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getContratByUuidClient(uuidClient);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getContratByUuidClient(uuidClient);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    } 


    async addProspectBranche(form, userId, entrepriseId, uuidProspect) {
        this.refreshMode();
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
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getProspects();
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getProspects();
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getProspectByUuid(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getProspectByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getProspectByUuid(uuid);
                return response.data.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async searchProspectsByName(name) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.searchProspectsByName(name);
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

    // Clients

    async storeClient(form, entrepriseId, userId, numeroClient) {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getClients();
            } else if (this.currentMode === "Ligne") {
                const response = await onlineService.getClients();
                return response.data;
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getClientNameByUUID() {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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

    async updateAvenantPayerApporteur(uuidAvenantToUpdate, newPayer, newSyncState, uuidApporteur) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateAvenantPayerApporteur(uuidAvenantToUpdate, newPayer, newSyncState, uuidApporteur);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateAvenantPayerApporteur(uuidAvenantToUpdate, newPayer, newSyncState, uuidApporteur);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }


    async getAdresse() {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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

    async getAvenantsByUUIDCompagnie(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAvenantsByUUIDCompagnie(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getAvenantsByUUIDCompagnie(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateAvenantPayerCompagnie(uuidAvenantToUpdate, newPayer, newSyncState, uuidApporteur) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateAvenantPayerCompagnie(uuidAvenantToUpdate, newPayer, newSyncState, uuidApporteur);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateAvenantPayerCompagnie(uuidAvenantToUpdate, newPayer, newSyncState, uuidApporteur);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getSommeCommissionsCompagnie(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getSommeCommissionsCompagnie(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getSommeCommissionsCompagnie(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getSommeCommissionsCompagniePayer(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getSommeCommissionsCompagniePayer(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getSommeCommissionsCompagniePayer(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }


    async getTauxCompagnies(uuid) {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getContrats();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getContrats();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Erreur de la recupération des contrats:", error);
            throw error;
        }
    }

    async getContratsOneExpire() {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getContratsOneExpire();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getContratsOneExpire();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Erreur de la recupération des contrats:", error);
            throw error;
        }
    }

    async getContratsTwoExpire() {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getContratsTwoExpire();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getContratsTwoExpire();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Erreur de la recupération des contrats:", error);
            throw error;
        }
    }

    async getContratByUuid(uuid) {
        this.refreshMode();
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

    async updateContrat(contrats, uuidContratToUpdate, primeNette, accessoires, fraisCourtier, cfga, taxesTotales, totalPrimeTtc, entrepriseId) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateContrat(contrats, uuidContratToUpdate, primeNette, accessoires, fraisCourtier, cfga, taxesTotales, totalPrimeTtc, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateContrat(contrats, uuidContratToUpdate, primeNette, accessoires, fraisCourtier, cfga, taxesTotales, totalPrimeTtc, entrepriseId);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getInfoContratByUuid(uuid) {
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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
        this.refreshMode();
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

    async storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc, codeAvenant, formData) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc, codeAvenant, formData);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc, codeAvenant, formData);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }


    async getTauxParIdBrancheEtCompagnie(id_branche, option) {
        this.refreshMode();
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
        this.refreshMode();
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

    async storeAutomobile(form, userId, entrepriseId, uuidAutomobile, uuidContrat, contrat, typegaranties) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeAutomobile(form, userId, entrepriseId, uuidAutomobile, uuidContrat, contrat, typegaranties);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeAutomobile(form, userId, entrepriseId, uuidAutomobile, uuidContrat, contrat, typegaranties);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAvenantsByUuidContrat(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAvenantsByUuidContrat(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getAvenantsByUuidContrat(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getFactures(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getFactures(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getFactures(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeAvenant(form, userId, entrepriseId, uuidContrat, uuidAvenant, infocontrat, codeAvenant, calculateCommission, calculateCommissionCourtier) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeAvenant(form, userId, entrepriseId, uuidContrat, uuidAvenant, infocontrat, codeAvenant, calculateCommission, calculateCommissionCourtier);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeAvenant(form, userId, entrepriseId, uuidContrat, uuidAvenant, infocontrat, codeAvenant, calculateCommission, calculateCommissionCourtier);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateAvenantSolde(uuidContrat, uuidAvenantToUpdate, newSolde, newSyncState) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateAvenantSolde(uuidContrat, uuidAvenantToUpdate, newSolde, newSyncState);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateAvenantSolde(uuidContrat, uuidAvenantToUpdate, newSolde, newSyncState);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateAvenantReverse(uuidContrat, uuidAvenantToUpdate, newReverse, newSyncState) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateAvenantReverse(uuidContrat, uuidAvenantToUpdate, newReverse, newSyncState);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateAvenantReverse(uuidContrat, uuidAvenantToUpdate, newReverse, newSyncState);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeAssurance(form, userId, entrepriseId) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeAssurance(form, userId, entrepriseId);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeAssurance(form, userId, entrepriseId);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAssurance() {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAssurance();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getAssurance();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getAssuranceByUuid(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getAssuranceByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getAssuranceByUuid(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getSinistre() {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getSinistre();
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getSinistre();
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getInfoSinistreByUuid(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getInfoSinistreByUuid(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getInfoSinistreByUuid(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async storeSinistre(form, userId, entrepriseId, police) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.storeSinistre(form, userId, entrepriseId, police);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.storeSinistre(form, userId, entrepriseId, police);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getReglement(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getReglement(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getReglement(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async getSommeReglement(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.getSommeReglement(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.getSommeReglement(uuid);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }


    async updateSinistre(uuidSinistreToUpdate, sinistres) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateSinistre(uuidSinistreToUpdate, sinistres);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateSinistre(uuidSinistreToUpdate, sinistres);
            } else {
                throw new Error("Unsupported mode: " + this.currentMode);
            }
        } catch (error) {
            console.error("Error storing branch:", error);
            throw error;
        }
    }

    async updateSinistreStatus(uuid) {
        this.refreshMode();
        try {
            if (this.currentMode === "Local") {
                return await offlineService.updateSinistreStatus(uuid);
            } else if (this.currentMode === "Ligne") {
                return await onlineService.updateSinistreStatus(uuid);
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
