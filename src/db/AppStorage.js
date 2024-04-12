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

    static async storeContact(contact) {
        localStorage.setItem('contact', contact);
    }

    static async storeAdresse(adresse) {
        localStorage.setItem('adresse', adresse);
    }

    static async storeEmail(email) {
        localStorage.setItem('email', email);
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
                // dataEncrypted = LocalService.encrypte(mergedData)
                await store.put(mergedData, key);
                // await store.put(dataEncrypted, key);
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

    static async updateSyncIndexedDB(key, newData) {
        try {
            const db = await openDB(this.dbName, 1);
            const tx = db.transaction('apiData', 'readwrite');
            const store = tx.objectStore('apiData');

            // Supprimer toutes les données existantes de l'object store
            await store.delete(key);

            await store.put(newData, key);


            // await store.clear();

            // Ajouter les nouvelles données dans l'object store
            // for (const data of newData) {
            //     // await store.put(data);
            //     await store.put(data, key);
            // }

            // Attendre la fin de la transaction
            await tx.done;

            console.log(`Données de type ${key} mises à jour avec succès dans IndexedDB.`);
        } catch (error) {
            console.error(`Erreur lors de la mise à jour des données de ${key} dans IndexedDB:`, error);
            throw error;
        }
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

    static async updateProspectDelete(uuidProspect, newDelete, newSyncState) {
        // Obtenez la liste des prospects
        const allProspects = await this.getData('prospects') || [];

        // Recherche du prospect par son UUID
        const prospectIndex = allProspects.findIndex(prospect => prospect.uuidProspect === uuidProspect);

        if (prospectIndex !== -1) {
            // Mettre à jour l'état du prospect
            allProspects[prospectIndex].supprimer_prospect = newDelete;

            // Mettre à jour l'état de synchronisation
            allProspects[prospectIndex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('prospects', allProspects);

            return allProspects;
        } else {
            throw new Error('Avenant non trouvé');
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

    static async getBrancheProspectsByuuidProspect(uuidBrancheProspect) {
        const prospects = await this.getData('brancheprospects') || [];

        // Filtrer les prospects en fonction de uuidBrancheProspect
        const filteredProspects = prospects.filter(prospect => prospect.uuidBrancheProspect === uuidBrancheProspect);

        return filteredProspects;
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
    static async storeContrats(contrats) {
        await this.storeData('contrats', contrats);
    }

    static async deleteContrats(uuidContrat, newSupprime, newSyncState) {
        // Obtenez la liste des prospects
        const allContrats = await this.getData('contrats') || [];

        // Recherche du prospect par son UUID
        const contratIndex = allContrats.findIndex(contrat => contrat.uuidContrat === uuidContrat);

        console.log(contratIndex)

        if (contratIndex !== -1) {
            // Mettre à jour l'état du prospect
            allContrats[contratIndex].supprimer_contrat = newSupprime;

            // Mettre à jour l'état de synchronisation
            allContrats[contratIndex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('contrats', allContrats);

            console.log(allContrats)

            return allContrats;
        } else {
            throw new Error('Avenant non trouvé');
        }
    }

    static async searchContratsByName(name) {
        const allContrats = await this.getData('contrats') || [];
        const filteredContrats = allContrats.filter(contrat =>
            contrat.numero_client.toLowerCase().includes(name.toLowerCase()) ||
            contrat.nom_apporteur.toLowerCase().includes(name.toLowerCase()) ||
            contrat.nom_compagnie.toLowerCase().includes(name.toLowerCase())
        );
        return filteredContrats;
    }


    static async getContrats() {
        // return this.getData('contrats') || [];
        const allContrats = await this.getData('contrats') || [];
        const clients = await this.getData('clients') || [];
        const compagnies = await this.getData('compagnies') || [];
        const apporteurs = await this.getData('apporteurs') || [];
        const branches = await this.getData('branches') || [];

        const contrats = allContrats.filter(contrat => contrat.supprimer_contrat == 0);

        // Joindre les données des clients, apporteurs et compagnies aux contrats
        const contratsAvecDonnees = contrats.map(contrat => {
            const client = clients.find(client => client.uuidClient === contrat.uuidClient);
            const apporteur = apporteurs.find(apporteur => apporteur.uuidApporteur === contrat.uuidApporteur);
            const compagnie = compagnies.find(compagnie => compagnie.uuidCompagnie === contrat.uuidCompagnie);
            const branche = branches.find(branche => branche.uuidBranche === contrat.uuidBranche);

            return {
                ...contrat,
                client,
                apporteur,
                compagnie,
                branche
            };
        });

        return contratsAvecDonnees


        // const allContrats = await this.getData('contrats') ;
        // return allContrats.filter(contrat => contrat.supprimer_contrat == 0);
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

    static async getAvenantsByUUIDApporteur(uuidApporteur) {
        const allAvenants = await this.getData('avenants') || [];
        return allAvenants.filter(avenant => avenant.uuidApporteur === uuidApporteur);
    }

    static async getSommeCommissionsApporteur(uuidApporteur) {
        // Récupérer les données des avenants
        const avenants = await this.getAvenants();

        // Filtrer les avenants pour trouver ceux correspondant à uuidApporteur
        const avenantsApporteur = avenants.filter(avenant => avenant.uuidApporteur === uuidApporteur);

        // Calculer la somme des commissions_apporteur
        const sommeCommissions = avenantsApporteur.reduce((total, avenant) => total + avenant.commission, 0);

        return sommeCommissions;
    }

    static async getSommeCommissionsApporteurPayer(uuidApporteur) {
        // Récupérer les données des avenants
        const avenants = await this.getAvenants();

        // Filtrer les avenants pour trouver ceux correspondant à uuidApporteur et payer_apporteur = 1
        const avenantsApporteur = avenants.filter(avenant => avenant.uuidApporteur === uuidApporteur && avenant.payer_apporteur === 1);

        // Calculer la somme des commissions_apporteur
        const sommeCommissions = avenantsApporteur.reduce((total, avenant) => total + avenant.commission, 0);

        return sommeCommissions;
    }

    static async getAvenantByUuid(uuidAvenant) {
        const allAvenants = await this.getData('avenants') || [];
        return allAvenants.find(avenant => avenant.uuidAvenant === uuidAvenant);
    }


    static async updateAvenantSolde(uuidAvenant, newState, newSyncState) {
        // Obtenez la liste des prospects
        const allAvenants = await this.getData('avenants') || [];

        // Recherche du prospect par son UUID
        const avenantIndex = allAvenants.findIndex(avenant => avenant.uuidAvenant === uuidAvenant);

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
        const avenantIndex = allAvenants.findIndex(avenant => avenant.uuidAvenant === uuidAvenant);

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

    static async updateAvenantPayerApporteur(uuidAvenant, newPayer, newSyncState) {
        // Obtenez la liste des prospects
        const allAvenants = await this.getData('avenants') || [];

        // Recherche du prospect par son UUID
        const avenantIndex = allAvenants.findIndex(avenant => avenant.uuidAvenant === uuidAvenant);

        console.log(avenantIndex)

        if (avenantIndex !== -1) {
            // Mettre à jour l'état du prospect
            allAvenants[avenantIndex].payer_apporteur = newPayer;

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

    static async deleteAvenants(uuidContrat, newDelete, newSyncState) {
        // Obtenez la liste des prospects
        const allAvenants = await this.getData('avenants') || [];

        // Recherche du prospect par son UUID
        const avenantIndex = allAvenants.findIndex(avenant => avenant.uuidContrat === uuidContrat);

        console.log(avenantIndex)

        if (avenantIndex !== -1) {
            // Mettre à jour l'état de l'avenant
            allAvenants[avenantIndex].supprimer_avenant = newDelete;

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
            sommeCommissionCourtier: sommeCommissionCourtier.toFixed(2),
            sommeCommission: sommeCommission.toFixed(2)
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

    static async getAvenantsByUUIDCompagnie(uuidCompagnie) {
        const allAvenants = await this.getData('avenants') || [];
        return allAvenants.filter(avenant => avenant.uuidCompagnie === uuidCompagnie);
    }

    static async updateAvenantPayerCompagnie(uuidAvenant, newPayer, newSyncState) {
        // Obtenez la liste des prospects
        const allAvenants = await this.getData('avenants') || [];

        // Recherche du prospect par son UUID
        const avenantIndex = allAvenants.findIndex(avenant => avenant.uuidAvenant === uuidAvenant);

        console.log(avenantIndex)

        if (avenantIndex !== -1) {
            // Mettre à jour l'état du prospect
            allAvenants[avenantIndex].payer_courtier = newPayer;

            // Mettre à jour l'état de synchronisation
            allAvenants[avenantIndex].sync = newSyncState;

            // Sauvegarder les données mises à jour
            await this.updateDataInIndexedDB('avenants', allAvenants);

            return allAvenants;
        } else {
            throw new Error('Avenant non trouvé');
        }
    }

    static async getSommeCommissionsCompagnie(uuidCompagnie) {
        // Récupérer les données des avenants
        const avenants = await this.getAvenants();

        // Filtrer les avenants pour trouver ceux correspondant à uui
        const avenantsCompagnie = avenants.filter(avenant => avenant.uuidCompagnie === uuidCompagnie);

        // Calculer la somme des commissions_apporteur
        const sommeCommissions = avenantsCompagnie.reduce((total, avenant) => total + avenant.commission_courtier, 0);

        return sommeCommissions;
    }

    static async getSommeCommissionsCompagniePayer(uuidCompagnie) {
        // Récupérer les données des avenants
        const avenants = await this.getAvenants();

        // Filtrer les avenants pour trouver ceux correspondant à uuidCompagnie et payer_apporteur = 1
        const avenantsCompagnie = avenants.filter(avenant => avenant.uuidCompagnie === uuidCompagnie && avenant.payer_courtier === 1);

        // Calculer la somme des commissions_apporteur
        const sommeCommissions = avenantsCompagnie.reduce((total, avenant) => total + avenant.commission_courtier, 0);

        return sommeCommissions;
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
        const allApporteurs = await this.getData('apporteurs') || [];
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

    // static async getBranches() {
    //     const branches = await this.getData('branches') || [];
    //     return branches.filter(branch => branch.supprimer_branche === 0);
    // }



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
                // Vérifier si la commission est un nombre avant de l'ajouter à la somme
                if (!isNaN(avenant.commission)) {
                    // Ajouter la commission de cet avenant à la somme totale
                    commissionSum += parseFloat(avenant.commission);
                }
            });

            // Ajouter la commission courtier (supposant que this.comissioncourtier est une chaîne représentant un nombre)
            if (!isNaN(this.comissioncourtier)) {
                commissionSum += parseFloat(this.comissioncourtier);
            }

            // Arrondir la somme à deux chiffres après la virgule
            commissionSum = commissionSum.toFixed(2);

            // Formater la somme avec séparateur de milliers et deux chiffres après la virgule
            const formattedCommissionSum = parseFloat(commissionSum).toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Retourner la somme calculée formatée
            return formattedCommissionSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme de commission apporteur :', error);
            throw error;
        }
    }




    static async getCommissionApporteurSumByYear(annee) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des commissions
            let commissionSum = 0;

            // Parcourir les avenants pour calculer la somme des commissions d'apporteurs pour l'année spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date d'effet_police de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4); // Supposons que la propriété date_debut existe dans chaque objet avenant

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée
                if (anneeAvenant === annee.toString()) {
                    // Vérifier si la commission est un nombre avant de l'ajouter à la somme
                    if (!isNaN(avenant.commission)) {
                        // Ajouter la commission de cet avenant à la somme totale
                        commissionSum += parseFloat(avenant.commission);
                    }
                }
            });

            // Arrondir la somme à deux chiffres après la virgule
            commissionSum = commissionSum.toFixed(2);

            // Formater la somme avec le séparateur de milliers
            const formattedCommissionSum = parseFloat(commissionSum).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Retourner la somme calculée avec le séparateur de milliers et les deux chiffres après la virgule
            return formattedCommissionSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme de commission apporteur pour l\'année ' + annee + ' :', error);
            throw error;
        }
    }




    static async getCommissionCompagnieSum() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants');
    
            // Vérifier si des avenants ont été récupérés
            if (!avenants || avenants.length === 0) {
                console.warn('Aucun avenant trouvé. La somme de commission courtier est donc 0.');
                return '0,00'; // Retourner une valeur par défaut ou vide
            }
    
            // Initialiser la somme des commissions
            let commissionCourtierSum = 0;
    
            // Parcourir les avenants pour calculer la somme des commissions de courtier
            avenants.forEach(avenant => {
                // Extraire et convertir la commission de courtier en nombre
                const commission = parseFloat(avenant.commission_courtier);
    
                // Vérifier si la commission est un nombre valide
                if (!isNaN(commission)) {
                    // Ajouter la commission à la somme totale
                    commissionCourtierSum += commission;
                }
            });
    
            // Formater la somme avec un séparateur de milliers et deux chiffres après la virgule
            const formattedSum = commissionCourtierSum.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
    
            // Retourner la somme calculée formatée
            return formattedSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme de commission courtier :', error);
            throw error;
        }
    }
    

    static async getCommissionCompagnieSumByYear(annee) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des commissions de la compagnie pour l'année spécifiée
            let commissionCompagnieSum = 0;

            // Parcourir les avenants pour calculer la somme des commissions de la compagnie pour l'année spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date de début de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4); // Supposons que la propriété date_debut existe dans chaque objet avenant

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée
                if (anneeAvenant === annee.toString()) {
                    // Ajouter la commission de la compagnie de cet avenant à la somme totale
                    const commission = parseFloat(avenant.commission_courtier) || 0;
                    commissionCompagnieSum += commission;
                }
            });

            // Formater la somme avec un séparateur de milliers si nécessaire
            const formattedCommissionSum = commissionCompagnieSum.toLocaleString('fr-FR');

            // Retourner la somme calculée formatée
            return formattedCommissionSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme de commission de la compagnie pour une année spécifique :', error);
            throw error;
        }
    }




    static async getAccessoiresPrimeNetteSumWithCompanyName() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser un objet pour stocker les sommes par compagnie
            const sumsByCompany = {};

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette pour chaque compagnie
            avenants.forEach(avenant => {
                // Récupérer le nom de la compagnie
                const companyName = avenant.nom_compagnie;

                // Calculer la somme des accessoires et de la prime nette de cet avenant
                const sum = parseFloat(avenant.accessoires || 0) + parseFloat(avenant.prime_nette || 0);

                // Ajouter la somme au total de la compagnie correspondante
                if (sumsByCompany[companyName]) {
                    sumsByCompany[companyName] += sum;
                } else {
                    sumsByCompany[companyName] = sum;
                }
            });

            // Convertir l'objet en tableau d'objets pour la sortie
            const results = Object.keys(sumsByCompany).map(companyName => {
                // Arrondir chaque valeur à deux chiffres après la virgule
                return {
                    name: companyName,
                    y: sumsByCompany[companyName].toFixed(2)
                };
            });

            // Retourner le tableau contenant les résultats
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie :', error);
            throw error;
        }
    }



    static async getAccessoiresPrimeNetteSumWithCompanyNameByYear(annee) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser un objet pour stocker les sommes par nom_compagnie
            const companySums = {};

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette pour chaque compagnie
            avenants.forEach(avenant => {
                // Extraire l'année de la date d'effet_police de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4); // Supposons que la propriété effet_police existe dans chaque objet avenant

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée
                if (anneeAvenant === annee.toString()) {
                    // Convertir les valeurs d'accessoires et de prime nette en nombres décimaux
                    const accessoires = parseFloat(avenant.accessoires || 0);
                    const primeNette = parseFloat(avenant.prime_nette || 0);

                    // Calculer la somme des accessoires et de la prime nette de cet avenant
                    const sum = accessoires + primeNette;

                    // Récupérer le nom de la compagnie
                    const companyName = avenant.nom_compagnie;

                    // Ajouter la somme calculée à la compagnie correspondante dans l'objet companySums
                    if (!companySums[companyName]) {
                        companySums[companyName] = 0;
                    }
                    companySums[companyName] += sum;
                }
            });

            // Convertir l'objet companySums en un tableau de résultats
            const results = [];

            for (const companyName in companySums) {
                const sum = companySums[companyName];
                results.push({
                    name: companyName,
                    y: sum
                });
            }

            // Retourner le tableau contenant les résultats regroupés par nom_compagnie
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la compagnie pour une année spécifique :', error);
            throw error;
        }
    }





    static async getAccessoiresPrimeNetteSumWithMonth() {
        try {
            const avenants = await this.getData('avenants') || [];

            // Initialiser un objet pour stocker les sommes par mois et par année
            const sumsByMonthAndYear = {};

            // Parcourir les avenants pour calculer les sommes par mois et par année
            avenants.forEach(avenant => {
                const month = avenant.mois;
                const year = avenant.annee;

                // Calculer la somme des accessoires et de la prime nette de cet avenant
                const sum = parseFloat(avenant.accessoires || 0) + parseFloat(avenant.prime_nette || 0);

                // Créer une clé pour l'année si elle n'existe pas encore dans sumsByMonthAndYear
                if (!sumsByMonthAndYear[year]) {
                    sumsByMonthAndYear[year] = {};
                }

                // Ajouter la somme au total du mois correspondant pour cette année
                if (sumsByMonthAndYear[year][month]) {
                    sumsByMonthAndYear[year][month] += sum;
                } else {
                    sumsByMonthAndYear[year][month] = sum;
                }
            });

            // Convertir l'objet en tableau d'objets pour la sortie
            const results = [];

            // Parcourir les années et les mois dans sumsByMonthAndYear
            for (const year in sumsByMonthAndYear) {
                for (const month in sumsByMonthAndYear[year]) {
                    const sum = parseFloat(sumsByMonthAndYear[year][month].toFixed(2)); // Arrondir à deux chiffres après la virgule
                    results.push({
                        name: `${month} ${year}`,
                        y: sum
                    });
                }
            }

            // Trier les résultats par mois et année
            results.sort((a, b) => {
                // Extraire le mois et l'année des noms
                const [monthA, yearA] = a.name.split(' ');
                const [monthB, yearB] = b.name.split(' ');

                // Convertir le mois en nombre pour la comparaison
                const monthNumberA = new Date(Date.parse(`${monthA} 1, 2000`)).getMonth() + 1;
                const monthNumberB = new Date(Date.parse(`${monthB} 1, 2000`)).getMonth() + 1;

                // Comparer d'abord par année, puis par mois si les années sont égales
                if (yearA !== yearB) {
                    return yearA - yearB;
                } else {
                    return monthNumberA - monthNumberB;
                }
            });

            // Retourner le tableau contenant les résultats triés
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul des sommes par mois et par année :', error);
            throw error;
        }
    }

    static async getAccessoiresPrimeNetteSumWithMonthByYear(annee) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser le tableau de résultats
            const results = [];

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette pour chaque mois de l'année spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date d'effet_police de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4);
                // Extraire le mois de la date d'effet_police de chaque avenant et concaténer avec l'année
                const moisAvenant = `${avenant.date_debut.substring(5, 7)} ${anneeAvenant}`;

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée
                if (anneeAvenant === annee.toString()) {
                    // Trouver l'objet correspondant au mois dans le tableau de résultats
                    let monthObject = results.find(obj => obj.name === moisAvenant);

                    // Si l'objet n'existe pas, le créer et l'ajouter au tableau des résultats
                    if (!monthObject) {
                        monthObject = {
                            name: moisAvenant,
                            y: 0
                        };
                        results.push(monthObject);
                    }

                    // Ajouter la somme des accessoires et de la prime nette de cet avenant au total du mois
                    const accessoires = parseFloat(avenant.accessoires || 0);
                    const primeNette = parseFloat(avenant.prime_nette || 0);
                    monthObject.y += accessoires + primeNette;
                }
            });

            // Trier les résultats par mois (en ordre croissant)
            results.sort((a, b) => {
                // Extraire le mois et l'année des noms et convertir en nombre
                const [monthA, yearA] = a.name.split(' ');
                const [monthB, yearB] = b.name.split(' ');
                const monthNumberA = parseInt(monthA);
                const monthNumberB = parseInt(monthB);

                // Comparer par numéro de mois
                if (monthNumberA < monthNumberB) {
                    return -1;
                } else if (monthNumberA > monthNumberB) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // Retourner le tableau contenant les résultats triés par mois
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette pour chaque mois de l\'année spécifiée :', error);
            throw error;
        }
    }

    static async getAccessoiresPrimeNetteSumWithAccessory() {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser un objet pour stocker les sommes par branche
            const sumsByBranch = {};

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette pour chaque branche
            avenants.forEach(avenant => {
                // Récupérer le nom de la branche
                const branchName = avenant.nom_branche;

                // Calculer la somme des accessoires et de la prime nette de cet avenant
                const sum = parseFloat(avenant.accessoires || 0) + parseFloat(avenant.prime_nette || 0);

                // Ajouter la somme au total de la branche correspondante
                if (sumsByBranch[branchName]) {
                    sumsByBranch[branchName] += sum;
                } else {
                    sumsByBranch[branchName] = sum;
                }
            });

            // Convertir l'objet en tableau d'objets pour la sortie
            const results = Object.keys(sumsByBranch).map(branchName => {
                // Arrondir chaque valeur à deux chiffres après la virgule
                return {
                    name: branchName,
                    y: sumsByBranch[branchName].toFixed(2)
                };
            });

            // Retourner le tableau contenant les résultats
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette avec le nom de la branche :', error);
            throw error;
        }
    }


    static async getAccessoiresPrimeNetteSumWithAccessoryByYear(annee) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser le tableau de résultats
            const results = [];

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette pour chaque branche de l'année spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date d'effet_police de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4); // Supposons que la propriété effet_police existe dans chaque objet avenant

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée
                if (anneeAvenant === annee.toString()) {
                    // Trouver l'objet correspondant à la branche dans le tableau de résultats
                    let branchObject = results.find(obj => obj.name === avenant.nom_branche);

                    // Si l'objet n'existe pas, le créer et l'ajouter au tableau des résultats
                    if (!branchObject) {
                        branchObject = {
                            name: avenant.nom_branche,
                            y: 0
                        };
                        results.push(branchObject);
                    }

                    // Ajouter la somme des accessoires et de la prime nette de cet avenant au total de la branche
                    const accessoires = parseFloat(avenant.accessoires || 0);
                    const primeNette = parseFloat(avenant.prime_nette || 0);
                    branchObject.y += accessoires + primeNette;
                }
            });

            // Retourner le tableau contenant les résultats
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette pour chaque branche de l\'année spécifiée :', error);
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
                sum += (avenant.accessoire || 0) + (avenant.prime_nette || 0) + (avenant.taxes_totales || 0) + (avenant.frais_courtier || 0);
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

            // Initialiser la somme des émissions
            let totalEmissions = 0;

            // Parcourir les avenants pour calculer la somme des émissions
            avenants.forEach(avenant => {
                // Extraire les valeurs d'accessoires, prime nette et frais courtier de l'avenant
                const accessoires = parseFloat(avenant.accessoires) || 0;
                const primeNette = parseFloat(avenant.prime_nette) || 0;
                const fraisCourtier = parseFloat(avenant.frais_courtier) || 0;

                // Ajouter les montants à la somme totale des émissions
                totalEmissions += accessoires + primeNette + fraisCourtier;
            });

            // Arrondir la somme à deux chiffres après la virgule
            const roundedTotalEmissions = totalEmissions.toFixed(2);

            // Convertir en nombre pour vérifier s'il y a des décimales
            const numberValue = parseFloat(roundedTotalEmissions);

            // Formater la somme avec un séparateur de milliers et deux chiffres après la virgule
            const formattedTotalEmissions = numberValue.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Retourner la somme calculée formatée
            return formattedTotalEmissions;

        } catch (error) {
            console.error('Erreur lors du calcul de la somme des émissions :', error);
            throw error;
        }
    }


    static async getEmissionsByYear(annee) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];

            // Initialiser la somme des émissions
            let totalEmissions = 0;

            // Parcourir les avenants pour calculer la somme des émissions pour l'année spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date d'effet_police de chaque avenant
                const dateDebut = avenant.date_debut; // Supposons que la propriété date_debut existe dans chaque objet avenant
                const anneeAvenant = new Date(dateDebut).getFullYear(); // Obtenir l'année à partir de la date de début

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée
                if (anneeAvenant === annee) {
                    // Calculer la somme des émissions de cet avenant (accessoires, prime nette et frais courtier)
                    const sum = (parseFloat(avenant.accessoires) || 0) + (parseFloat(avenant.prime_nette) || 0) + (parseFloat(avenant.frais_courtier) || 0);

                    // Ajouter la somme calculée à la somme totale
                    totalEmissions += sum;
                }
            });

            // Arrondir la somme à deux chiffres après la virgule
            totalEmissions = totalEmissions.toFixed(2);

            // Formater la somme avec séparateur de milliers et deux chiffres après la virgule
            const formattedEmissions = parseFloat(totalEmissions).toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Retourner la somme des émissions calculée pour l'année spécifiée, formatée
            return formattedEmissions;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des émissions pour une année spécifique :', error);
            throw error;
        }
    }



    //Sinistres

    static async storeSinistres(sinistres) {
        await this.storeData('sinistres', sinistres);
    }

    static async searchSinistresByName(name) {
        const allSinistres = await this.getData('sinistres') || [];
        const filteredSinistres = allSinistres.filter(sinistre => sinistre.nom_branche.toLowerCase().includes(name.toLowerCase()));
        return filteredSinistres;
    }

    static async getSinistres() {

        // Récupérer les données des différentes tables
        const sinistres = await this.getData('sinistres') || [];
        const clients = await this.getData('clients') || [];
        const contrats = await this.getData('contrats') || [];
        const branches = await this.getData('branches') || [];

        // Joindre les données des clients, branches et contrats aux sinistres
        const contratsAvecDonnees = sinistres.map(sinistre => {
            const contrat = contrats.find(contrat => contrat.uuidContrat === sinistre.uuidContrat);
            const client = clients.find(client => client.uuidClient === contrat.uuidClient);
            const branche = branches.find(branche => branche.uuidBranche === contrat.uuidBranche);

            return {
                ...sinistre,
                client,
                contrat,
                branche
            };
        });

        return contratsAvecDonnees;
    }

    static async getInfoSinistreByUuid(uuidSinistre) {

        const sinistres = await this.getSinistres();
        const sinistreTrouve = sinistres.find(sinistre => sinistre.uuidSinistre === uuidSinistre);

        const contrats = await this.getData('contrats') || [];

        const contrat = contrats.find(contrat => contrat.uuidContrat === sinistreTrouve.uuidContrat);
        const sinistreAvecDonnees = {
            ...sinistreTrouve,
            contrat
        };

        return sinistreAvecDonnees;

    }

    //Reglements
    static async storeReglements(reglements) {
        await this.storeData('reglements', reglements);
    }

    static async getReglements() {
        return this.getData('reglements') || [];
    }

    static async getReglementsByUuidSinistre(uuidSinistre) {
        const allReglements = await this.getReglements();

        // Filtrer les avenants en fonction de l'uuidReglement
        const reglementsByUuidSinistre = allReglements.filter(reglement => reglement.uuidSinistre === uuidSinistre);

        return reglementsByUuidSinistre;

    }

    static async getSommeReglementsByUuidSinistre(uuidSinistre) {
        // Obtenir tous les règlements
        const reglements = await this.getData('reglements') || [];

        // // Filtrer les règlements par uuidSinistre spécifié
        const reglementsByUuidSinistre = reglements.filter(reglement => reglement.uuidSinistre === uuidSinistre);

        // Calculer la somme des règlements par uuidSinistre
        const sumByUuidSinistre = reglementsByUuidSinistre.reduce((total, reglement) => total + reglement.montant, 0);

        // Retourner les règlements par uuidSinistre ainsi que la somme des règlements
        return sumByUuidSinistre

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

    static async getContratsByYear(annee) {

        // Récupérer tous les contrats
        const contrats = await this.getContrats();

        // Filtrer les contrats pour obtenir ceux de l'année spécifiée
        const contratsDeAnnee = contrats.filter(contrat => {
            // Extraire l'année de l'effet_police de chaque contrat
            const anneeEffetPolice = contrat.effet_police.substring(0, 4); // Supposons que la propriété effet_police existe dans chaque objet contrat

            // Vérifier si l'année de l'effet_police du contrat correspond à l'année spécifiée
            return anneeEffetPolice === annee.toString(); // Convertir l'année spécifiée en chaîne de caractères pour la comparaison
        });


        return contratsDeAnnee;
    }

    static async getContratsExpireByYear(annee) {
        try {
            // Récupérer tous les contrats
            const contrats = await this.getData('contrats') || [];

            // Filtrer les contrats pour obtenir ceux qui expirent dans l'année spécifiée
            const contratsExpirantDansAnnee = contrats.filter(contrat => {
                // Extraire l'année de l'expiration de chaque contrat
                const anneeExpiration = contrat.expire_le.substring(0, 4);

                // Vérifier si l'année d'expiration du contrat correspond à l'année spécifiée
                return anneeExpiration === annee.toString();
            });


            return contratsExpirantDansAnnee;
        } catch (error) {
            console.error('Erreur lors de la récupération des contrats expirant dans une année :', error);
            throw error;
        }
    }

    static async getContratsByBranch(annee, branche) {
        // Récupérer tous les contrats
        const contrats = await this.getData('contrats') || [];

        // Filtrer les contrats par année et branche
        const contratsFiltres = contrats.filter(contrat => {

            const anneeEffet = contrat.effet_police.substring(0, 4);

            return anneeEffet === annee.toString() && contrat.uuidBranche === branche;
        });

        return contratsFiltres;
    }

    static async getContratsExpireByBranch(annee, branche) {
        const contrats = await this.getData('contrats') || [];

        // Filtrer les contrats pour obtenir ceux qui expirent dans l'année spécifiée
        const contratsFiltres = contrats.filter(contrat => {
            // Extraire l'année de l'expiration de chaque contrat
            const anneeExpiration = contrat.expire_le.substring(0, 4);

            // Vérifier si l'année d'expiration du contrat correspond à l'année spécifiée
            return anneeExpiration === annee.toString() && contrat.uuidBranche === branche;
        });


        return contratsFiltres;
    }




    static async getCommissionApporteurSumByBranch(annee, branche) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];
            const branches = await this.getData('branches') || [];

            // Initialiser la somme des commissions
            let commissionSum = 0;

            // Parcourir les avenants pour calculer la somme des commissions d'apporteurs pour l'année spécifiée et la branche spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date de début de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4);

                let uuidBrancheFound = null; // Initialiser la variable pour stocker l'UUID trouvé

                // Parcourir les branches pour trouver l'UUID correspondant au nom de la branche spécifié
                for (const branch of branches) {
                    if (branch.nom_branche === avenant.nom_branche) {
                        uuidBrancheFound = branch.uuidBranche; // Stocker l'UUID de la branche trouvée
                        break; // Sortir de la boucle dès qu'une correspondance est trouvée
                    }
                }

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée et que la branche correspond
                if (anneeAvenant === annee.toString() && uuidBrancheFound && uuidBrancheFound === branche) {
                    // Convertir la commission d'apporteur en nombre décimal
                    const commission = parseFloat(avenant.commission || 0);

                    // Ajouter la commission de cet avenant à la somme totale
                    commissionSum += commission;
                }
            });

            // Formater la somme calculée avec séparateur de milliers et deux chiffres après la virgule
            const formattedCommissionSum = commissionSum.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Retourner la somme calculée formatée
            return formattedCommissionSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des commissions :', error);
            throw error;
        }
    }

    static async getCommissionCompagnieSumByBranch(annee, branche) {
        try {
            // Obtenir les données des avenants
            const avenants = await this.getData('avenants') || [];
            const branches = await this.getData('branches') || [];

            // Initialiser la somme des commissions
            let commissionSum = 0;

            // Parcourir les avenants pour calculer la somme des commissions d'apporteurs pour l'année spécifiée et la branche spécifiée
            avenants.forEach(avenant => {
                // Extraire l'année de la date de début de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4);
                let uuidBrancheFound = null; // Initialiser la variable pour stocker l'UUID trouvé

                // Parcourir les branches pour trouver l'UUID correspondant au nom de la branche spécifié
                for (const branch of branches) {
                    if (branch.nom_branche === avenant.nom_branche) {
                        uuidBrancheFound = branch.uuidBranche; // Stocker l'UUID de la branche trouvée
                        break; // Sortir de la boucle dès qu'une correspondance est trouvée
                    }
                }

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée et que la branche correspond
                if (anneeAvenant === annee.toString() && uuidBrancheFound && uuidBrancheFound === branche) {
                    // Convertir la commission d'apporteur en nombre décimal
                    const commission = parseFloat(avenant.commission_courtier || 0);

                    // Ajouter la commission de cet avenant à la somme totale
                    commissionSum += commission;
                }
            });

            // Formater la somme calculée avec séparateur de milliers et deux chiffres après la virgule
            const formattedCommissionSum = commissionSum.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Retourner la somme calculée formatée
            return formattedCommissionSum;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des commissions :', error);
            throw error;
        }
    }




    static async getAccessoiresPrimeNetteSumWithCompanyNameByBranch(annee, branche) {
        try {
            const avenants = await this.getData('avenants') || [];
            const branches = await this.getData('branches') || [];

            // Initialiser le tableau de résultats
            const results = [];

            // Parcourir les avenants pour calculer la somme des accessoires et de la prime nette pour chaque compagnie
            avenants.forEach(avenant => {
                // Extraire l'année de la date d'effet_police de chaque avenant
                const anneeAvenant = avenant.date_debut.substring(0, 4);
                let uuidBrancheFound = null; // Initialiser la variable pour stocker l'UUID trouvé

                // Parcourir les branches pour trouver l'UUID correspondant au nom de la branche spécifié
                for (const branch of branches) {
                    if (branch.nom_branche === avenant.nom_branche) {
                        uuidBrancheFound = branch.uuidBranche; // Stocker l'UUID de la branche trouvée
                        break; // Sortir de la boucle dès qu'une correspondance est trouvée
                    }
                }

                // Vérifier si l'année de l'avenant correspond à l'année spécifiée et que la branche correspond
                if (anneeAvenant === annee.toString() && uuidBrancheFound && uuidBrancheFound === branche) {
                    // Convertir les valeurs d'accessoires et de prime nette en nombres décimaux
                    const accessoires = parseFloat(avenant.accessoires || 0);
                    const primeNette = parseFloat(avenant.prime_nette || 0);

                    // Calculer la somme des accessoires et de la prime nette de cet avenant
                    const sum = accessoires + primeNette;

                    // Ajouter la somme calculée et le nom de la compagnie au tableau des résultats
                    results.push({
                        name: avenant.nom_compagnie,
                        y: sum
                    });
                }
            });

            // Retourner le tableau contenant les résultats
            return results;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette pour chaque compagnie dans une branche spécifique :', error);
            throw error;
        }
    }


    static async getAccessoiresPrimeNetteSumWithMonthByBranch(annee, branche) {
        try {
            const avenants = await this.getData('avenants') || [];
            const branches = await this.getData('branches') || [];

            const results = [];

            avenants.forEach(avenant => {
                const anneeAvenant = avenant.date_debut.substring(0, 4); // Année de l'avenant
                // const moisAvenant = avenant.date_debut.substring(5, 7); // Mois de l'avenant
                const moisAvenant = `${avenant.date_debut.substring(5, 7)} ${anneeAvenant}`;

                let uuidBrancheFound = null;

                for (const branch of branches) {
                    if (branch.nom_branche === avenant.nom_branche) {
                        uuidBrancheFound = branch.uuidBranche;
                        break;
                    }
                }

                if (anneeAvenant === annee.toString()) {
                    if (uuidBrancheFound && uuidBrancheFound === branche) {
                        let monthObject = results.find(obj => obj.name === moisAvenant);

                        if (!monthObject) {
                            monthObject = {
                                name: moisAvenant,
                                y: 0
                            };
                            results.push(monthObject);
                        }

                        // Convertir les valeurs en nombres avant l'addition
                        const accessoires = parseFloat(avenant.accessoires) || 0;
                        const primeNette = parseFloat(avenant.prime_nette) || 0;

                        // Ajouter la somme des accessoires et de la prime nette au total du mois
                        monthObject.y += accessoires + primeNette;
                    }
                }
            });

            // Formater les résultats avec séparateur de milliers
            const formattedResults = results.map(result => ({
                name: result.name,
                y: result.y // Ajouter le séparateur de milliers
            }));

            return formattedResults;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette pour chaque mois de l\'année spécifiée :', error);
            throw error;
        }
    }


    static async getAccessoiresPrimeNetteSumWithAccessoryByBranch(annee, branche) {
        try {
            const avenants = await this.getData('avenants') || [];
            const branches = await this.getData('branches') || [];

            const results = [];

            avenants.forEach(avenant => {
                const anneeAvenant = avenant.date_debut.substring(0, 4);

                let uuidBrancheFound = null;

                for (const branch of branches) {
                    if (branch.nom_branche === avenant.nom_branche) {
                        uuidBrancheFound = branch.uuidBranche;
                        break;
                    }
                }

                if (anneeAvenant === annee.toString()) {
                    if (uuidBrancheFound && uuidBrancheFound === branche) {
                        let branchObject = results.find(obj => obj.name === avenant.nom_branche);

                        if (!branchObject) {
                            branchObject = {
                                name: avenant.nom_branche,
                                y: 0
                            };
                            results.push(branchObject);
                        }

                        // Convertir les valeurs en nombres avant l'addition
                        const accessoires = parseFloat(avenant.accessoires) || 0;
                        const primeNette = parseFloat(avenant.prime_nette) || 0;

                        // Ajouter la somme des accessoires et de la prime nette au total de la branche
                        branchObject.y += accessoires + primeNette;
                    }
                }
            });

            // Formater les résultats avec séparateur de milliers
            const formattedResults = results.map(result => ({
                name: result.name,
                y: result.y  // Ajouter le séparateur de milliers
            }));



            return formattedResults;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des accessoires et de la prime nette pour chaque branche de l\'année spécifiée :', error);
            throw error;
        }
    }


    static async getEmissionsByBranch(annee, branche) {
        try {
            const avenants = await this.getData('avenants') || [];
            const branches = await this.getData('branches') || [];

            let totalEmissions = 0;

            avenants.forEach(avenant => {
                const anneeAvenant = avenant.date_debut.substring(0, 4);

                let uuidBrancheFound = null;

                for (const branch of branches) {
                    if (branch.nom_branche === avenant.nom_branche) {
                        uuidBrancheFound = branch.uuidBranche;
                        break;
                    }
                }

                if (anneeAvenant === annee.toString()) {
                    if (uuidBrancheFound && uuidBrancheFound === branche) {
                        // Convertir les valeurs en nombres avant l'addition
                        const accessoires = parseFloat(avenant.accessoires) || 0;
                        const primeNette = parseFloat(avenant.prime_nette) || 0;
                        const fraisCourtier = parseFloat(avenant.frais_courtier) || 0;

                        const sum = accessoires + primeNette + fraisCourtier;

                        // Ajouter la somme calculée à la somme totale
                        totalEmissions += sum;
                    }
                }
            });

            // Formater la somme des émissions avec séparateur de milliers
            const formattedTotalEmissions = totalEmissions.toLocaleString();

            return formattedTotalEmissions;
        } catch (error) {
            console.error('Erreur lors du calcul de la somme des émissions pour une année spécifique :', error);
            throw error;
        }
    }



    static async getDataByYearAndBranch(year, branch) {
        if (branch == 'Aucune branche sélectionnée') {
            // Si year est null, compter les prospects, les clients et les sinistres
            const contrats = await this.getContrats();
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
                compagnies: compagnies,
                primes: primes,
                accessoires: accessoires,
                countemission: emissionssum
            };
        } else {
            if (branch == 'tous') {



                const contrats = await this.getContratsByYear(year);
                const prospects = await this.getData('prospects') || [];
                const clients = await this.getData('clients') || [];
                const sinistres = await this.getData('sinistres') || [];

                // Récupérer le nombre de contrats expirés
                const expiredContractsCount = await this.getContratsExpireByYear(year);

                const commissionApporteurSumYear = await this.getCommissionApporteurSumByYear(year);
                const commissionCompagnieSumYear = await this.getCommissionCompagnieSumByYear(year);
                const compagnies = await this.getAccessoiresPrimeNetteSumWithCompanyNameByYear(year);
                const primes = await this.getAccessoiresPrimeNetteSumWithMonthByYear(year);
                const accessoires = await this.getAccessoiresPrimeNetteSumWithAccessoryByYear(year);
                const emissionssum = await this.getEmissionsByYear(year);

                return {
                    contratsCount: contrats.length,
                    prospectsCount: prospects.length,
                    clientsCount: clients.length,
                    sinistresCount: sinistres.length,
                    expiredContractsCount: expiredContractsCount.length,
                    commissionApporteurSum: commissionApporteurSumYear,
                    commissionCompagnieSum: commissionCompagnieSumYear,
                    compagnies: compagnies,
                    primes: primes,
                    accessoires: accessoires,
                    countemission: emissionssum
                };


            } else {
                const contrats = await this.getContratsByBranch(year, branch);
                const prospects = await this.getData('prospects') || [];
                const clients = await this.getData('clients') || [];
                const sinistres = await this.getData('sinistres') || [];
                // Récupérer le nombre de contrats expirés
                const expiredContractsCount = await this.getContratsExpireByBranch(year, branch);
                const commissionApporteurSumBranch = await this.getCommissionApporteurSumByBranch(year, branch);
                const commissionCompagnieSumBranch = await this.getCommissionCompagnieSumByBranch(year, branch);
                const compagnies = await this.getAccessoiresPrimeNetteSumWithCompanyNameByBranch(year, branch);
                const primes = await this.getAccessoiresPrimeNetteSumWithMonthByBranch(year, branch);
                const accessoires = await this.getAccessoiresPrimeNetteSumWithAccessoryByBranch(year, branch);
                const emissionssum = await this.getEmissionsByBranch(year, branch);


                return {
                    contratsCount: contrats.length,
                    prospectsCount: prospects.length,
                    clientsCount: clients.length,
                    sinistresCount: sinistres.length,
                    expiredContractsCount: expiredContractsCount.length,
                    commissionApporteurSum: commissionApporteurSumBranch,
                    commissionCompagnieSum: commissionCompagnieSumBranch,
                    compagnies: compagnies,
                    primes: primes,
                    accessoires: accessoires,
                    countemission: emissionssum
                };

            }
        }

    }

    static async getDataStatistique() {
        try {
            // Récupérer les données des différentes tables
            const contrats = await this.getData('contrats') || [];
            const clients = await this.getData('clients') || [];
            const compagnies = await this.getData('compagnies') || [];
            const apporteurs = await this.getData('apporteurs') || [];

            // Joindre les données des clients, apporteurs et compagnies aux contrats
            const contratsAvecDonnees = contrats.map(contrat => {
                const client = clients.find(client => client.uuidClient === contrat.uuidClient);
                const apporteur = apporteurs.find(apporteur => apporteur.uuidApporteur === contrat.uuidApporteur);
                const compagnie = compagnies.find(compagnie => compagnie.uuidCompagnie === contrat.uuidCompagnie);

                return {
                    ...contrat,
                    client,
                    apporteur,
                    compagnie
                };
            });

            return contratsAvecDonnees
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données:", error);
            return {
                contrats: []
            };
        }
    }

    static async store(token, user, id, entreprise, role, contact, adresse, email) {
        await this.storeToken(token);
        await this.storeUser(user);
        await this.storeId(id);
        await this.storeEntreprise(entreprise);
        await this.storeRole(role);
        await this.storeContact(contact);
        await this.storeAdresse(adresse);
        await this.storeEmail(email);
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

    static getContact() {
        return localStorage.getItem('contact');
    }

    static getAdresse() {
        return localStorage.getItem('adresse');
    }

    static getEmail() {
        return localStorage.getItem('email');
    }

    static async clearClients() {
        await this.clearData('clients');
    }

}

export default AppStorage;