import { v4 as uuidv4 } from 'uuid';
import AppStorage from "../db/AppStorage.js";
class OfflineService {

    //Form
    async getAdresses() {
        return await AppStorage.getLocalisations();
    }

    async storeAdresse(adresse) {
        const uuid = uuidv4();

        const adresses = adresse.toLocaleUpperCase()

        const newLocalisationData = [{
            uuidLocalisation: uuid,
            nom_ville: adresses,
            sync: 0,
        }];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("localisations", newLocalisationData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedLocalisations = await AppStorage.getLocalisations();

        return updatedLocalisations;
    }

    async getBranches() {
        return await AppStorage.getBranches();
    }

    async getProfession() {
        return await AppStorage.getProfessions();
    }

    async getMarque() {
        return await AppStorage.getMarques();
    }

    async storeMarque(marque) {
        const uuid = uuidv4();

        const marques = marque.toLocaleUpperCase()

        const newMarqueData = [{
            uuidMarque: uuid,
            marque: marques,
            sync: 0,
        }];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("marques", newMarqueData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedMarques = await AppStorage.getMarques();

        return updatedMarques;
    }

    async getGenre() {
        return await AppStorage.getGenres();
    }

    async storeGenre(genre) {
        const uuid = uuidv4();

        const genres = genre.toLocaleUpperCase()

        const newGenreData = [{
            uuidGenre: uuid,
            genre: genres,
            sync: 0,
        }];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("genres", newGenreData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedGenres = await AppStorage.getMarques();

        return updatedGenres;
    }

    async getCategorie() {
        return await AppStorage.getCategories();
    }

    async storeCategorie(categorie) {
        const uuid = uuidv4();

        const categories = categorie.toLocaleUpperCase()

        const newCategorieData = [{
            uuidCategorie: uuid,
            categorie: categories,
            sync: 0,
        }];


        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("categories", newCategorieData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedCategories = await AppStorage.getCategories();

        return updatedCategories;
    }

    async getCouleur() {
        return await AppStorage.getCouleurs();
    }

    async storeCouleur(couleur) {
        const uuid = uuidv4();

        const couleurs = couleur.toLocaleUpperCase()

        const newCouleurData = [{
            uuidCouleur: uuid,
            couleur: couleurs,
        }];


        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("couleurs", newCouleurData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedCouleurs = await AppStorage.getCouleurs();

        return updatedCouleurs;
    }

    async getEnergie() {
        return await AppStorage.getEnergies();
    }

    async storeEnergie(energie) {
        const uuid = uuidv4();

        const energies = energie.toLocaleUpperCase()

        const newEnergieData = [{
            uuidEnergie: uuid,
            energie: energies,
            sync: 0,
        }];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("energies", newEnergieData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedEnergies = await AppStorage.getEnergies();

        return updatedEnergies;
    }

    //Branche
    async storeBranche(nomBranche, entrepriseId) {
        const uuid = uuidv4();

        // Créer l'objet de la nouvelle branche
        const newBrancheData = [{
            uuidBranche: uuid,
            nom_branche: nomBranche,
            id_entreprise: entrepriseId,
            supprimer_branche: 0,
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

    async updateBranche(branchetoedit, uuidBrancheToUpdate) {

        const nouvellesInfos = {
            nom_branche: branchetoedit.nom_branche,
            sync: 0,
        };

        await AppStorage.updateBranche(uuidBrancheToUpdate, nouvellesInfos);

        const updatedBranches = await AppStorage.getBranches();

        return updatedBranches;
    }

    async deleteBranche() {

    }

    // Prospect

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

    async getNameProspectParUUID(uuidProspect) {
        return await AppStorage.getNameProspectParUUID(uuidProspect);
    }

    async getDifferenceOfBranches(uuidProspect) {
        return AppStorage.getDifferenceOfBranches(uuidProspect)
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

    async getBrancheProspectsByuuidProspect(uuidProspect) {
        return AppStorage.getBrancheProspectsByuuidProspect(uuidProspect);
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


    // Client

    async getClients() {
        return await AppStorage.getClients();
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
                        taux: unique,
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

    async getAvenantByUuid(uuidAvenant) {
        return await AppStorage.getAvenantByUuid(uuidAvenant);

    }

    async updateApporteur(apporteurtoedit, uuidApporteurToUpdate) {

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

    async getInfoApporteur(uuid) {
        try {
            return await AppStorage.getAvenantsByUUIDApporteur(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSommeCommissionsApporteur(uuid) {
        try {
            return await AppStorage.getSommeCommissionsApporteur(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSommeCommissionsApporteurPayer(uuid) {
        try {
            return await AppStorage.getSommeCommissionsApporteurPayer(uuid);
            // await AppStorage.getSommeCommissionsApporteurPayer(uuidApporteur)
        } catch (error) {
            throw new Error(error);
        }
    }
    // async getAdresse() {
    //     return await AppStorage.getLocalisations();
    // }



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

    async storeCompagnie(form, userId, entrepriseId, unique, donnees, datas) {

        const uuid = uuidv4();
        // Get today's date in YYYYMMDD format
        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, "0");
        let day = today.getDate().toString().padStart(2, "0");
        let dateDuJour = `${year}${month}${day}`;

        // Get the first two characters of the company name
        let nom = form.nom_compagnie;
        let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase();
        let codeCompagnie = `CO-${deuxPremiersCaracteres}${dateDuJour}`;

        const newCompagnieData = [
            {
                nom_compagnie: form.nom_compagnie,
                adresse_compagnie: form.adresse_compagnie,
                email_compagnie: form.email_compagnie,
                postal_compagnie: form.postal_compagnie,
                contact_compagnie: form.contact_compagnie,
                sync: 0,
                id_entreprise: entrepriseId,
                user_id: userId,
                uuidCompagnie: uuid,
                code_compagnie: codeCompagnie,
                supprimer_compagnie: 0,
            },
        ];

        // Add the new data to IndexedDB
        await AppStorage.storeDataInIndexedDB("compagnies", newCompagnieData);

        const branchesMap = await AppStorage.getBranches();
        let tauxCompagnies = [];

        if (unique) {
            for (const [key, value] of Object.entries(branchesMap)) {
                tauxCompagnies.push({
                    uuidTauxCompagnie: uuidv4(),
                    uuidCompagnie: uuid,
                    sync: 0,
                    tauxcomp: unique,
                    nom_branche: value.nom_branche,
                    id_entreprise: entrepriseId,
                    uuidBranche: value.uuidBranche,
                });
            }
        } else {

            for (let i = 0; i < datas.length; i++) {
                const branch = branchesMap.find((b) => b.uuidBranche === datas[i]);
                tauxCompagnies.push({
                    uuidTauxCompagnie: uuidv4(),
                    uuidCompagnie: uuid,
                    sync: 0,
                    tauxcomp: donnees[i],
                    nom_branche: branch.nom_branche,
                    id_entreprise: entrepriseId,
                    uuidBranche: datas[i],
                });
            }
        }

        for (const tauxCompagnie of tauxCompagnies) {
            await AppStorage.storeDataInIndexedDB("tauxcompagnies", [
                tauxCompagnie,
            ]);
        }

    }

    async updateCompagnie(compagnietoedit, uuidCompagnieToUpdate, entrepriseId) {
        const nouvellesInfos = {
            nom_compagnie: compagnietoedit.nom_compagnie,
            adresse_compagnie: compagnietoedit.adresse_compagnie,
            email_compagnie: compagnietoedit.email_compagnie,
            postal_compagnie: compagnietoedit.postal_compagnie,
            contact_compagnie: compagnietoedit.contact_compagnie,
            postal_compagnie: compagnietoedit.postal_compagnie,
            sync: 0,
        };

        await AppStorage.updateCompagnie(uuidCompagnieToUpdate, nouvellesInfos);

        const updatedCompagnies = await AppStorage.getCompagnies();;

        return updatedCompagnies;
    }

    async getContrats() {
        return await AppStorage.getContrats()
    }

    async getContratByUuid(uuid) {
        try {
            return await AppStorage.getContratByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getInfoContratByUuid(uuid) {
        try {
            return await AppStorage.getInfoContratByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAvenantsSommeByUuid(uuid) {
        try {
            return await AppStorage.getAvenantsSommeByUuid(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAvenantsByUuidContrat(uuid) {
        try {
            return await AppStorage.getAvenantsByUuidContrat(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAutomobileByUuidContrat(uuid) {
        try {
            return await AppStorage.getAutomobileByUuidContrat(uuid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async storeContrat(form, userId, entrepriseId, commission_courtier, commission_apporteur, totalPrimeTtc, codeAvenant) {
        const uuid = uuidv4();
        const clientName = await AppStorage.getClientNameByUUID(
            form.client_id
        );
        const clientCode = await AppStorage.getClientCodeByUUID(
            form.client_id
        );
        const compagnieName = await AppStorage.getCompagnieNameByUUID(
            form.compagnie_id
        );
        const apporteurName = await AppStorage.getApporteurNameByUUID(
            form.apporteur_id
        );

        const newContratData = [
            {
                id: userId,
                uuidContrat: uuid,
                id_entreprise: entrepriseId,
                uuidBranche: form.branche_id.uuidBranche,
                nom_branche: form.branche_id.nom_branche,
                uuidClient: form.client_id,
                nom_client: clientName,
                numero_client: clientCode,
                nom_compagnie: compagnieName,
                nom_apporteur: apporteurName,
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
                sync: 0,
                solde: 0,
                reverse: 0,
                supprimer_contrat: 0,
            },
        ];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("contrats", newContratData);

        // Enregistré les avenants dans IndexedDB
        const [annee, mois, day] = form.souscrit_le.split("-");

        // const calculateCommission = () => {
        //     return (
        //         form.primes_nette *
        //         this.taux.taux *
        //         0.01 *
        //         this.tauxcomp.tauxcomp *
        //         0.01
        //     );
        // };

        // const calculateCommissionCourtier = () => {
        //     return form.primes_nette * tauxcomp.tauxcomp * 0.01;
        // };

        const uuidAvenant = uuidv4();

        const newAvenantsData = [
            {
                id: userId,
                uuidContrat: uuid,
                annee: annee,
                mois: mois,
                type: "Terme",
                nom_client: clientName,
                nom_branche: form.branche_id.nom_branche,
                prime_ttc: totalPrimeTtc,
                retrocession: 0,
                // commission: calculateCommission,
                commission: commission_apporteur,
                // commission_courtier: calculateCommissionCourtier(),
                commission_courtier: commission_courtier,
                prise_charge: 0,
                ristourne: 0,
                prime_nette: form.primes_nette,
                date_emission: form.souscrit_le,
                date_debut: form.effet_police,
                date_fin: form.expire_le,
                accessoires: form.accessoires,
                frais_courtier: form.frais_courtier,
                cfga: this.cfga,
                taxes_totales: form.taxes_totales,
                code_avenant: codeAvenant,
                uuidAvenant: uuidAvenant,
                uuidApporteur: form.apporteur_id,
                uuidCompagnie: form.compagnie_id,
                uuidClient: form.client_id,
                sync: 0,
                solder: 0,
                reverser: 0,
                payer_apporteur: 0,
                payer_courtier: 0,
                supprimer_avenant: 0,
                id_entreprise: entrepriseId,
            },
        ];

        // Enregistré les avenants dans IndexedDB
        await AppStorage.storeDataInIndexedDB("avenants", newAvenantsData);

        if (
            form.branche_id.nom_branche == "AUTOMOBILE" ||
            form.branche_id.nom_branche == "MOTO" ||
            form.branche_id.nom_branche == "MOTO" ||
            form.branche_id.nom_branche == "AUTOMOBILE HORS TPV" ||
            form.branche_id.nom_branche == "AUTOMOBILE TPV"
        ) {
            const uuidAutomobile = uuidv4();

            const newAutomobileData = [
                {
                    uuidAutomobile: uuidAutomobile,
                    uuidContrat: uuid,
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
                    sync: 0,
                    supprimer_automobile: 0,
                    id_entreprise: entrepriseId,
                    id: userId,
                },
            ];

            await AppStorage.storeDataInIndexedDB(
                "automobiles",
                newAutomobileData
            );

            // let test = JSON.parse(JSON.stringify(this.typegarantie));
            // let donnees = [];

            // for (let i = 0; i < Object.keys(test).length; i++) {
            //     donnees.push(test[i]);
            // }

            // for (let i = 0; i < donnees.length; i++) {
            //     // Générer un UUID unique
            //     const uuidGarantie = uuidv4();

            //     const newGarantieData = [
            //         {
            //             uuidGarantie: uuidGarantie,
            //             uuidAutomobile: uuidAutomobile,
            //             nom_garantie: donnees[i],
            //             sync: 0,
            //             id_entreprise: entrepriseId,
            //         },
            //     ];

            //     await AppStorage.storeDataInIndexedDB("garanties", newGarantieData);
            // }
        }
    }

    async getTauxParIdBrancheEtCompagnie(id_branche, option) {
        return await AppStorage.getTauxParIdBrancheEtCompagnie(id_branche, option)
    }

    async getTauxParIdBrancheEtApporteur(id_branche, optional) {
        return await AppStorage.getTauxParIdBrancheEtApporteur(id_branche, optional);
    }

    async storeAutomobile(form, userId, entrepriseId, uuidAutomobile, uuidContrat, contrat,typegaranties) {
        // Create an array with the new automobile data
        const newAutomobileData = [
            {
                uuidAutomobile: uuidAutomobile,
                uuidContrat: uuidContrat,
                numero_immatriculation: form.numero_immatriculation,
                date_circulation: form.date_circulation, // Assuming this.date_circulation should be form.date_circulation
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
                tierce: form.tierce, // Assuming this.tierce should be form.tierce
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
            },
        ];
    
        // Store the automobile data in IndexedDB
        await AppStorage.storeDataInIndexedDB("automobiles", newAutomobileData);
    
        // Iterate over the typegarantie values and store each as a new guarantee record
        for (let nom_garantie of typegaranties) {
            const uuidGarantie = uuidv4(); // Generate a unique UUID for the guarantee
    
            const newGarantieData = [
                {
                    uuidGarantie: uuidGarantie,
                    uuidAutomobile: uuidAutomobile,
                    nom_garantie: nom_garantie,
                    sync: 0,
                    id_entreprise: entrepriseId,
                },
            ];
    
            // Store the guarantee data in IndexedDB
            await AppStorage.storeDataInIndexedDB("garanties", newGarantieData);
        }
    
        // Retrieve and return the updated list of automobiles associated with the contract
        const updatedAutomobiles = await AppStorage.getAutomobileByUuidContrat(uuidContrat);
        return updatedAutomobiles;
    }
    


}

// export default OfflineService;
export default new OfflineService();