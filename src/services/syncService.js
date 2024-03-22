// SyncService.js
import AppStorage from '../db/AppStorage.js';
export default {
    async checkAndSyncData() {
        const branchesToSync = await this.getBranchesToSync();
        const prospectsToSync = await this.getProspectsToSync();
        const clientsToSync = await this.getClientsToSync();
        const compagniesToSync = await this.getCompagniesToSync();
        const tauxcompagniesToSync = await this.getTauxCompagniesToSync();
        const apporteursToSync = await this.getApporteursToSync();
        const tauxapporteursToSync = await this.getTauxApporteursToSync();
        const contratsToSync = await this.getContratsToSync();
        const avenantsToSync = await this.getAvenantsToSync();
        const automobilesToSync = await this.getAutomobilesToSync();
        const garantiesToSync = await this.getGarantiesToSync();

        // Synchroniser uniquement les données qui ont sync = 0
        if (branchesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-branches', branchesToSync, 'branches');
        }

        if (prospectsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-prospects', prospectsToSync, 'prospects');
        }

        if (clientsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-clients', clientsToSync, 'clients');
        }

        if (compagniesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-compagnies', compagniesToSync, 'compagnies');
        }

        if (tauxcompagniesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-tauxcompagnies', tauxcompagniesToSync, 'tauxcompagnies');
        }

        if (apporteursToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-apporteurs', apporteursToSync, 'apporteurs');
        }

        if (tauxapporteursToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-tauxapporteurs', tauxapporteursToSync, 'tauxapporteurs');
        }

        if (contratsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-contrats', contratsToSync, 'contrats');
        }

        if (avenantsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-avenants', avenantsToSync, 'avenants');
        }

        if (automobilesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-automobiles', automobilesToSync, 'avenants');
        }

        if (garantiesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-garanties', garantiesToSync, 'garanties');
        }
    },

    async getBranchesToSync() {
        const queue = await AppStorage.getBranches();
        return queue.filter(branche => branche.sync === 0);
    },

    async getProspectsToSync() {
        const queue = await AppStorage.getProspects();
        return queue.filter(prospect => prospect.sync === 0);
    },


    async getClientsToSync() {
        const queue = await AppStorage.getClients();
        return queue.filter(client => client.sync === 0);
    },


    async getCompagniesToSync() {
        const queue = await AppStorage.getCompagnies();
        return queue.filter(compagnie => compagnie.sync === 0);
    },

    async getTauxCompagniesToSync() {
        const queue = await AppStorage.getTauxCompagnies();
        return queue.filter(tauxcompagnie => tauxcompagnie.sync === 0);
    },

    async getApporteursToSync() {
        const queue = await AppStorage.getApporteurs();
        return queue.filter(apporteur => apporteur.sync === 0);
    },

    async getTauxApporteursToSync() {
        const queue = await AppStorage.getTauxApporteurs();
        return queue.filter(tauxapporteur => tauxapporteur.sync === 0);
    },

    async getContratsToSync() {
        const queue = await AppStorage.getContrats();
        return queue.filter(contrat => contrat.sync === 0);
    },

    async getAvenantsToSync() {
        const queue = await AppStorage.getAvenants();
        return queue.filter(avenant => avenant.sync === 0);
    },

    async getAutomobilesToSync() {
        const queue = await AppStorage.getAutomobiles();
        return queue.filter(automobile => automobile.sync === 0);
    },

    async getGarantiesToSync() {
        const queue = await AppStorage.getGaranties();
        return queue.filter(garantie => garantie.sync === 0);
    },



    async syncData(endpoint, dataToSync, dataType) {
        const token = AppStorage.getToken();

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'x-access-token': token
                },
                body: JSON.stringify(dataToSync),
            });

            if (response.ok) {
                console.log(`La synchronisation des ${dataType} a réussi.`);
                await this.handleSuccessfulSync(dataType)

                // AppStorage.clearSyncedData(dataType);
            } else {
                console.error(`La synchronisation des ${dataType} a échoué.`);
            }
        } catch (error) {
            console.error(`Erreur lors de la synchronisation des ${dataType} :`, error);
        }
    },

    async handleSuccessfulSync(dataType) {
        // Vous pouvez stocker les types de données synchronisés avec succès
        // AppStorage.storeSuccessfulSync(dataType);

        // Ensuite, récupérez les données mises à jour pour le type de données synchronisé avec succès
        const updatedData = await this.fetchUpdatedData(dataType);
        // Vous pouvez ensuite traiter ces données mises à jour, par exemple, les enregistrer dans la base de données locale, etc.
        console.log(`Données mises à jour pour ${dataType}:`, updatedData);
    },

    async fetchUpdatedData(dataTypes) {
        try {
            // Initialise un objet pour stocker les données mises à jour
            const updatedData = {};
    
            // Boucle à travers chaque type de données spécifié
            for (const dataType of dataTypes) {
                // Effectue une requête pour récupérer les données mises à jour pour le type actuel
                const response = await fetch(`https://fl4ir.loca.lt/api/auth/get${dataType}`);
                
                if (response.ok) {
                    // Convertit la réponse en format JSON et stocke les données dans l'objet mis à jour
                    updatedData[dataType] = await response.json();
                } else {
                    // Affiche un message d'erreur si la requête échoue pour ce type de données
                    console.error(`La requête pour récupérer les données mises à jour pour ${dataType} a échoué.`);
                }
            }
    
            // Retourne l'objet contenant les données mises à jour pour chaque type
            return updatedData;
        } catch (error) {
            // Affiche une erreur si une exception survient pendant le processus
            console.error('Erreur lors de la récupération des données mises à jour:', error);
            return null;
        }
    }
    
};
