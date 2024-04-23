// SyncService.js
import AppStorage from '../db/AppStorage.js';
import axios from 'axios';
import DataAPI from '../db/DataAPI.js';
import { createToaster } from '@meforma/vue-toaster';

const toaster = createToaster({
    /* options */
});

const base_url = import.meta.env.VITE_API_BASE_URL;

const SyncService = {
    syncedTables: [],
    syncSuccessDisplayed: false,

    async checkAndSyncData() {
        toaster.info('Début de la synchronisation des données...', { position: 'top-right' });

        const syncOrder = [
            'branches',
            'prospects',
            'clients',
            'compagnies',
            'tauxcompagnies',
            'apporteurs',
            'tauxapporteurs',
            'contrats',
            'avenants',
            'automobiles',
            'garanties',
            'sinistres',
            'reglements',
            'categories',
            'marques',
            'genres',
            'couleurs',
            'energies',
            // Ajouter d'autres types ici selon la priorité souhaitée
        ];

        for (const dataType of syncOrder) {
            const dataToSync = await this.getToSync(dataType);
            if (dataToSync.length > 0) {
                const endpoint = `${base_url}/api/auth/sync-${dataType}`;
                await this.syncData(endpoint, dataToSync, dataType);
            }
        }

        // Après la synchronisation, afficher un message de succès si des tables ont été synchronisées
        if (!this.syncSuccessDisplayed) {
            await this.retrieveGraveData(); // Récupération des données graves après synchronisation
            toaster.success('Synchronisation effectuée avec succès', { position: 'top-right' });
            this.syncSuccessDisplayed = true;
        } else {
            console.log('Aucune donnée à synchroniser.');
        }
    },

    async getToSync(dataType) {
        let queue = [];

        // Appeler la méthode appropriée de AppStorage en fonction du dataType
        switch (dataType) {
            case 'branches':
                queue = await AppStorage.getBranchesToSync();
                break;
            case 'prospects':
                queue = await AppStorage.getProspects();
                break;
            case 'clients':
                queue = await AppStorage.getClients();
                break;
            case 'compagnies':
                queue = await AppStorage.getCompagniesToSync();
                break;
            case 'tauxcompagnies':
                queue = await AppStorage.getTauxCompagnies();
                break;
            case 'apporteurs':
                queue = await AppStorage.getApporteursToSync();
                break;
            case 'tauxapporteurs':
                queue = await AppStorage.getTauxApporteurs();
                break;
            case 'contrats':
                queue = await AppStorage.getContratsToSync();
                break;
            case 'avenants':
                queue = await AppStorage.getAvenantsToSync();
                break;
            case 'automobiles':
                queue = await AppStorage.getAutomobiles();
                break;
            case 'garanties':
                queue = await AppStorage.getGaranties();
                break;
            case 'sinistres':
                queue = await AppStorage.getSinistres();
                break;
            case 'reglements':
                queue = await AppStorage.getReglements();
                break;
            case 'categories':
                queue = await AppStorage.getCategories();
                break;
            case 'marques':
                queue = await AppStorage.getMarques();
                break;
            case 'genres':
                queue = await AppStorage.getGenres();
                break;
            case 'couleurs':
                queue = await AppStorage.getCouleurs();
                break;
            case 'energies':
                queue = await AppStorage.getEnergies();
                break;
            default:
                console.warn(`La méthode de synchronisation pour ${dataType} n'est pas définie.`);
                break;
        }

        // Filtrer les éléments à synchroniser avec sync === 0
        return queue.filter(dataItem => dataItem.sync === 0);
    },

    async syncData(endpoint, dataToSync, dataType) {
        const token = AppStorage.getToken();

        try {
            const response = await axios.post(endpoint, dataToSync, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                if (!this.syncedTables.includes(dataType)) {
                    this.syncedTables.push(dataType);
                }
            } else {
                console.error(`La synchronisation des ${dataType} a échoué.`);
            }
        } catch (error) {
            console.error(`Erreur lors de la synchronisation des ${dataType} :`, error);
        }
    },

    async retrieveGraveData() {
        // Exemple de récupération des données graves après synchronisation
        for (const table of this.syncedTables) {
            try {
                switch (table) {
                    case 'branches':
                        await DataAPI.getGraveBranchesData();
                        break;
                    case 'prospects':
                        await DataAPI.getGraveProspectsData();
                        break;
                    case 'clients':
                        await DataAPI.getGraveClientsData();
                        break;
                    case 'compagnies':
                        await DataAPI.getGraveCompagniesData();
                        break;
                    case 'tauxcompagnies':
                        await DataAPI.getGraveTauxCompagniesData();
                        break;
                    case 'apporteurs':
                        await DataAPI.getGraveApporteursData();
                        break;
                    case 'tauxapporteurs':
                        await DataAPI.getGraveTauxApporteursData();
                        break;
                    case 'contrats':
                        await DataAPI.getGraveContratsData();
                        break;
                    case 'avenants':
                        await DataAPI.getGraveAvenantsData();
                        break;
                    case 'automobiles':
                        await DataAPI.getGraveAutomobilesData();
                        break;
                    case 'garanties':
                        await DataAPI.getGraveGarantiesData();
                        break;
                    case 'sinistres':
                        await DataAPI.getGraveSinistresData();
                        break;
                    case 'reglements':
                        await DataAPI.getGraveReglementsData();
                        break;
                    case 'categories':
                        await DataAPI.getGraveCategoriesData();
                        break;
                    case 'marques':
                        await DataAPI.getGraveMarquesData();
                        break;
                    case 'genres':
                        await DataAPI.getGraveGenresData();
                        break;
                    case 'couleurs':
                        await DataAPI.getGraveCouleursData();
                        break;
                    case 'energies':
                        await DataAPI.getGraveEnergiesData();
                        break;
                    default:
                        console.warn(`La méthode de récupération des données graves pour ${table} n'est pas définie.`);
                        break;
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération des données graves de ${table} :`, error);
            }
        }
    },
};

export default SyncService;
