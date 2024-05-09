import axios from 'axios';
import AppStorage from './AppStorage';
import Token from './Token';
import router from '../routers';
import { deleteDB, openDB } from 'idb';

class User {
    static async responseAfterLogin(res) {
        const { access_token, name, user_id, id_entreprise, role, contact, adresse, email, mode } = res.data;

        await AppStorage.store(access_token, name, user_id, id_entreprise, role, contact, adresse, email,mode);

        const apiCalls = [
            { endpoint: 'getclients', storageKey: 'clients' },
            { endpoint: 'getprospects', storageKey: 'prospects' },
            { endpoint: 'getcontrats', storageKey: 'contrats' },
            { endpoint: 'getcompagnies', storageKey: 'compagnies' },
            { endpoint: 'getapporteurs', storageKey: 'apporteurs' },
            { endpoint: 'getbranches', storageKey: 'branches' },
            { endpoint: 'getavenants', storageKey: 'avenants' },
            { endpoint: 'getautomobiles', storageKey: 'automobiles' },
            { endpoint: 'getgaranties', storageKey: 'garanties' },
            { endpoint: 'getsinistres', storageKey: 'sinistres' },
            { endpoint: 'getreglements', storageKey: 'reglements' },

            { endpoint: 'getlocalisations', storageKey: 'localisations' },
            { endpoint: 'getprofessions', storageKey: 'professions' },
            { endpoint: 'getmarques', storageKey: 'marques' },
            { endpoint: 'getenergies', storageKey: 'energies' },
            { endpoint: 'getcouleurs', storageKey: 'couleurs' },
            { endpoint: 'getgenres', storageKey: 'genres' },
            { endpoint: 'getcategories', storageKey: 'categories' },

            { endpoint: 'getbrancheprospects', storageKey: 'brancheprospects' },

            { endpoint: 'gettauxcompagnies', storageKey: 'tauxcompagnies' },
            { endpoint: 'gettauxapporteurs', storageKey: 'tauxapporteurs' },
            { endpoint: 'getfileavenants', storageKey: 'fileavenants' },

            { endpoint: 'getreductiongroups', storageKey: 'reductiongroups' },
            { endpoint: 'getassurancetemporaires', storageKey: 'assurancetemporaires' },
            { endpoint: 'getfraismedicals', storageKey: 'fraismedicals' },
            { endpoint: 'gettarificateuraccidents', storageKey: 'tarificateuraccidents' },
            { endpoint: 'gettarificateurfrais', storageKey: 'tarificateurfrais' },
            { endpoint: 'gettarificationaccidents', storageKey: 'tarificationaccidents' },
        ];

        const accessToken = AppStorage.getToken();

        await User.deleteAllIndexedDBs();

        let successfulRequests = 0; // Variable pour compter les requêtes réussies

        for (const call of apiCalls) {
            try {
                // Effectuer l'appel API et attendre la réponse
                await User.storeDataInIndexedDB(call.endpoint, call.storageKey, accessToken);
                successfulRequests++; // Incrémenter le compteur de requêtes réussies
            } catch (error) {
                console.error(error);
            }
        }
        // Si toutes les données ont été insérées avec succès, redirigez l'utilisateur vers le tableau de bord
        if (successfulRequests === apiCalls.length) {
            // Redirection vers le tableau de bord
            User.redirectToDashboard();
        }
    }

    static redirectToDashboard() {
        // Redirection vers le tableau de bord
        router.push({ name: 'dashboard' });
    }

    static async storeDataInIndexedDB(endpoint, storageKey, accessToken) {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            const response = await axios.get(`${apiUrl}/api/auth/${endpoint}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            await AppStorage.storeData(storageKey, response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteIndexedDBByName(dbName) {
        try {
            // Supprimer la base de données spécifiée par son nom
            await deleteDB(dbName);
            console.log(`Base de données ${dbName} supprimée avec succès`);
        } catch (error) {
            console.error(`Erreur lors de la suppression de la base de données ${dbName} :`, error);
        }
    }

    static async deleteAllIndexedDBs() {
        const dbNames = await window.indexedDB.databases();

        if (dbNames && dbNames.length > 0) {
            console.log('Suppression de toutes les bases de données IndexedDB :');
            for (const { name } of dbNames) {
                await User.deleteIndexedDBByName(name);
            }
        } else {
            console.log('Aucune base de données IndexedDB trouvée.');
        }
    }

    static hasToken() {
        return AppStorage.getToken() !== null;
    }

    static loggedIn() {
        return this.hasToken();
    }

    static name() {
        return this.loggedIn() ? AppStorage.getUser() : null;
    }

    static id() {
        if (this.loggedIn()) {
            const payload = Token.payload(AppStorage.getUser());
            return payload.sub;
        }
        return null;
    }
}

export default User;
