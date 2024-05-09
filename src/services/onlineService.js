import { v4 as uuidv4 } from 'uuid';
import AppStorage from "../db/AppStorage.js";
import { apiUrl } from '../utils/constants/apiUrl.js';

class OnlineService {
    constructor() {
        // Récupérer le token une fois lors de la création de l'instance de la classe
        this.token = AppStorage.getToken();

        // Configurez les en-têtes de la requête avec le token récupéré
        this.headers = {
            Authorization: "Bearer " + this.token,
            "x-access-token": this.token,
        };
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
            await axios.post(apiUrl.postbranche, newBrancheData, { headers: this.headers });
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
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
            await axios.post(apiUrl.postprospect, newProspectData, { headers: this.headers });
            // return true; // Succès
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors du stockage du prospect :", error);
            throw new Error("Échec du stockage du prospect");
        }
    }

    async ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState) {
        try {
            const url = apiUrl.setetatprospect(uuidProspectToUpdate); // Utilisation de setetatprospect pour obtenir l'URL
            const response = await axios.post(url, { etat: nouveauStatut });
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de l\'état du prospect:', error);
        }
    }

    async storeClient(form, entrepriseId, userId, numeroClient) {
        const uuid = uuidv4();

        const newClientData =  {
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
            const updatedClients = await axios.post(apiUrl.postclient, newClientData, { headers: this.headers });
            return updatedClients;
        } catch (error) {
            console.error("Erreur lors de l'ajout du client:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async updateClient(){
        const response = await axios.patch(`/api/auth/updateClient/${this.clientoedit.id_client}`, {
            //     civilite: this.clientoedit.civilite,
            //     nom_client: this.clientoedit.nom_client,
            //     postal_client: this.clientoedit.postal_client,
            //     adresse_client: this.clientoedit.adresse_client,
            //     tel_client: this.clientoedit.tel_client,
            //     profession_client: this.clientoedit.profession_client,
            //     fax_client: this.clientoedit.fax_client,
            //     email_client: this.clientoedit.email_client,
            //     id_entreprise: entrepriseId,
              });
    }
}

export default new OnlineService();
