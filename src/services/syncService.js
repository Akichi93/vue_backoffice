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
                console.error(`La synchronisation des ${dataType} a reussi.`);
                // AppStorage.clearSyncedData(dataType);
            } else {
                console.error(`La synchronisation des ${dataType} a échoué.`);
            }
        } catch (error) {
            console.error(`Erreur lors de la synchronisation des ${dataType} :`, error);
        }
    },
};
