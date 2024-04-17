// SyncService.js
import AppStorage from '../db/AppStorage.js';
import DataAPI from '../db/DataAPI.js';
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({
    /* options */
});

export default {
    syncedTables: [], // Tableau pour stocker les tables synchronisées

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
        const sinistresToSync = await this.getSinistresToSync();
        const reglementsToSync = await this.getReglementsToSync();

        const categoriesToSync = await this.getCategoriesToSync();
        const marquesToSync = await this.getMarquesToSync();
        const genresToSync = await this.getGenresToSync();
        const couleursToSync = await this.getCouleursToSync();
        const energiesToSync = await this.getEnergiesToSync();

        let syncMessageDisplayed = false; // Ajouter un drapeau pour suivre si le message a été affiché

        // Vérifier s'il y a des données à synchroniser
        const anyDataToSync = branchesToSync.length > 0 || prospectsToSync.length > 0 || clientsToSync.length > 0 || compagniesToSync.length > 0 || tauxcompagniesToSync.length > 0 || apporteursToSync.length > 0 || tauxapporteursToSync.length > 0 || contratsToSync.length > 0 || avenantsToSync.length > 0 || automobilesToSync.length > 0 || garantiesToSync.length > 0 || sinistresToSync.length > 0 || reglementsToSync.length > 0 || categoriesToSync.length > 0 || marquesToSync.length > 0 || genresToSync.length > 0 || couleursToSync.length > 0 || energiesToSync.length > 0;

        // Si des données doivent être synchronisées et que le message n'a pas été affiché, informer l'utilisateur que la synchronisation commence
        if (anyDataToSync && !syncMessageDisplayed) {
            toaster.info(`La synchronisation des données commence`, {
                position: "top-right",
            });
            syncMessageDisplayed = true; // Mettre à jour le drapeau pour indiquer que le message a été affiché
        }

        const base_url = import.meta.env.VITE_API_BASE_URL;
        const syncPromises = [];

        if (branchesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-branches`, branchesToSync, 'branches'));
        }

        if (prospectsToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-prospects`, prospectsToSync, 'prospects'));
        }

        if (clientsToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-clients`, clientsToSync, 'clients'));
        }

        if (compagniesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-compagnies`, compagniesToSync, 'compagnies'));
        }

        if (tauxcompagniesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-tauxcompagnies`, tauxcompagniesToSync, 'tauxcompagnies'));
        }

        if (apporteursToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-apporteurs`, apporteursToSync, 'apporteurs'));
        }

        if (tauxapporteursToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-tauxapporteurs`, tauxapporteursToSync, 'tauxapporteurs'));
        }

        if (contratsToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-contrats`, contratsToSync, 'contrats'));
        }

        if (avenantsToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-avenants`, avenantsToSync, 'avenants'));
        }

        if (automobilesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-automobiles`, automobilesToSync, 'automobiles'));
        }

        if (garantiesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-garanties`, garantiesToSync, 'garanties'));
        }

        if (sinistresToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-sinistres`, sinistresToSync, 'sinistres'));
        }

        if (reglementsToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-reglements`, reglementsToSync, 'reglements'));
        }

        if (categoriesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-categories`, categoriesToSync, 'categories'));
        }

        if (marquesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-marques`, marquesToSync, 'marques'));
        }

        if (genresToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-genres`, genresToSync, 'genres'));
        }

        if (couleursToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-couleurs`, couleursToSync, 'couleurs'));
        }

        if (energiesToSync.length > 0) {
            syncPromises.push(this.syncData(`${base_url}/api/auth/sync-energies`, energiesToSync, 'energies'));
        }

        // Attendre que toutes les synchronisations soient terminées
        await Promise.all(syncPromises);

        // Ajoutez une variable pour suivre si la synchronisation a été effectuée avec succès
        let syncSuccessDisplayed = false;

        // Vérifier s'il y a eu des synchronisations
        const anySynced = this.syncedTables.length > 0;

        // Afficher le message de succès uniquement s'il y a eu des synchronisations et si le message n'a pas encore été affiché
        if (anySynced && !syncSuccessDisplayed) {
            // Marquez le message de succès comme déjà affiché
            syncSuccessDisplayed = true;

            // Effectuez la récupération des données graves
            await this.retrieveGraveData();

            // Affichez le message de succès
            toaster.success(`Synchronisation effectuée avec succès`, {
                position: "top-right",
            });
        } else {
            console.log('Aucune donnée à synchroniser.');
        }


    },

    async retrieveGraveData() {

        for (const table of this.syncedTables) {
            switch (table) {
                case 'branches':
                    const branchesData = await DataAPI.getGraveBranchesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des branches synchronisées :', branchesData);
                    break;
                case 'prospects':
                    const prospectsData = await DataAPI.getGraveProspectsData();
                    // console.log('Données graves des prospects synchronisés :', prospectsData);
                    break;
                case 'clients':
                    const clientsData = await DataAPI.getGraveClientsData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des clients synchronisés :', clientsData);
                    break;
                case 'compagnies':
                    const compagniesData = await DataAPI.getGraveCompagniesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des compagnies synchronisés :', compagniesData);
                    break;
                case 'tauxcompagnies':
                    const tauxcompagniesData = await DataAPI.getGraveTauxCompagniesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des taux compagnies synchronisés :', tauxcompagniesData);
                    break;
                case 'apporteurs':
                    const apporteursData = await DataAPI.getGraveApporteursData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des apporteurs synchronisés :', apporteursData);
                    break;
                case 'tauxapporteurs':
                    const tauxapporteursData = await DataAPI.getGraveTauxApporteursData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des taux apporteurs synchronisés :', tauxapporteursData);
                    break;
                case 'contrats':
                    const contratsData = await DataAPI.getGraveContratsData();
                    // console.log('Données graves des contrats synchronisés :', contratsData);
                    break;
                case 'avenants':
                    const avenantsData = await DataAPI.getGraveAvenantsData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des avenants synchronisés :', avenantsData);
                    break;
                case 'automobiles':
                    const automobilesData = await DataAPI.getGraveAutomobilesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des automobiles synchronisés :', automobilesData);
                    break;
                case 'garanties':
                    const garantiesData = await DataAPI.getGraveGarantiesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
                case 'sinistres':
                    const sinistresData = await DataAPI.getGraveSinistresData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
                case 'reglements':
                    const reglementsData = await DataAPI.getGraveReglementsData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
                case 'categories':
                    const categoriesData = await DataAPI.getGraveCategoriesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
                case 'marques':
                    const marquesData = await DataAPI.getGraveMarquesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;

                case 'genres':
                    const genresData = await DataAPI.getGraveGenresData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
                case 'couleurs':
                    const couleursData = await DataAPI.getGraveCouleursData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
                case 'energies':
                    const energiesData = await DataAPI.getGraveEnergiesData(); // Utilisation du nouveau fichier
                    // console.log('Données graves des  garanties synchronisés :', garantiesData);
                    break;
            }
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

    async getSinistresToSync() {
        const queue = await AppStorage.getSinistres();
        return queue.filter(sinistre => sinistre.sync === 0);
    },

    async getReglementsToSync() {
        const queue = await AppStorage.getReglements();
        return queue.filter(reglement => reglement.sync === 0);
    },

    async getCategoriesToSync() {
        const queue = await AppStorage.getCategories();
        return queue.filter(categorie => categorie.sync === 0);
    },

    async getMarquesToSync() {
        const queue = await AppStorage.getMarques();
        return queue.filter(marque => marque.sync === 0);
    },

    async getGenresToSync() {
        const queue = await AppStorage.getGenres();
        return queue.filter(genre => genre.sync === 0);
    },

    async getCouleursToSync() {
        const queue = await AppStorage.getCouleurs();
        return queue.filter(couleur => couleur.sync === 0);
    },

    async getEnergiesToSync() {
        const queue = await AppStorage.getEnergies();
        return queue.filter(energie => energie.sync === 0);
    },

    async syncData(endpoint, dataToSync, dataType) {
        const token = AppStorage.getToken();

        try {
            const response = await axios.post(endpoint, dataToSync, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-access-token': token
                }
            });

            if (response.status === 200) {

                if (!this.syncedTables.includes(dataType)) {
                    this.syncedTables.push(dataType);
                }

            } else {
                console.error(`La synchronisation des ${dataType} a échoué.`,);
            }
        } catch (error) {
            console.error(`Erreur lors de la synchronisation des ${dataType} :`, error);
        }
    },
};
