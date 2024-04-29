import { v4 as uuidv4 } from 'uuid';
import AppStorage from "../db/AppStorage.js";
class OfflineService {


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

    // async verifProspect(nomProspect, telProspect, entrepriseId) {
    //     try {
    //         const { valide } = await AppStorage.prospectExists(nomProspect, telProspect, entrepriseId);

    //         return { valide };

    //     } catch (error) {
    //         console.error("Erreur lors de la vérification de l'existence du prospect :", error);
    //         return { valide: false, error: "Erreur lors de la vérification de l'existence du prospect" };
    //     }
    // }

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

}

// export default OfflineService;
export default new OfflineService();