import { v4 as uuidv4 } from 'uuid';
import AppStorage from "../db/AppStorage.js";
class OfflineService {

    async getAdresses() {
        return await AppStorage.getLocalisations();
    }

    async getBranches() {
        return await AppStorage.getBranches();
    }

    async storeBranche(nomBranche, entrepriseId) {
        const uuid = uuidv4();

        // Créer l'objet de la nouvelle branche
        const newBrancheData = [{
            uuidBranche: uuid,
            nom_branche: nomBranche,
            id_entreprise: entrepriseId,
            sync: 0,
        }];

        try {
            // Ajouter la nouvelle branche dans IndexedDB
            await AppStorage.storeDataInIndexedDB("branches", newBrancheData);
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors de l'ajout de la branche dans IndexedDB:", error);
            return { success: false, error: "Erreur lors de l'ajout de la branche" };
        }

    }

    async getBrancheByUuid(uuid) {
        try {
            return await AppStorage.getBrancheByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateBranche() {

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
            etat: 0, // Il semble que vous ayez un état durci à 0, adaptez-le selon vos besoins
            statut: formData.etat,
            id_entreprise: entrepriseId,
            id: userId,
            uuidProspect: uuid,
            sync: 0,
            supprimer_prospect: 0,
        }];

        try {
            await AppStorage.storeDataInIndexedDB("prospects", newProspectData);
            // return true; // Succès
            return { success: true, uuid };
        } catch (error) {
            console.error("Erreur lors du stockage du prospect :", error);
            throw new Error("Échec du stockage du prospect");
        }
    }

    async ChangeEtat(uuidProspectToUpdate, nouveauStatut, nouveauSyncState) {
        try {
            await AppStorage.updateProspectChange(uuidProspectToUpdate, nouveauStatut, nouveauSyncState);

            const updatedProspects = await AppStorage.getProspects();
            // return { success: true };
            return updatedProspects;
        } catch (error) {
            console.error("Erreur lors du changement d'état :", error);
            throw new Error("Échec du changement d'état");
        }
    }

    async updateProspect(prospectoedit, uuidProspectToUpdate) {
        const nouvellesInfos = {
            civilite: prospectoedit.civilite,
            nom_prospect: prospectoedit.nom_prospect,
            postal_prospect: prospectoedit.postal_prospect,
            adresse_prospect: prospectoedit.adresse_prospect,
            tel_prospect: prospectoedit.tel_prospect,
            profession_prospect: prospectoedit.profession_prospect,
            email_prospect: prospectoedit.email_prospect,
            fax_prospect: prospectoedit.fax_prospect,
            etat: prospectoedit.etat,
            sync: 0,
        };


        await AppStorage.updateProspect(uuidProspectToUpdate, nouvellesInfos);

        const updatedProspects = await AppStorage.getProspects();

        return updatedProspects;
    }

    async changeProspect(uuidProspectToUpdate, newState, newSyncState, prospectoedit, entrepriseId, userId, numeroClient) {
        const uuid = uuidv4();

        await AppStorage.updateProspectEtat(uuidProspectToUpdate, newState, newSyncState);


        const updatedProspects = await AppStorage.getProspects();

        //Inserer le client
        const newClientData = [{
            civilite: prospectoedit.civilite,
            nom_client: prospectoedit.nom_prospect,
            postal_client: prospectoedit.postal_prospect,
            adresse_client: prospectoedit.adresse_prospect,
            tel_client: prospectoedit.tel_prospect,
            profession_client: prospectoedit.profession_prospect,
            fax_client: prospectoedit.fax_prospect,
            email_client: prospectoedit.email_prospect,
            sync: 0,
            uuidClient: uuid,
            id_entreprise: entrepriseId,
            user_id: userId,
            numero_client: numeroClient,
            supprimer_client: 0,
        }];

        await AppStorage.storeDataInIndexedDB("clients", newClientData);

        return updatedProspects;
    }

    async deleteProspect(uuidProspectToUpdate, newDelete, newSyncState) {
        try {
            await AppStorage.updateProspectDelete(uuidProspectToUpdate, newDelete, newSyncState);

            return { success: true };
        } catch (error) {
            console.error("Erreur lors du changement d'état :", error);
            throw new Error("Échec du changement d'état");
        }
    }

    async addProspectBranche(form, userId, entrepriseId, uuidProspect) {
        const uuid = uuidv4();

        const newBrancheProspectData = [
            {
                uuidBrancheProspect: uuid,
                uuidBranche: form.branche_id,
                description: form.description,
                id_entreprise: entrepriseId,
                id: userId,
                uuidProspect: uuidProspect,
                sync: 0,
            },
        ];

        await AppStorage.storeDataInIndexedDB(
            "brancheprospects",
            newBrancheProspectData
        );

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedBrancheProspects = await AppStorage.getBrancheProspectsByuuidProspect(uuidProspect);

        return updatedBrancheProspects;

    }

    async getProspects() {
        return await AppStorage.getProspects();
    }

    async getProspectByUuid(uuid) {
        try {
            return await AppStorage.getProspectByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchProspectsByName(name) {
        try {
            return await AppStorage.searchProspectsByName(name);
        } catch (error) {
            throw new Error(error);
        }
    }

    async storeClient(form, entrepriseId, userId, numeroClient) {
        const uuid = uuidv4();

        const newClientData = [{
            civilite: form.civilite,
            nom_client: form.nom_client,
            postal_client: form.postal_client,
            adresse_client: form.adresse_client,
            tel_client: form.tel_client,
            profession_client: form.profession_client,
            fax_client: form.fax_client,
            email_client: form.email_client,
            sync: 0,
            uuidClient: uuid,
            id_entreprise: entrepriseId,
            user_id: userId,
            numero_client: numeroClient,
            supprimer_client: 0,
        }];

        await AppStorage.storeDataInIndexedDB("clients", newClientData);
        const updatedClients = await AppStorage.getClients();

        return updatedClients;
    }

    async updateClient(clientoedit, uuidClientToUpdate) {

        const nouvellesInfos = {
            civilite: clientoedit.civilite,
            nom_client: clientoedit.nom_client,
            postal_client: clientoedit.postal_client,
            adresse_client: clientoedit.adresse_client,
            tel_client: clientoedit.tel_client,
            profession_client: clientoedit.profession_client,
            email_client: clientoedit.email_client,
            fax_client: clientoedit.fax_client,
            sync: 0,
        };

        await AppStorage.updateClient(uuidClientToUpdate, nouvellesInfos);

        const updatedClients = await AppStorage.getClients();

        return updatedClients;

    }

    async getClients() {
        return await AppStorage.getClients();
    }

    async getClientByUuid(uuid) {
        try {
            return await AppStorage.getClientByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchClientsByName(name) {
        try {
            return await AppStorage.searchClientsByName(name);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getApporteurs() {
        return await AppStorage.getApporteurs();
    }

    async getApporteurByUuid(uuid) {
        try {
            return await AppStorage.getApporteurByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async storeApporteur(form, userId, entrepriseId, codeApporteur, unique, donnees, datas) {
        const uuid = uuidv4();
        if (unique) {
            // let donnees = this.extractValues(this.branches);
            // let datas = this.extractUuidBranches(this.branches);

            const newApporteurData = [
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
                },
            ];

            await AppStorage.storeDataInIndexedDB("apporteurs", newApporteurData);

            const branchesMap = await AppStorage.getBranches();

            // Convertir l'objet en tableau de paires clé-valeur
            const entries = Object.entries(branchesMap);

            for (const [key, value] of entries) {
                // Générer un UUID unique pour uuidTauxcompagnie
                const uuidTauxcompagnie = uuidv4();

                let newTauxApporteur = [
                    {
                        uuidTauxApporteur: uuidTauxcompagnie,
                        uuidApporteur: uuid,
                        sync: 0,
                        taux: this.unique,
                        nom_branche: value.nom_branche,
                        id_entreprise: entrepriseId,
                        uuidBranche: value.uuidBranche,
                    },
                ];

                await AppStorage.storeDataInIndexedDB(
                    "tauxapporteurs",
                    newTauxApporteur
                );
            }
            return { success: true, uuid };

        } else {
            const newApporteurData = [
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
                },
            ];

            await AppStorage.storeDataInIndexedDB("apporteurs", newApporteurData);

            const branchesMap = await AppStorage.getBranches();
            for (let i = 0; i < datas.length; i++) {
                // const nom_branche = branchesMap[datas[i]];
                const dataItem = datas[i];

                const branch = branchesMap.find(
                    (branch) => branch.uuidBranche === dataItem
                );
                const nom_branche = branch.nom_branche;
                // Générer un UUID unique pour uuidTauxcompagnie
                const uuidTauxcompagnie = uuidv4();

                let newTauxApporteur = [
                    {
                        uuidTauxApporteur: uuidTauxcompagnie,
                        uuidApporteur: uuid,
                        sync: 0,
                        taux: donnees[i],
                        nom_branche: nom_branche,
                        id_entreprise: entrepriseId,
                        uuidBranche: datas[i],
                    },
                ];

                await AppStorage.storeDataInIndexedDB(
                    "tauxapporteurs",
                    newTauxApporteur
                );

                return { success: true, uuid };
            }


        }
    }

    async searchApporteursByName(name) {
        try {
            return await AppStorage.searchApporteursByName(name);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTauxApporteurs(uuid) {
        try {
            return await AppStorage.getTauxApporteursByIdApporteur(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getNameApporteur(uuid) {
        try {
            return await AppStorage.getApporteurNameByUUID(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTauxApporteurByUuid(uuid) {
        try {
            return await AppStorage.getTauxApporteurById(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchTauxApporteurByNomBranche(name, uuid) {
        try {
            return await AppStorage.searchTauxApporteurByNomBranche(name, uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTauxApporteur(uuidTauxApporteurUpdate, newTaux, newSyncState) {
        await AppStorage.updateTauxApporteurByUuid(uuidTauxApporteurUpdate, newTaux, newSyncState);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedTauxApporteurs = await AppStorage.getTauxApporteursByIdApporteur(uuidTauxApporteurUpdate);

        return updatedTauxApporteurs;
    }

    async updateApporteur(apporteurtoedit,uuidApporteurToUpdate) {

        const nouvellesInfos = {
            nom_apporteur: apporteurtoedit.nom_apporteur,
            adresse_apporteur: apporteurtoedit.adresse_apporteur,
            email_apporteur: apporteurtoedit.email_apporteur,
            postal_compagnie: apporteurtoedit.postal_compagnie,
            contact_compagnie: apporteurtoedit.contact_compagnie,
            postal_compagnie: apporteurtoedit.postal_compagnie,
            sync: 0,
        };



        await AppStorage.updateApporteur(uuidApporteurToUpdate, nouvellesInfos);

        const updatedApporteurs = await AppStorage.getApporteurs();

        return updatedApporteurs;
    }

    async getInfoApporteur(uuid){
        try {
            return await AppStorage.getAvenantsByUUIDApporteur(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSommeCommissionsApporteur(uuid){
        try {
            return await AppStorage.getSommeCommissionsApporteur(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAdresse(){
        return await AppStorage.getLocalisations();
    }

    async getProfession(){
        return await AppStorage.getProfessions();
    }

    async getCompagnies() {
        return await AppStorage.getCompagnies();
    }

    async getCompagnieByUuid(uuid) {
        try {
            return await AppStorage.getCompagnieByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchCompagniesByName(name) {
        try {
            return await AppStorage.searchCompagniesByName(name);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTauxCompagnies(uuid) {
        try {
            return await AppStorage.getTauxCompagniesByIdCompagnie(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getNameCompagnie(uuid) {
        try {
            return await AppStorage.getCompagnieNameByUUID(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTauxCompagnieByUuid(uuid) {
        try {
            return await AppStorage.getTauxCompagnieById(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchTauxCompagnieByNomBranche(name, uuid) {
        try {
            return await AppStorage.searchTauxCompagnieByNomBranche(name, uuid);
        } catch (error) {
            throw new Error(error);
        }
    }
}

// export default OfflineService;
export default new OfflineService();