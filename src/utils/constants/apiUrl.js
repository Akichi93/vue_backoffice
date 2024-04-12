const base_url = import.meta.env.VITE_API_BASE_URL;

// Fonction utilitaire pour créer les URL d'API avec le préfixe '/api/auth/'
function createApiUrl(endpoint) {
    return `${base_url}/api/auth/${endpoint}`;
}

// Objet contenant toutes les URLs d'API
const apiUrl = {
    authentification: createApiUrl('login'),
    postcontrat: createApiUrl('postcontrat'),
    getcontrat: createApiUrl('getcontrats'),
    postapporteur: createApiUrl('postapporteur'),
    getapporteur: createApiUrl('getapporteurs'),
    gettauxapporteur: createApiUrl('gettauxapporteurs'),
    postcompagnie: createApiUrl('postcompagnie'),
    gettauxcompagnie: createApiUrl('gettauxcompagnies'),
    getcompagnie: createApiUrl('getcompagnies'),
    getprospect: createApiUrl('getprospects'),
    postprospect: createApiUrl('postprospect'),
    postbrancheprospect: createApiUrl('postbrancheprospect'),
    getavenant: createApiUrl('getavenants'),
    getbranche: createApiUrl('getbranches'),
    postbranche: createApiUrl('postbranche'),
    getclient: createApiUrl('getclients'),
    postclient: createApiUrl('postclient'),
    getlocalisation: createApiUrl('getlocalisations'),
    postlocalisation: createApiUrl('postlocalisations'),
    getprofession: createApiUrl('getprofessions'),
    postprofession: createApiUrl('postprofessions'),
    getmarque: createApiUrl('getmarques'),
    postmarque: createApiUrl('postmarques'),
    getenergie: createApiUrl('getenergies'),
    postenergie: createApiUrl('postenergies'),
    getcouleur: createApiUrl('getcouleurs'),
    postcouleur: createApiUrl('postcouleurs'),
    getgenre: createApiUrl('getgenres'),
    postgenre: createApiUrl('postgenres'),
    statistiques: createApiUrl('stat/'),
    year: createApiUrl('year'),
    retrievebranche: createApiUrl('retrievebranche'),
    getgarantie: createApiUrl('getgaranties'),
    getautomobile: createApiUrl('getautomobiles'),
};

// Export des fonctions et données
export { createApiUrl, apiUrl };
