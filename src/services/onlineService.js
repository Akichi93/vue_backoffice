import { v4 as uuidv4 } from 'uuid';
import AppStorage from "../db/AppStorage.js";
import { apiUrl } from '../utils/constants/apiUrl.js';
import AxiosService from './AxiosService.js'; // Importer AxiosService
import axios, { Axios } from 'axios';

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


    async getAdresses() {
        try {
            const response = await axios.get(apiUrl.getlocalisation);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getProfession() {
        try {
            const response = await axios.get(apiUrl.getprofession);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des professions:", error);
            return { success: false, error: "Erreur lors de la récupération des professions" };
        }
    }

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

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateBranche(branchetoedit, uuidBrancheToUpdate) {
        try {
            const nouvellesInfos = {
                nom_branche: branchetoedit.nom_branche,
                sync: 1,
            };
            const response = axios.post(apiUrl.setupdatebranche(uuidBrancheToUpdate), nouvellesInfos)
            return response;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la branche:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async deleteBranche(uuidBrancheToUpdate) {
        try {
            const nouvellesInfos = {
                supprimer_branche: 0,
            };
            const response = axios.post(apiUrl.setdeletebranche(uuidBrancheToUpdate), nouvellesInfos)
            return response;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la branche:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getProspects() {
        try {
            const response = await AxiosService.get(apiUrl.getprospect);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getProspectByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.seteditprospect(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la recupération:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async storeProspect(formData, userId, entrepriseId) {
        const uuid = uuidv4();

        const newProspectData = {
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
        };

        try {
            await axios.post(apiUrl.postprospect, newProspectData);
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors du stockage du prospect :", error);
            throw new Error("Échec du stockage du prospect");
        }
    }

    async updateProspect(prospectoedit, uuidProspectToUpdate) {

        try {
            const nouvellesInfos = {
                civilite: prospectoedit.civilite,
                nom_prospect: prospectoedit.nom_prospect,
                postal_prospect: prospectoedit.postal_prospect,
                adresse_prospect: prospectoedit.adresse_prospect,
                tel_prospect: prospectoedit.tel_prospect,
                profession_prospect: prospectoedit.profession_prospect,
                email_prospect: prospectoedit.email_prospect,
                fax_prospect: prospectoedit.fax_prospect,
                etat: prospectoedit.statut,
                sync: 0,
            };
            const response = AxiosService.post(apiUrl.setupdateprospect(uuidProspectToUpdate), nouvellesInfos)
            return response;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du prospect:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }

    }

    async changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient) {
        try {
            const nouvellesInfos = {
                civilite: prospectoedit.civilite,
                nom_prospect: prospectoedit.nom_prospect,
                email_prospect: prospectoedit.email_prospect,
                tel_prospect: prospectoedit.tel_prospect,
                postal_prospect: prospectoedit.postal_prospect,
                adresse_prospect: prospectoedit.adresse_prospect,
                fax_prospect: prospectoedit.fax_prospect,
                profession_prospect: prospectoedit.profession_prospect,
                id_entreprise: entrepriseId,
                id: userId,
                uuidProspect: uuidProspectToUpdate,
                numero_client: numeroClient,
                etat: newState
            };

            const response = AxiosService.post(apiUrl.validateprospect, nouvellesInfos)
            return response;
        } catch (error) {
            console.error("Erreur lors de la validation du prospect:", error);
            return { success: false, error: "Erreur ors de la validation du prospect" };
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

    async deleteProspect(uuidProspectToUpdate, newDelete, newSyncState) {
        try {
            const nouvellesInfos = {
                supprimer_branche: newDelete,
            };
            const response = axios.post(apiUrl.setdeleteprospect(uuidProspectToUpdate), nouvellesInfos)
            return response;
        } catch (error) {
            console.error("Erreur lors de la suppression du prospect:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getNameProspectParUUID(uuidProspect) {
        try {
            const response = await axios.get(apiUrl.setnameprospect(uuidProspect));

            return response.data.nom_prospect;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getDifferenceOfBranches(uuidProspect) {
        try {
            const response = await AxiosService.get(apiUrl.setbranchediffprospect(uuidProspect));

            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getBrancheProspectsByuuidProspect(uuidProspect) {
        try {
            const response = await axios.get(apiUrl.setbrancheprospect(uuidProspect));

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async addProspectBranche(form, userId, entrepriseId, uuidProspect) {
        const uuid = uuidv4();

        const newprospectbrancheData = {
            uuidProspectBranche: uuid,
            uuidProspect: uuidProspect,
            uuidBranche: form.branche_id,
            description: form.description,
            id: userId,
            id_entreprise: entrepriseId,
        };

        try {
            await AxiosService.post(apiUrl.postbrancheprospect, newprospectbrancheData);
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }

    }

    // Clients

    async getClients() {
        try {
            const response = await AxiosService.get(apiUrl.getclient);

            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des clients:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
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

    async getClientByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.seteditclient(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateClient(clientoedit, uuidClientToUpdate) {
        try {

            const nouvellesInfos = {
                civilite: clientoedit.civilite,
                nom_client: clientoedit.nom_client,
                postal_client: clientoedit.postal_client,
                adresse_client: clientoedit.adresse_client,
                tel_client: clientoedit.tel_client,
                profession_client: clientoedit.profession_client,
                email_client: clientoedit.email_client,
                fax_client: clientoedit.fax_client,
                sync: 1,
            };

            const response = await axios.post(apiUrl.setupdateclient(uuidClientToUpdate), nouvellesInfos); // Utiliser AxiosService
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    // Apporteurs

    async getApporteurs() {
        try {
            const response = await AxiosService.get(apiUrl.getapporteur);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getApporteurByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.seteditapporteur(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas) {
        const uuid = uuidv4();

        const newApporteurData =
        {
            nom_apporteur: form.nom_apporteur,
            contact_apporteur: form.contact_apporteur,
            email_apporteur: form.email_apporteur,
            adresse_apporteur: form.adresse_apporteur,
            code_postal: form.code_postal,
            sync: 0,
            id_entreprise: entrepriseId,
            id: userId,
            uuidApporteur: uuid,
            code_apporteur: codeApporteur,
            supprimer_apporteur: 0,
            unique: unique,
            accidents: donnees,
            ids: datas,
        };


        try {
            await axios.post(apiUrl.postapporteur, newApporteurData);
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors du stockage du prospect :", error);
            throw new Error("Échec du stockage du prospect");
        }


    }

    async updateApporteur(apporteurtoedit, uuidApporteurToUpdate) {

        const nouvellesInfos = {
            nom_apporteur: apporteurtoedit.nom_apporteur,
            adresse_apporteur: apporteurtoedit.adresse_apporteur,
            email_apporteur: apporteurtoedit.email_apporteur,
            postal_compagnie: apporteurtoedit.postal_compagnie,
            contact_compagnie: apporteurtoedit.contact_compagnie,
            postal_compagnie: apporteurtoedit.postal_compagnie,
            sync: 1,
        };

        try {
            const response = await axios.post(apiUrl.setupdateapporteur(uuidApporteurToUpdate), nouvellesInfos);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }


    }

    async getTauxApporteurs(uuid) {
        try {
            const response = AxiosService.get(apiUrl.settauxapporteur(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getNameApporteur(uuid) {
        try {
            const response = axios.get(apiUrl.setnamepporteur(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getTauxApporteurByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.setedittauxapporteur(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState, uuidApporteur) {

        const nouvellesInfos = {
            taux: newTaux,
            uuidApporteur: uuidApporteur,

        };
        try {
            const response = await axios.post(apiUrl.setupdatetauxapporteur(uuidTauxApporteurUpdate), nouvellesInfos);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getAvenantByUuid(uuidAvenant) {
        try {
            const response = await AxiosService.get(apiUrl.setavenantbyuuid(uuidAvenant));
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getInfoApporteur(uuid) {
        try {
            const response = await axios.get(apiUrl.setinfoapporteur(uuid));
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getSommeCommissionsApporteur(uuid) {
        try {
            const response = await axios.get(apiUrl.setsommecommissionapporteur(uuid));
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getSommeCommissionsApporteurPayer(uuid) {
        try {
            const response = await axios.get(apiUrl.setsommecommissionsapporteurpayer(uuid));
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }


}

export default new OnlineService();
