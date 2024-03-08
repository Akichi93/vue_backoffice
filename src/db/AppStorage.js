// AppStorage.js
import { openDB } from 'idb';
class AppStorage {

    static dbName = 'fl4ir';
    // static storeUser = (user) =>  `Bonjour ${user.name}`

    static async storeToken(token) {
        localStorage.setItem('token', token);
    }

    static async storeUser(user) {
        localStorage.setItem('user', user);
    }

    static async storeId(id) {
        localStorage.setItem('id', id);
    }

    static async storeEntreprise(entreprise) {
        localStorage.setItem('entreprise', entreprise);
    }

    static async storeRole(role) {
        localStorage.setItem('role', role);
    }

    static async storeData(key, data) {
        // localStorage.setItem(key, JSON.stringify(data));
        await this.storeDataInIndexedDB(key, data);
    }

    static async getData(key) {
        const indexedDBData = await this.fetchDataFromIndexedDB(key);

        if (indexedDBData) {
            return indexedDBData;
        }

        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }


    // storeDataInIndexedDB doit permettre d'ajouter une nouvelle donnée ,de fusionner les données et aussi de faire une mise à jour des données
    static async storeDataInIndexedDB(key, data) {
        const db = await openDB(this.dbName, 1, {
            upgrade(db) {
                db.createObjectStore('apiData');
            },
        });

        const tx = db.transaction('apiData', 'readwrite');
        const store = tx.objectStore('apiData');

        const existingData = await store.get(key);

        if (existingData) {
            // Gestion des conflits : fusionner les données existantes avec les nouvelles données
            if (Array.isArray(existingData) && Array.isArray(data)) {
                const mergedData = existingData.concat(data);
                await store.put(mergedData, key);
                console.log(`Données fusionnées à apiData dans IndexedDB avec succès`);
            } else {
                console.error('Les données existantes ou les nouvelles données ne sont pas au format de tableau.');
            }
        } else {
            // Aucune donnée existante, ajouter simplement les nouvelles données
            await store.put(data, key);
            console.log(`Donnée ajoutée à apiData dans IndexedDB avec succès`);
        }


        // Terminer la transaction
        await tx.complete;
    }



    static async updateDataInIndexedDB(key, newData) {
        const db = await openDB(this.dbName, 1);

        const tx = db.transaction('apiData', 'readwrite');
        const store = tx.objectStore('apiData');

        // Remplacer les données existantes par les nouvelles données
        await store.put(newData, key);

        // Terminer la transaction
        await tx.complete;
    }



    static async clearData(key) {
        const db = await openDB(this.dbName, 1, {
            upgrade(db) {
                db.createObjectStore('apiData');
            },
        });

        const tx = db.transaction('apiData', 'readwrite');
        const store = tx.objectStore('apiData');

        // Delete the data for the specified key
        await store.delete(key);

        // Complete the transaction
        await tx.complete;

        console.log(`Data cleared for ${key} in apiData in IndexedDB`);
    }





    static async fetchDataFromIndexedDB(key) {
        const db = await openDB(this.dbName, 1);
        const tx = db.transaction('apiData', 'readonly');
        const store = tx.objectStore('apiData');

        return store.get(key);
    }

    static async deleteIndexedDB() {
        try {
            const dbName = 'fl4ir'; // Nom de la base de données
            indexedDB.deleteDatabase(dbName);
            console.log('IndexedDB deleted successfully');
        } catch (error) {
            console.error('Error deleting IndexedDB:', error);
        }
    }

    static async paginateData(key, pageIndex = 0, pageSize = 10) {
        const allData = await this.getData(key) || [];
        return allData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    }

    static async storeClients(clients) {
        await this.storeData('clients', clients);
    }

    static async searchClientsByName(name) {
        const allClients = await this.getData('clients') || [];
        const filteredClients = allClients.filter(client => client.nom_client.toLowerCase().includes(name.toLowerCase()));
        return filteredClients;
    }

    static async getClients() {
        return this.getData('clients') || [];
    }

    // static async getClients(pageIndex = 0, pageSize = 10) {
    //     // return this.getData('clients') || [];
    //     return this.paginateData('clients', pageIndex, pageSize);
    // }

    static async getClientByUuid(clientUuid) {
        const allContrats = await this.getData('clients') || [];
        return allContrats.find(contrat => contrat.uuidClient === clientUuid);
    }

    static async getClientNameByUUID(uuidClient) {
        const allClients = await this.getData('clients') || [];

        const client = allClients.find(client => client.uuidClient === uuidClient);

        return client ? client.nom_client : null;
    }


    static async getClientCodeByUUID(uuidClient) {
        const allClients = await this.getData('clients') || [];

        const client = allClients.find(client => client.uuidClient === uuidClient);

        return client ? client.numero_client : null;
    }

    static async updateClient(uuidClient, nouvellesInfos) {
        // Obtenez la liste des clients
        const allclients = await this.getData('clients') || [];

        // Recherche du client par son UUID
        const clientIndex = allclients.findIndex(client => client.uuidClient === uuidClient);

        if (clientIndex !== -1) {
            // Mettre à jour les informations du prospect
            Object.assign(allclients[clientIndex], nouvellesInfos);

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('clients', allclients);

            return allclients[clientIndex];
        } else {
            throw new Error('Prospect non trouvé');
        }
    }

    // Prospects

    static async storeProspects(prospects) {
        await this.storeData('prospects', prospects);
    }


    static async getProspects() {
        return this.getData('prospects') || [];
    }

    static async getProspectByUuid(ProspectUuid) {
        const allProspects = await this.getData('prospects') || [];
        return allProspects.find(prospect => prospect.uuidProspect === ProspectUuid);
    }

    static async updateProspectById(uuidProspect, updatedProspectData) {
        const allProspects = await this.getData('prospects') || [];

        // Recherche du prospect par son UUID
        const prospectIndex = allProspects.findIndex(prospect => prospect.uuidProspect === uuidProspect);

        if (prospectIndex !== -1) {
            // Mettre à jour le prospect
            allProspects[prospectIndex] = { ...allProspects[prospectIndex], ...updatedProspectData };

            // Sauvegarder les données mises à jour
            await this.storeData('prospects', allProspects);

            return allProspects[prospectIndex];
        } else {
            throw new Error('Prospect non trouvé');
        }
    }

    static async getNameProspectParUUID(uuidProspect) {
        const prospects = await this.getProspects();
        const prospectTrouve = prospects.find(prospect => prospect.uuidProspect === uuidProspect);

        if (prospectTrouve) {
            return prospectTrouve.nom_prospect;
        } else {
            return null; // Ou vous pouvez choisir de renvoyer une valeur par défaut ou générer une erreur, selon votre cas d'utilisation.
        }
    }



    static async prospectExists(nomProspect, telProspect, entrepriseId) {
        const allProspects = await this.getProspects();

        return allProspects.some(prospect =>
            prospect.nom_prospect.toLowerCase() === nomProspect.toLowerCase() &&
            prospect.tel_prospect === telProspect &&
            prospect.id_entreprise === entrepriseId
        );
    }


    // static async updateProspectState(uuidProspect, newState, newSyncState) {
    //     try {
    //         // Obtenez la liste des prospects
    //         const allProspects = await this.getData('prospects') || [];

    //         // Recherche du prospect par son UUID
    //         const prospectIndex = allProspects.findIndex(prospect => prospect.uuidProspect === uuidProspect);

    //         if (prospectIndex !== -1) {

    //             // Récupération du prospect trouvé
    //             const prospect = allProspects[prospectIndex];

    //             // Mettre à jour l'état du prospect
    //             prospect.statut = newState;

    //             // Mettre à jour l'état de synchronisation
    //             prospect.sync = newSyncState;
    //             ;
    //             // Mettre à jour les données dans l'application
    //             await this.updateDataInIndexedDB('prospects', prospectIndex);

    //             return prospect;
    //         } else {
    //             throw new Error('Prospect non trouvé');
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la mise à jour du prospect :', error);
    //         throw error;
    //     }
    // }




    static async updateProspectChange(uuidProspect, newState, newSyncState) {
        // Obtenez la liste des prospects
        const allProspects = await this.getData('prospects') || [];



        // Recherche du prospect par son UUID
        const prospectIndex = allProspects.findIndex(prospect => prospect.uuidProspect === uuidProspect);
        console.log(allProspects);

        if (prospectIndex !== -1) {
            // Mettre à jour l'état du prospect
            allProspects[prospectIndex].etat = newState;

            // Mettre à jour l'état de synchronisation
            allProspects[prospectIndex].sync = newSyncState;



            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('prospects', allProspects);

            return allProspects;
        } else {
            throw new Error('Prospect non trouvé');
        }
    }

    static async updateProspect(uuidProspect, nouvellesInfos) {
        // Obtenez la liste des prospects
        const allProspects = await this.getData('prospects') || [];

        // Recherche du prospect par son UUID
        const prospectIndex = allProspects.findIndex(prospect => prospect.uuidProspect === uuidProspect);

        if (prospectIndex !== -1) {
            // Mettre à jour les informations du prospect
            Object.assign(allProspects[prospectIndex], nouvellesInfos);

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('prospects', allProspects);

            return allProspects[prospectIndex];
        } else {
            throw new Error('Prospect non trouvé');
        }
    }


    static async searchProspectsByName(name) {
        const allProspects = await this.getData('prospects') || [];
        const filteredProspects = allProspects.filter(prospect => prospect.nom_prospect.toLowerCase().includes(name.toLowerCase()));
        return filteredProspects;
    }

    // branche prospect
    static async storeBrancheProspects(brancheprospects) {
        await this.storeData('brancheprospects', brancheprospects);
    }


    static async getBrancheProspects() {
        return this.getData('brancheprospects') || [];
    }

    static async getDifferenceOfBranches() {
        const branches = await this.getBranches();
        const brancheprospects = await this.getData('brancheprospects') || [];

        // Exclure les branches présentes dans brancheprospects
        const branchesDifference = branches.filter(branch => !brancheprospects.includes(branch));

        return branchesDifference;
    }

    static async getBrancheProspectsByUuid(uuidProspect) {
        // Récupère toutes les branches de prospects
        const branches = await this.getBrancheProspects();

        // Recherche la branche de prospects spécifique par son UUID
        const branch = branches.find(branch => branch.uuidProspect === uuidProspect);

        return branch || null; // Renvoie la branche de prospects ou null si elle n'est pas trouvée
    }



    // Contrats
    static async storeBrancheProspects(contrats) {
        await this.storeData('contrats', contrats);
    }

    static async searchContratsByName(name) {
        const allContrats = await this.getData('contrats') || [];
        const filteredContrats = allContrats.filter(contrat => contrat.nom_contrat.toLowerCase().includes(name.toLowerCase()));
        return filteredContrats;
    }

    static async getContrats() {
        return this.getData('contrats') || [];
    }

    static async getContratByUuid(uuidContrat) {
        const allContrats = await this.getData('contrats') || [];
        return allContrats.find(contrat => contrat.uuidContrat === uuidContrat);
    }

    // static async getContratByUuid(uuidContrat) {
    //     const allClients = await this.getData('contrats') || [];
    //     return allClients.find(client => client.uuidContrat === uuidContrat);
    // }


    static async getInfoContratByUuid(uuidContrat) {
        const contrats = await this.getContrats();
        const contratTrouve = contrats.find(contrat => contrat.uuidContrat === uuidContrat);

        if (contratTrouve) {
            return contratTrouve;
        } else {
            // Retourner quelque chose pour indiquer que le contrat n'a pas été trouvé
            return null;
        }
    }


    // Localisations
    static async getLocalisations() {
        return this.getData('localisations') || [];
    }

    static async getProfessions() {
        return this.getData('professions') || [];
    }

    static async getMarques() {
        return this.getData('marques') || [];
    }

    static async getEnergies() {
        return this.getData('energies') || [];
    }

    static async getCouleurs() {
        return this.getData('couleurs') || [];
    }

    static async getGenres() {
        return this.getData('genres') || [];
    }

    static async getCategories() {
        return this.getData('categories') || [];
    }

    // Avenants


    static async storeAvenants(avenants) {
        await this.storeData('avenants', avenants);
    }

    static async getAvenants() {
        return this.getData('avenants') || [];
    }

    static async getAvenantByUuid(uuidAvenant) {
        const allAvenants = await this.getData('avenants') || [];
        return allAvenants.find(avenant => avenant.uuidAvenant === uuidAvenant);
    }


    static async updateAvenantSolde(uuidAvenant, newState, newSyncState) {
        // Obtenez la liste des prospects
        const allAvenants = await this.getData('avenants') || [];

        // Recherche du prospect par son UUID
        const avenantIndex = allAvenants.findIndex(prospect => prospect.uuidAvenant === uuidAvenant);

        console.log(avenantIndex)

        if (avenantIndex !== -1) {
            // Mettre à jour l'état du prospect
            allAvenants[avenantIndex].solder = newState;

            // Mettre à jour l'état de synchronisation
            allAvenants[avenantIndex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('avenants', allAvenants);

            console.log(allAvenants)

            return allAvenants;
        } else {
            throw new Error('Avenant non trouvé');
        }
    }

    static async updateAvenantReverse(uuidAvenant, newState, newSyncState) {
        // Obtenez la liste des prospects
        const allAvenants = await this.getData('avenants') || [];

        // Recherche du prospect par son UUID
        const avenantIndex = allAvenants.findIndex(prospect => prospect.uuidAvenant === uuidAvenant);

        if (avenantIndex !== -1) {
            // Mettre à jour l'état du prospect
            allAvenants[avenantIndex].reverser = newState;

            // Mettre à jour l'état de synchronisation
            allAvenants[avenantIndex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('avenants', allAvenants);



            return allAvenants;
        } else {
            throw new Error('Avenant non trouvé');
        }
    }


    static async getAvenantsSommeByUuid(uuidContrat) {
        const avenantsData = await this.getAvenants();

        // Check if avenantsData is null or undefined
        if (!avenantsData) {
            // Handle the case where avenantsData is null or undefined
            return {
                sommePrimeNette: 0,
                sommeAccessoires: 0,
                sommePrimeTTC: 0,
                sommeFraisCourtier: 0,
                sommeTaxesTotales: 0,
                sommeCommissionCourtier: 0,
                sommeCommission: 0
            };
        }

        // Proceed with filtering and calculations
        const avenantsFiltres = avenantsData.filter(avenant => avenant.uuidContrat === uuidContrat);
        const sommePrimeNette = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.prime_nette), 0);
        const sommeAccessoires = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.accessoires), 0);
        const sommePrimeTTC = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.prime_ttc), 0);
        const sommeFraisCourtier = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.frais_courtier), 0);
        const sommeTaxesTotales = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.taxes_totales), 0);
        const sommeCommissionCourtier = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.commission_courtier), 0);
        const sommeCommission = avenantsFiltres.reduce((acc, avenant) => acc + parseFloat(avenant.commission), 0);

        // Return an object containing all the calculated sums
        return {
            sommePrimeNette,
            sommeAccessoires,
            sommePrimeTTC,
            sommeFraisCourtier,
            sommeTaxesTotales,
            sommeCommissionCourtier,
            sommeCommission
        };
    }



    static async getAvenantsByUuidContrat(uuidContrat) {
        const allAvenants = await this.getAvenants();

        // const allAutomobiles = await this.getData('automobiles') || [];

        // Filtrer les avenants en fonction de l'uuidContrat
        const avenantsByUuidContrat = allAvenants.filter(avenant => avenant.uuidContrat === uuidContrat);

        // const details = allAutomobiles.find(automobile => automobile.uuidContrat === uuidContrat);

        return avenantsByUuidContrat;
        
    }


    // automobiles
    static async storeAutomobiles(automobiles) {
        await this.storeData('automobiles', automobiles);
    }

    static async getAutomobiles() {
        return this.getData('automobiles') || [];
    }

    static async getAutomobileByUuidContrat(uuidContrat) {
        const allAutomobiles = await this.getData('automobiles') || [];

        const details = allAutomobiles.filter(automobile => automobile.uuidContrat === uuidContrat);

        return details;
    }

    async fetchDataAutomobile() {
        try {
            const uuidContrat = this.$route.params.uuidContrat;

            const automobiles = await AppStorage.getAutomobileByUuidContrat(uuidContrat);

            this.autos = automobiles;

            console.log(this.autos);

        } catch (error) {
            console.error("Erreur lors de la récupération des automobiles :", error);
        }
    }

    // garanties
    static async storeGaranties(garanties) {
        await this.storeData('garanties', garanties);
    }

    static async getGaranties() {
        return this.getData('garanties') || [];
    }

    static async getAutomobileByUuid(uuidGarantie) {
        const allGaranties = await this.getData('garanties') || [];
        return allGaranties.find(garantie => garantie.uuidGarantie === uuidGarantie);
    }



    // Compagnies
    static async storeCompagnies(compagnies) {
        await this.storeData('compagnies', compagnies);
    }

    static async getCompagnies() {
        return this.getData('compagnies') || [];
    }

    static async searchCompagniesByName(name) {
        const allCompagnies = await this.getData('compagnies') || [];
        const filteredCompagnies = allCompagnies.filter(compagnie => compagnie.nom_compagnie.toLowerCase().includes(name.toLowerCase()));
        return filteredCompagnies;
    }

    static async getCompagnieByUuid(uuidCompagnie) {
        const allCompagnies = await this.getData('compagnies') || [];
        return allCompagnies.find(compagnie => compagnie.uuidCompagnie === uuidCompagnie);
    }

    static async storeTauxCompagnies(tauxcompagnies) {
        await this.storeData('tauxcompagnies', tauxcompagnies);
    }

    static async getCompagnieNameByUUID(uuidCompagnie) {
        const allCompagnies = await this.getData('compagnies') || [];

        const compagnie = allCompagnies.find(compagnie => compagnie.uuidCompagnie === uuidCompagnie);

        return compagnie ? compagnie.nom_compagnie : null;
    }

    static async updateCompagnie(uuidCompagnie, nouvellesInfos) {
        // Obtenez la liste des prospects
        const allCompagnies = await this.getData('compagnies') || [];

        // Recherche du prospect par son UUID
        const compagnieIndex = allCompagnies.findIndex(compagnie => compagnie.uuidCompagnie === uuidCompagnie);

        console.log(compagnieIndex)

        if (compagnieIndex !== -1) {
            // Mettre à jour les informations du prospect
            Object.assign(allCompagnies[compagnieIndex], nouvellesInfos);

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('compagnies', allCompagnies);

            console.log(allCompagnies[compagnieIndex])

            return allCompagnies[compagnieIndex];

        } else {
            throw new Error('Compagnie non trouvé');
        }
    }

    static async updateTauxCompagnieByUuid(uuidTauxCompagnie, newTaux, newSyncState) {
        // Obtenez la liste des prospects
        const allTauxCompagnies = await this.getData('tauxcompagnies') || [];

        // Recherche du prospect par son UUID
        const tauxcompagnieIndex = allTauxCompagnies.findIndex(tauxcompagnie => tauxcompagnie.uuidTauxCompagnie === uuidTauxCompagnie);

        if (tauxcompagnieIndex !== -1) {
            // Mettre à jour l'état du prospect
            allTauxCompagnies[tauxcompagnieIndex].tauxcomp = newTaux;

            // Mettre à jour l'état de synchronisation
            allTauxCompagnies[tauxcompagnieIndex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('tauxcompagnies', allTauxCompagnies);

            return allTauxCompagnies;

        } else {
            throw new Error('Taux compagnie non trouvé');
        }
    }

    static async getCompanyNameById(idCompagnie) {
        // Convertir l'ID de compagnie en entier
        idCompagnie = +idCompagnie;
        try {
            const compagniesData = await this.getData('compagnies') || [];
            const compagnie = compagniesData.find(compagnie => compagnie.id_compagnie === idCompagnie);

            return compagnie ? compagnie.nom_compagnie : null;
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de la compagnie :", error);
            return null;
        }
    }

    static async getTauxCompagnies() {
        return this.getData('tauxcompagnies') || [];
    }

    static async getTauxParIdBrancheEtCompagnie(uuidBranche, uuidCompagnie) {
        const tauxCompagnies = await this.getTauxCompagnies();

        // Recherche du taux en fonction des identifiants de branche et de compagnie
        const tauxTrouve = tauxCompagnies.find(tauxcomp => tauxcomp.uuidBranche === uuidBranche && tauxcomp.uuidCompagnie === uuidCompagnie);

        return tauxTrouve || null; // Retourne le taux trouvé ou null si aucun taux correspondant n'est trouvé
    }

    static async getTauxwithCompagnieAndBranche(uuidBranche, uuidCompagnie) {
        const tauxcompagnies = await this.getTauxCompagnies();
        const filteredTaux = tauxcompagnies.filter(taux => taux.uuidBranche === uuidBranche && taux.uuidCompagnie === uuidCompagnie);

        // Si des taux sont trouvés, renvoyer le premier taux trouvé, sinon renvoyer null
        if (filteredTaux.length > 0) {
            return filteredTaux[0].tauxcomp;
        } else {
            return null;
        }
    }



    static async getTauxCompagniesByIdCompagnie(uuidCompagnie) {
        // Convertir l'ID de compagnie en entier
        // uuidCompagnie = +uuidCompagnie; 

        const allTauxCompagnies = await this.fetchDataFromIndexedDB('tauxcompagnies') || [];

        const tauxCompagniesByIdCompagnie = allTauxCompagnies.filter(tauxcompagnie => {


            return tauxcompagnie.uuidCompagnie === uuidCompagnie;
        });

        return tauxCompagniesByIdCompagnie;
    }

    static async getTauxCompagnieById(uuidTauxCompagnie) {
        const allTauxCompagnies = await this.getData('tauxcompagnies') || [];
        const result = allTauxCompagnies.find(tauxcompagnie => tauxcompagnie.uuidTauxCompagnie === uuidTauxCompagnie);
        // console.log(result)
        return result
        // return allTauxCompagnies.find(tauxcompagnie => tauxcompagnie.uuidTauxCompagnie === uuidTauxCompagnie);
    }

    // Apporteurs
    static async storeApporteurs(apporteurs) {
        await this.storeData('apporteurs', apporteurs);
    }

    static async getApporteurs() {
        return this.getData('apporteurs') || [];
    }

    static async getApporteurByUuid(uuidApporteur) {
        const allApporteurs = await this.getData('apporteurs') || [];
        return allApporteurs.find(apporteur => apporteur.uuidApporteur === uuidApporteur);
    }


    static async searchApporteursByName(name) {
        const allApporteurs = await this.getData('compagnies') || [];
        const filteredApporteurs = allApporteurs.filter(apporteur => apporteur.nom_apporteur.toLowerCase().includes(name.toLowerCase()));
        return filteredApporteurs;
    }

    static async updateApporteur(uuidApporteur, nouvellesInfos) {
        // Obtenez la liste des prospects
        const allApporteurs = await this.getData('apporteurs') || [];

        // Recherche du prospect par son UUID
        const apporteurIndex = allApporteurs.findIndex(compagnie => compagnie.uuidApporteur === uuidApporteur);

        if (apporteurIndex !== -1) {
            // Mettre à jour les informations du prospect
            Object.assign(allApporteurs[apporteurIndex], nouvellesInfos);

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('apporteurs', allApporteurs);

            console.log(allApporteurs[apporteurIndex])

            return allApporteurs[apporteurIndex];

        } else {
            throw new Error('Apporteur non trouvé');
        }
    }

    static async storeTauxApporteurs(tauxapporteurs) {
        await this.storeData('tauxapporteurs', tauxapporteurs);
    }

    static async getTauxApporteurs() {
        return this.getData('tauxapporteurs') || [];
    }

    static async getTauxApporteursByIdApporteur(uuidApporteur) {
        // Convertir l'ID de compagnie en entier
        // uuidCompagnie = +uuidCompagnie; 

        const allTauxApporteurs = await this.fetchDataFromIndexedDB('tauxapporteurs') || [];

        const tauxApporteursByIdApporteur = allTauxApporteurs.filter(tauxApporteur => {

            return tauxApporteur.uuidApporteur === uuidApporteur;
        });

        return tauxApporteursByIdApporteur;
    }

    static async getTauxParIdBrancheEtApporteur(uuidBranche, uuidApporteur) {
        const tauxapporteurs = await this.getTauxApporteurs();

        // Recherche du taux en fonction des identifiants de branche et de la branche
        const tauxTrouve = tauxapporteurs.find(taux => taux.uuidBranche === uuidBranche && taux.uuidApporteur === uuidApporteur);

        return tauxTrouve || null; // Retourne le taux trouvé ou null si aucun taux correspondant n'est trouvé
    }

    static async getApporteurNameByUUID(uuidApporteur) {
        const allApporteurs = await this.getData('apporteurs') || [];

        const apporteur = allApporteurs.find(apporteur => apporteur.uuidApporteur === uuidApporteur);

        return apporteur ? apporteur.nom_apporteur : null;
    }

    static async getTauxApporteurById(uuidTauxApporteur) {
        const allTauxApporteurs = await this.getData('tauxapporteurs') || [];
        const result = allTauxApporteurs.find(tauxapporteur => tauxapporteur.uuidTauxApporteur === uuidTauxApporteur);
        return result
    }

    static async getTauxwithApporteurAndBranche(uuidBranche, uuidApporteur) {
        const tauxapporteurs = await this.getTauxApporteurs();
        const filteredTaux = tauxapporteurs.filter(taux => taux.uuidBranche === uuidBranche && taux.uuidApporteur === uuidApporteur);

        // Si des taux sont trouvés, renvoyer le premier taux trouvé, sinon renvoyer null
        if (filteredTaux.length > 0) {
            return filteredTaux[0].taux;
        } else {
            return null;
        }
    }

    static async updateTauxApporteurByUuid(uuidTauxApporteur, newTaux, newSyncState) {
        // Obtenez la liste des prospects
        const allTauxApporteurs = await this.getData('tauxapporteurs') || [];



        // Recherche du prospect par son UUID
        const tauxapporteurindex = allTauxApporteurs.findIndex(tauxapporteur => tauxapporteur.uuidTauxApporteur === uuidTauxApporteur);

        if (tauxapporteurindex !== -1) {
            // Mettre à jour l'état du prospect
            allTauxApporteurs[tauxapporteurindex].taux = newTaux;

            // Mettre à jour l'état de synchronisation
            allTauxApporteurs[tauxapporteurindex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('tauxapporteurs', allTauxApporteurs);

            return allTauxApporteurs;

        } else {
            throw new Error('Taux apporteur non trouvé');
        }
    }


    // Branches
    static async storeBranches(branches) {
        await this.storeData('branches', branches);
    }

    static async searchBranchesByName(name) {
        const allBranches = await this.getData('branches') || [];
        const filteredBranches = allBranches.filter(branche => branche.nom_branche.toLowerCase().includes(name.toLowerCase()));
        return filteredBranches;
    }

    static async getBranches() {
        return this.getData('branches') || [];
    }


    static async getBrancheByUuid(uuidBranche) {
        const allBranches = await this.getData('branches') || [];
        return allBranches.find(branche => branche.uuidBranche === uuidBranche);
    }


    static async updateBranche(uuidBranche, nouvellesInfos) {
        // Obtenez la liste des prospects
        const allBranches = await this.getData('branches') || [];

        // Recherche du prospect par son UUID
        const brancheIndex = allBranches.findIndex(branches => branches.uuidBranche === uuidBranche);

        if (brancheIndex !== -1) {
            // Mettre à jour les informations du prospect
            Object.assign(allBranches[brancheIndex], nouvellesInfos);

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('branches', allBranches);

            return allBranches[brancheIndex];

        } else {
            throw new Error('Branche non trouvé');
        }
    }

    static async getBrancheNameByUUID(uuidBranche) {
        const allBranches = await this.getData('branches') || [];

        const branche = allBranches.find(branche => branche.uuidBranche === uuidBranche);

        return branche ? branche.nom_branche : null;
    }


    // static async getBranches(pageIndex = 0, pageSize = 10) {
    //     // return this.getData('branches') || [];
    //     return this.paginateData('branches', pageIndex, pageSize);
    // }

    static async getExpiredContractsCount() {
        try {
            const currentDate = new Date();
            const contrats = await this.getData('contrats') || [];
            const expiredContrats = contrats.filter(contrat => {
                const expirationDate = new Date(contrat.expire_le);
                return expirationDate < currentDate;
            });
            return expiredContrats.length; // Retourne le nombre de contrats expirés
        } catch (error) {
            console.error('Erreur lors de la récupération du nombre de contrats expirés :', error);
            throw error;
        }
    }

    // static async getCommissionApporteurSum(year) {
    //     try {
    //         const avenants = await this.getData('avenants') || [];

    //         // const commissionApporteurSum = avenants.reduce((total, avenants) => {
    //         //     const souscriptionDate = new Date(avenants.souscrit_le);
    //         //     console.log(souscriptionDate)
    //         //     if (souscriptionDate.getFullYear() === year) {
    //         //         total += avenants.commission_apporteur || 0; // Ajouter la commission apporteur si souscrit_le est égal à year
    //         //     }
    //         //     return total;
    //         // }, 0);
    //         // return commissionApporteurSum;
    //     } catch (error) {
    //         console.error('Erreur lors du calcul de la somme de commission apporteur :', error);
    //         throw error;
    //     }
    // }

    static async getCommissionApporteurSum() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des commissions
            let commissionSum = 0;

            // Parcourir les avenants pour calculer la somme des commissions d'apporteurs
            avenants.forEach(avenant => {
                // Ajouter la commission de cet avenant à la somme totale
                commissionSum += avenant.commission || 0;
            });

            // Retourner la somme calculée
            return commissionSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme de commission apporteur :', error);
            throw error;
        }
    }

    static async getCommissionCompagnieSum() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des commissions
            let commissionCourtierSum = 0;

            // Parcourir les avenants pour calculer la somme des commissions d'apporteurs
            avenants.forEach(avenant => {
                // Ajouter la commission de cet avenant à la somme totale
                commissionCourtierSum += avenant.commission_courtier || 0;
            });

            // Retourner la somme calculée
            return commissionCourtierSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme de commission apporteur :', error);
            throw error;
        }
    }

    static async getAccessoiresPrimeNetteSumWithCompanyName() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des accessoires et de la prime nette
            let sum = 0;

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette
            avenants.forEach(avenant => {
                // Ajouter le montant d'accessoires et de prime nette de cet avenant à la somme totale
                sum += (avenant.accessoires || 0) + (avenant.prime_nette || 0);
            });

            // Retourner la somme calculée et le nom de la compagnie
            return {
                name: avenants.length > 0 ? avenants[0].nom_compagnie : null,
                y: sum

            };
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie :', error);
            throw error;
        }
    }

    static async getAccessoiresPrimeNetteSumWithMonth() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des accessoires et de la prime nette
            let sum = 0;

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette
            avenants.forEach(avenant => {
                // Ajouter le montant d'accessoires et de prime nette de cet avenant à la somme totale
                sum += (avenant.accessoires || 0) + (avenant.prime_nette || 0);
            });

            // Retourner la somme calculée et le nom de la compagnie
            return {
                name: avenants.length > 0 ? avenants[0].mois : null,
                y: sum
            };
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie :', error);
            throw error;
        }
    }

    static async getAccessoiresPrimeNetteSumWithAccessory() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des accessoires et de la prime nette
            let sum = 0;

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette
            avenants.forEach(avenant => {
                // Ajouter le montant d'accessoires et de prime nette de cet avenant à la somme totale
                sum += (avenant.accessoires || 0) + (avenant.prime_nette || 0);
            });

            // Retourner la somme calculée et le nom de la compagnie
            return {
                name: avenants.length > 0 ? avenants[0].nom_branche : null,
                y: sum

            };
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie :', error);
            throw error;
        }
    }

    static async getFactures() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des accessoires et de la prime nette
            let sum = 0;
            let accessoires = 0;

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette
            avenants.forEach(avenant => {
                // Ajouter le montant d'accessoires et de prime nette de cet avenant à la somme totale
                sum += (avenant.accessoires || 0) + (avenant.prime_nette || 0) + (avenant.taxes_totales || 0) + (avenant.frais_courtier || 0);
                accessoires += (avenant.accessoires || 0) + (avenant.frais_courtier || 0);
            });

            // Retourner la somme calculée et le nom de la compagnie
            return {
                type: avenants.length > 0 ? avenants[0].type : null,
                nom_client: avenants.length > 0 ? avenants[0].nom_client : null,
                adresse_client: avenants.length > 0 ? avenants[0].adresse_client : null,
                postal_client: avenants.length > 0 ? avenants[0].postal_client : null,
                numero_client: avenants.length > 0 ? avenants[0].numero_client : null,
                numero_police: avenants.length > 0 ? avenants[0].numero_police : null,
                nom_branche: avenants.length > 0 ? avenants[0].nom_branche : null,
                prime_nette: avenants.length > 0 ? avenants[0].prime_nette : null,
                taxes_totales: avenants.length > 0 ? avenants[0].taxes_totales : null,
                accessoires: accessoires,
                date_debut: avenants.length > 0 ? avenants[0].date_debut : null,
                date_fin: avenants.length > 0 ? avenants[0].date_fin : null,
                code_avenant: avenants.length > 0 ? avenants[0].code_avenant : null,
                payer: sum

            };
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie :', error);
            throw error;
        }
    }


    static async getEmissions() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des accessoires et de la prime nette
            let countemission = 0;

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette
            avenants.forEach(avenant => {
                // Ajouter le montant d'accessoires et de prime nette de cet avenant à la somme totale
                countemission += (avenant.accessoires || 0) + (avenant.prime_nette || 0) + (avenant.frais_courtier || 0);
            });

            // Retourner la somme calculée et le nom de la compagnie
            return countemission

        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie :', error);
            throw error;
        }
    }




    // statistiques

    static async getAvenantsGroupedByYear() {
        const avenants = await this.getAvenants(); // Récupérer les données des avenants
        const avenantsGroupedByYear = avenants.reduce((grouped, avenant) => {
            // Extraire l'année de la date d'émission de l'avenant
            const year = new Date(avenant.date_emission).getFullYear().toString();
            // Ajouter l'avenant au groupe correspondant à son année
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(avenant);
            return grouped;
        }, {});

        return avenantsGroupedByYear;
    }


    static async getDataByYearAndBranch(year, branch) {

        if (branch == 'Aucune branche sélectionnée') {
            // Si year est null, compter les prospects, les clients et les sinistres
            const contrats = await this.getData('contrats') || [];
            const prospects = await this.getData('prospects') || [];
            const clients = await this.getData('clients') || [];
            const sinistres = await this.getData('sinistres') || [];


            // Récupérer le nombre de contrats expirés
            const expiredContractsCount = await this.getExpiredContractsCount();

            // Calculer la somme de commission apporteur
            const commissionApporteurSum = await this.getCommissionApporteurSum();

            const commissionCompagnieSum = await this.getCommissionCompagnieSum();

            const compagnies = await this.getAccessoiresPrimeNetteSumWithCompanyName();

            const primes = await this.getAccessoiresPrimeNetteSumWithMonth();

            const accessoires = await this.getAccessoiresPrimeNetteSumWithAccessory();

            const emissionssum = await this.getEmissions();

            return {
                contratsCount: contrats.length,
                prospectsCount: prospects.length,
                clientsCount: clients.length,
                sinistresCount: sinistres.length,
                expiredContractsCount: expiredContractsCount,
                commissionApporteurSum: commissionApporteurSum,
                commissionCompagnieSum: commissionCompagnieSum,
                compagnie: compagnies,
                prime: primes,
                accessoire: accessoires,
                countemission: emissionssum
            };
        } else {
            // Sinon, récupérer les prospects pour l'année spécifiée
            // Implémentez ici la logique pour récupérer les prospects en fonction de l'année
            // Par exemple :
            // const prospects = await fetchDataForYear(year);
            // return prospects;
        }

    }




    static async store(token, user, id, entreprise, role) {
        await this.storeToken(token);
        await this.storeUser(user);
        await this.storeId(id);
        await this.storeEntreprise(entreprise);
        await this.storeRole(role);
    }

    static async clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('entreprise');
        localStorage.removeItem('role');

        await this.clearData('clients');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getUser() {
        return localStorage.getItem('user');
    }

    static getId() {
        return localStorage.getItem('id');
    }

    static getEntreprise() {
        return localStorage.getItem('entreprise');
    }

    static getRole() {
        return localStorage.getItem('role');
    }

    static async clearClients() {
        await this.clearData('clients');
    }

}

export default AppStorage;