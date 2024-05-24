import { v4 as uuidv4 } from 'uuid';
import AppStorage from "../db/AppStorage.js";
import { apiUrl } from '../utils/constants/apiUrl.js';
import AxiosService from './AxiosService.js'; // Importer AxiosService
import axios from 'axios';

class OnlineService {
    // constructor() {
    //     // Récupérer le token une fois lors de la création de l'instance de la classe
    //     this.token = AppStorage.getToken();

    //     // Configurez les en-têtes de la requête avec le token récupéré
    //     this.headers = {
    //         Authorization: "Bearer " + this.token,
    //         "x-access-token": this.token,
    //     };
    // }

    async getBranches() {
        try {
            const response = await AxiosService.get(apiUrl.getbranche);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeBranche(nomBranche, entrepriseId) {
        const uuid = uuidv4();

        const newBrancheData = {
            uuidBranche: uuid,
            nom_branche: nomBranche,
            id_entreprise: entrepriseId,
            sync: 1,
        };

        try {
            await AxiosService.post(apiUrl.postbranche, newBrancheData); // Utiliser AxiosService
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getBrancheByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.seteditbranche(uuid))
            return response;
            // axios.get("/api/auth/sinistres/edit/" + id_sinistre)
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateBranche(branchetoedit, uuidProspectToUpdate) {
        console
        try {
            const nouvellesInfos = {
                nom_branche: branchetoedit.nom_branche,
                sync: 1,
            };
            const response = AxiosService.post(apiUrl.setupdatebranche(uuidProspectToUpdate), nouvellesInfos)
            return response;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la branche:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async storeProspect(formData, userId, entrepriseId) {
        const uuid = uuidv4();

        const newProspectData = [{
            civilite: formData.civilite,
            nom_prospect: formData.nom_prospect,
            postal_prospect: formData.postal_prospect,
            adresse_prospect: formData.adresse_prospect,
            tel_prospect: formData.tel_prospect,
            profession_prospect: formData.profession_prospect,
            email_prospect: formData.email_prospect,
            fax_prospect: formData.fax_prospect,
            etat: 0,
            statut: formData.etat,
            id_entreprise: entrepriseId,
            id: userId,
            uuidProspect: uuid,
            sync: 1,
            supprimer_prospect: 0,
        }];

        try {
            await AxiosService.post(apiUrl.postprospect, newProspectData); // Utiliser AxiosService
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors du stockage du prospect :", error);
            throw new Error("Échec du stockage du prospect");
        }
    }

    async ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState) {
        try {
            const url = apiUrl.setetatprospect(uuidProspectToUpdate); // Utilisation de setetatprospect pour obtenir l'URL
            const response = await AxiosService.post(url, { etat: nouveauStatut }); // Utiliser AxiosService
            return response;
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de l\'état du prospect:', error);
        }
    }

    async storeClient(form, entrepriseId, userId, numeroClient) {
        const uuid = uuidv4();

        const newClientData = {
            civilite: form.civilite,
            nom_client: form.nom_client,
            postal_client: form.postal_client,
            adresse_client: form.adresse_client,
            tel_client: form.tel_client,
            profession_client: form.profession_client,
            fax_client: form.fax_client,
            email_client: form.email_client,
            id: userId,
            id_entreprise: entrepriseId,
            uuidClient: uuid,
            numero_client: numeroClient,
        };

        try {
            const updatedClients = await AxiosService.post(apiUrl.postclient, newClientData); // Utiliser AxiosService
            return updatedClients;
        } catch (error) {
            console.error("Erreur lors de l'ajout du client:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async updateClient(clientData) {
        try {
            const url = `/api/auth/updateClient/${clientData.id_client}`;
            const response = await AxiosService.patch(url, clientData); // Utiliser AxiosService
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getAdresse() {
        try {
            const response = await AxiosService.get(apiUrl.getlocalisation); // Utiliser AxiosService
            return { success: true, data: response };
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de la récupération des adresses" };
        }
    }

    async getProfession() {
        try {
            const response = await AxiosService.get(apiUrl.getprofession); // Utiliser AxiosService
            return { success: true, data: response };
        } catch (error) {
            console.error("Erreur lors de la récupération des professions:", error);
            return { success: false, error: "Erreur lors de la récupération des professions" };
        }
    }
}

export default new OnlineService();
