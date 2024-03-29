import axios from 'axios';
import AppStorage from './AppStorage';
import Token from './Token';
import router from '../routers';

class User {
    static async responseAfterLogin(res) {
        const { access_token, name, user_id, id_entreprise, role, contact, adresse, email } = res.data;

        await AppStorage.store(access_token, name, user_id, id_entreprise, role, contact, adresse, email);

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
        ];

        const accessToken = AppStorage.getToken();


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
            this.redirectToDashboard();
        }


    }

    static redirectToDashboard() {
        // Redirection vers le tableau de bord
        router.push({ name: 'dashboard' });
    }

    static async storeDataInIndexedDB(endpoint, storageKey, accessToken) {
        try {
            const response = await axios.get(`https://fl4ir.loca.lt/api/auth/${endpoint}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            await AppStorage.storeData(storageKey, response.data);
        } catch (error) {
            console.error(error);
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