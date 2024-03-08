// SyncService.js
import AppStorage from '../utils/helpers/AppStorage';

export default {
    async checkAndSyncData() {
        const clientsToSync = await this.getClientsToSync();
        const prospectsToSync = await this.getProspectsToSync();
        const branchesToSync = await this.getBranchesToSync();
        const compagniesToSync = await this.getCompagniesToSync();
        const apporteursToSync = await this.getApporteursToSync();
        const contratsToSync = await this.getContratsToSync();

        // Synchroniser uniquement les données qui ont sync = 0
        if (clientsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-clients', clientsToSync, 'clients');
        }

        if (prospectsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-prospects', prospectsToSync, 'prospects');
        }

        if (branchesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-branches', branchesToSync, 'branches');
        }

        if (compagniesToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-compagnies', compagniesToSync, 'compagnies');
        }

        if (apporteursToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-apporteurs', apporteursToSync, 'apporteurs');
        }

        if (contratsToSync.length > 0) {
            await this.syncData('https://fl4ir.loca.lt/api/auth/sync-contrats', contratsToSync, 'contrats');
        }
    },

    async getClientsToSync() {
        const queue = await AppStorage.getClients();
        return queue.filter(client => client.sync === 0);
    },

    async getProspectsToSync() {
        const queue = await AppStorage.getProspects();
        return queue.filter(prospect => prospect.sync === 0);
    },

    async getBranchesToSync() {
        const queue = await AppStorage.getBranches();
        return queue.filter(branche => branche.sync === 0);
    },

    async getCompagniesToSync() {
        const queue = await AppStorage.getCompagnies();
        return queue.filter(compagnie => compagnie.sync === 0);
    },

    async getApporteursToSync() {
        const queue = await AppStorage.getApporteurs();
        return queue.filter(apporteur => apporteur.sync === 0);
    },

    async getContratsToSync() {
        const queue = await AppStorage.getContrats();
        return queue.filter(contrat => contrat.sync === 0);
    },

    async syncData(endpoint, dataToSync, dataType) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSync),
            });

            if (response.ok) {
                AppStorage.clearSyncedData(dataType);
            } else {
                console.error(`La synchronisation des ${dataType} a échoué.`);
            }
        } catch (error) {
            console.error(`Erreur lors de la synchronisation des ${dataType} :`, error);
        }
    },
};






// // SyncService.js
// import AppStorage from '../utils/helpers/AppStorage';

// export default {
//   async checkAndSyncData() {
//     const dataTypes = ['clients', 'prospects', 'branches', 'compagnies', 'apporteurs', 'contrats'];

//     for (const dataType of dataTypes) {
//       const dataToSync = await this[`get${capitalize(dataType)}ToSync`]();
//       if (dataToSync.length > 0) {
//         await this.syncData(`/api/auth/sync-${dataType}`, dataToSync, dataType);
//       }
//     }
//   },

//   async getClientsToSync() {
//     return this.getToSync('clients');
//   },

//   async getProspectsToSync() {
//     return this.getToSync('prospects');
//   },

//   async getBranchesToSync() {
//     return this.getToSync('branches');
//   },

//   async getCompagniesToSync() {
//     return this.getToSync('compagnies');
//   },

//   async getApporteursToSync() {
//     return this.getToSync('apporteurs');
//   },

//   async getContratsToSync() {
//     return this.getToSync('contrats');
//   },

//   async getToSync(dataType) {
//     const queue = await AppStorage[`get${capitalize(dataType)}`]();
//     return queue.filter(dataItem => dataItem.sync === 0);
//   },

//   async syncData(endpoint, dataToSync, dataType) {
//     try {

//       const token = AppStorage.getToken();

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Include the token in the header
//         },
//         body: JSON.stringify(dataToSync),
//       });

//       if (response.ok) {
//         // AppStorage.clearSyncedData(dataType);
//         console.log("Merci")
//       } else {
//         console.error(`La synchronisation des ${dataType} a échoué. Statut : ${response.status}`);
//       }
//     } catch (error) {
//       console.error(`Erreur lors de la synchronisation des ${dataType} :`, error.message || error);
//     }
//   },
// };

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }