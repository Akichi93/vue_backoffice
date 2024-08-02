import { v4 as uuidv4 } from 'uuid';
import { apiUrl } from '../utils/constants/apiUrl.js';
import AxiosService from './AxiosService.js'; // Importer AxiosService
import axios, { Axios } from 'axios';
import { successResponse, errorResponse } from '../utils/helpers/responseHelper.js';
import LocalStorage from '../db/LocalStorage.js';
import { jsonToArray } from '../utils/helpers/jsonToArray.js';

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

    async getRole() {
        try {
            const response = await axios.get(apiUrl.getrole);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }


    async getAdresses() {
        try {
            const response = await axios.get(apiUrl.getlocalisation);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeAdresse(adresse) {
        const uuid = uuidv4();

        const newLocalisationData = {
            uuidLocalisation: uuid,
            nom_ville: adresse,
        };

        try {
            const response = await axios.post(apiUrl.postlocalisation, newLocalisationData);

            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getMarque() {
        try {
            const response = await axios.get(apiUrl.getmarque);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeMarque(marque) {
        const uuid = uuidv4();

        const newMarqueData = {
            uuidMarque: uuid,
            marque: marque,
        };

        try {
            const response = await axios.post(apiUrl.postmarque, newMarqueData);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout du genre:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getGenre() {
        try {
            const response = await axios.get(apiUrl.getgenre);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeGenre(genre) {
        const uuid = uuidv4();

        const newGenreData = {
            uuidGenre: uuid,
            genre: genre
        };

        try {
            const response = await axios.post(apiUrl.postgenre, newGenreData);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout du genre:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getCategorie() {
        try {
            const response = await axios.get(apiUrl.getcategorie);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeCategorie(categorie) {
        const uuid = uuidv4();


        const newCategorieData = {
            uuidCategorie: uuid,
            categorie: categorie,
        };

        try {
            const response = await axios.post(apiUrl.postcategorie, newCategorieData);

            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getCouleur() {
        try {
            const response = await axios.get(apiUrl.getcouleur);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des couleurs:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeCouleur(categorie) {
        const uuid = uuidv4();

        const newCouleurData = {
            uuidCouleur: uuid,
            couleur: categorie,
        };

        try {
            const response = await axios.post(apiUrl.postcouleur, newCouleurData);

            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getEnergie() {
        try {
            const response = await axios.get(apiUrl.getenergie);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des energies:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeEnergie(energie) {
        const uuid = uuidv4();

        const newEnergieData = {
            uuidEnergie: uuid,
            energie: energie,
        };

        try {
            const response = await axios.post(apiUrl.postenergie, newEnergieData);

            return response;
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


    //Prospects
    async getProspects() {
        try {
            const response = await AxiosService.get(apiUrl.getprospect);

            const data = response.data.data;

            return successResponse(data, response.data);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async getProspectByUuid(uuidProspect) {
        try {
            const response = await axios.get(apiUrl.seteditprospect(uuidProspect));

            return successResponse(response.data, response.data.message);

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
            const response = await AxiosService.post(apiUrl.postprospect, newProspectData);

            if (response.data && response.data.token) {
                LocalStorage.storeToken(response.data.token)
            }

            return successResponse(response.data.data, response.data.message);
        } catch (error) {
            return errorResponse(error)
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
            };
            const response = await AxiosService.post(apiUrl.setupdateprospect(uuidProspectToUpdate), nouvellesInfos);

            if (response.data && response.data.token) {
                LocalStorage.storeToken(response.data.token)
            }
            return successResponse(response.data, response.data.message);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du prospect:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }

    }

    async changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient) {
        const uuid = uuidv4();
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
                numero_client: numeroClient,
                etat: newState,
                uuidClient: uuid,
            };

            const response = await AxiosService.post(apiUrl.setvalidateprospect(uuidProspectToUpdate), nouvellesInfos)

            if (response.data && response.data.token) {
                LocalStorage.storeToken(response.data.token)
            }
            return successResponse(response.data, response.data.message);
        } catch (error) {
            console.error("Erreur lors de la validation du prospect:", error);
            return { success: false, error: "Erreur ors de la validation du prospect" };
        }
    }

    async ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState) {
        const nouvellesInfos = {
            statut: nouveauStatut,
        };
        try {
            const response = await AxiosService.post(apiUrl.setetatprospect(uuidProspectToUpdate), nouvellesInfos);
            const token = response.data.token;
            localStorage.setItem("token", token);
            return response;
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de l\'état du prospect:', error);
        }
    }

    async deleteProspect(uuidProspectToUpdate, newDelete, newSyncState) {
        try {
            const nouvellesInfos = {
                supprimer_prospect: newDelete,
            };
            const response = AxiosService.post(apiUrl.setdeleteprospect(uuidProspectToUpdate), nouvellesInfos)
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

            const data = response.data;

            return successResponse(data, response.data);
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
            const response = await axios.get(apiUrl.seteditclient(uuid))
            return successResponse(response.data.data, response.data.message);

        } catch (error) {
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

            const response = await AxiosService.post(apiUrl.setupdateclient(uuidClientToUpdate), nouvellesInfos); // Utiliser AxiosService
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

    // Compagnies
    async storeCompagnie(form, userId, entrepriseId, unique, donnees, datas) {
        const uuid = uuidv4();

        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, "0");
        let day = today.getDate().toString().padStart(2, "0");
        let dateDuJour = `${year}${month}${day}`;

        // Get the first two characters of the company name
        let nom = form.nom_compagnie;
        let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase();
        let codeCompagnie = `CO-${deuxPremiersCaracteres}${dateDuJour}`;

        const newCompagnieData =
        {
            nom_compagnie: form.nom_compagnie,
            adresse_compagnie: form.adresse_compagnie,
            email_compagnie: form.email_compagnie,
            postal_compagnie: form.postal_compagnie,
            contact_compagnie: form.contact_compagnie,
            sync: 0,
            id_entreprise: entrepriseId,
            id: userId,
            uuidCompagnie: uuid,
            code_compagnie: codeCompagnie,
            supprimer_compagnie: 0,
            unique: unique,
            accidents: donnees,
            ids: datas,
        };

        try {
            await axios.post(apiUrl.postcompagnie, newCompagnieData);
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors du stockage du prospect :", error);
            throw new Error("Échec du stockage du prospect");
        }
    }

    async getCompagnies() {
        try {
            const response = await AxiosService.get(apiUrl.getcompagnie);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async searchCompagniesByName(name) {
        try {
            const response = await AxiosService.get(apiUrl.getcompagniesearch(name));
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getCompagnieByUuid(uuid) {
        try {
            const response = await axios.get(apiUrl.seteditcompagnie(uuid));
            return response;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async updateCompagnie(compagnietoedit, uuidCompagnieToUpdate, entrepriseId) {
        const nouvellesInfos = {
            nom_compagnie: compagnietoedit.nom_apporteur,
            adresse_compagnie: compagnietoedit.adresse_compagnie,
            email_compagnie: compagnietoedit.email_compagnie,
            postal_compagnie: compagnietoedit.postal_compagnie,
            contact_compagnie: compagnietoedit.contact_compagnie,
            id_entreprise: entrepriseId,
        };

        try {
            const response = await axios.post(apiUrl.setupdatecompagnie(uuidCompagnieToUpdate), nouvellesInfos);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getTauxCompagnies(uuid) {
        try {
            const response = AxiosService.get(apiUrl.settauxcompagnie(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getNameCompagnie(uuid) {
        try {
            const response = axios.get(apiUrl.setnamecompagnie(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération du nom de la compagnie:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getTauxCompagnieByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.setedittauxcompagnie(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    // Contrats

    async getContrats() {
        try {
            const response = AxiosService.get(apiUrl.getcontrat)
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des contrats:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getContratByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.seteditcontrat(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des contrats:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getContratByUuidClient(uuid){
        
    }

    async getInfoContratByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.setinfocontrat(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des contrats:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getAvenantsSommeByUuid(uuid) {
        try {
            const response = axios.get(apiUrl.setinfoavenantcontrat(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des contrats:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getAvenantsByUuidContrat(uuid) {
        try {
            const response = axios.get(apiUrl.setavenantcontrat(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des contrats:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getAutomobileByUuidContrat(uuid) {
        try {
            const response = axios.get(apiUrl.setinfovehicule(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des contrats:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc, codeAvenant) {
        const uuid = uuidv4();

        const uuidAutomobile = uuidv4();
        const uuidAvenant = uuidv4();

        const newContratData =
        {
            id: userId,
            uuidContrat: uuid,
            id_entreprise: entrepriseId,
            uuidBranche: form.branche_id.uuidBranche,
            nom_branche: form.branche_id.nom_branche,
            uuidClient: form.client_id,
            uuidCompagnie: form.compagnie_id,
            uuidApporteur: form.apporteur_id,
            numero_police: form.numero_police,
            effet_police: form.effet_police,
            heure_police: form.heure_police,
            expire_le: form.expire_le,
            souscrit_le: form.souscrit_le,
            reconduction: form.reconduction,
            prime_nette: form.primes_nette,
            accessoires: form.accessoires,
            frais_courtier: form.frais_courtier,
            cfga: this.cfga,
            taxes_totales: form.taxes_totales,
            commission_courtier: commission_courtier,
            commission_apporteur: commission_apporteur,
            gestion: this.gestion,
            primes_ttc: totalPrimeTtc,
            code_avenant: codeAvenant,
            sync: 0,
            solde: 0,
            reverse: 0,
            supprimer_contrat: 0,
            uuidAutomobile: uuidAutomobile,
            uuidAvenant: uuidAvenant,
            numero_immatriculation: form.numero_immatriculation,
            date_circulation: this.date_circulation,
            identification_proprietaire: this.identification_proprietaire,
            adresse_proprietaire: this.adresse_proprietaire,
            zone: this.zone,
            categorie: this.categorie_id,
            marque: this.marque_id,
            genre: this.genre_id,
            type: this.type,
            carosserie: this.carosserie,
            couleur: this.couleur_id,
            energie: this.energie_id,
            place: this.place,
            puissance: this.puissance,
            charge: this.charge,
            valeur_neuf: this.valeur_neuf,
            valeur_venale: this.valeur_venale,
            categorie_socio_pro: this.categorie_socio_pro,
            permis: this.permis,
            entree: this.entree_le,
            tierce: this.tierce,

        };

        try {
            const response = await axios.post(apiUrl.postcontrat, newContratData);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getTauxParIdBrancheEtCompagnie(id_branche, option) {
        const nouvellesInfos = {
            branche: id_branche,
            compagnie: option,
        };
        try {
            const response = await axios.get(apiUrl.gettauxbranchecompagnie, { params: nouvellesInfos });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération du taux pour la branche et la compagnie:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getTauxParIdBrancheEtApporteur(id_branche, optional) {
        const nouvellesInfos = {
            branche: id_branche,
            apporteur: optional,
        };
        try {
            const response = await axios.get(apiUrl.gettauxbrancheapporteur, { params: nouvellesInfos });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération du taux pour la branche et la compagnie:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async storeAutomobile(form, userId, entrepriseId, uuidAutomobile, uuidContrat, contrat) {

        const newAutomobileData =
        {
            uuidAutomobile: uuidAutomobile,
            uuidContrat: uuidContrat,
            numero_immatriculation: form.numero_immatriculation,
            date_circulation: this.date_circulation,
            identification_proprietaire: form.identification_proprietaire,
            adresse_proprietaire: form.adresse_proprietaire,
            zone: form.zone,
            categorie: form.categorie_id,
            marque: form.marque_id,
            genre_id: form.genre_id,
            type: form.type,
            carosserie: form.carosserie,
            couleur: form.couleur_id,
            energie: form.energie_id,
            place: form.place,
            puissance: form.puissance,
            charge: form.charge,
            valeur_neuf: form.valeur_neuf,
            valeur_venale: form.valeur_venale,
            categorie_socio_pro: form.categorie_socio_pro,
            permis: form.permis,
            option: form.option_garantie,
            entree: form.entree_le,
            tierce: this.tierce,
            prime_nette: contrat.prime_nette,
            accessoires: contrat.prime_nette,
            frais_courtier: contrat.frais_courtier,
            cfga: contrat.cfga,
            taxes_totales: contrat.taxes_totales,
            commission_courtier: contrat.commission_courtier,
            commission_apporteur: contrat.commission_apporteur,
            gestion: contrat.gestion,
            primes_ttc: contrat.primes_ttc,
            sync: 0,
            supprimer_automobile: 0,
            id_entreprise: entrepriseId,
            type_garanties: typegaranties
        };

        try {
            const response = await axios.post(apiUrl.postautomobile, newAutomobileData);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du client:", error);
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }

    async getAvenantsByUuidContrat(uuid) {
        try {
            const response = axios.get(apiUrl.setinfoavenant(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des avenants par uuid:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getFactures(uuid) {
        try {
            const response = axios.get(apiUrl.setfactureavenant(uuid))
            return response;

        } catch (error) {
            console.error("Erreur lors de la récupération des avenants par uuid:", error);
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getUser() {
        try {
            const response = await AxiosService.get(apiUrl.getuser);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }

    async storeUser(user) {
        try {
            const userData = {
                name: user.name,
                email: user.email,
                password: user.password,
                contact: user.contact,
                id_role: user.poste,
                id_entreprise: localStorage.getItem("entreprise"),
            };

            const response = await AxiosService.post(apiUrl.postuser, user);

            return response;
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un utilisateur:", error);
            return { success: false, error: "Erreur lors de l'ajout d'un utilisateur" };
        }
    }

    async validateToken() {
        try {
            const response = await AxiosService.get(apiUrl.validatetoken);

            return response;
        } catch (error) {
            console.error("Erreur lors de la récupération des adresses:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }
    }







}

export default new OnlineService();
