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
    postbranche: createApiUrl('postbranches'),
    seteditbranche: (uuidBranche) => `${base_url}/api/auth/editbranche/${uuidBranche}`,
    setupdatebranche: (uuidBranche) => `${base_url}/api/auth/updatebranche/${uuidBranche}`,
    setdeletbranche: (uuidBranche) => `${base_url}/api/auth/deletebranche/${uuidBranche}`,   
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
    getcategorie: createApiUrl('getcategories'),
    postcategorie: createApiUrl('postcategories'),
    getsinistre: createApiUrl('getsinistres'),
    postsinistre: createApiUrl('postsinistres'),
    getreglement: createApiUrl('getreglements'),
    postreglement: createApiUrl('postreglements'),
    postfileavenant: createApiUrl('postfileavenants'),
    setetatprospect: (uuidProspect) => `${base_url}/etatProspect/${uuidProspect}`,
    getuser: createApiUrl('utilisateurs'),
    setedituser: (id) => `${base_url}/utilisateurs/edit/${id}`,
    getreductiongroup: createApiUrl('getreductiongroups'),
    getassurancetemporaire: createApiUrl('getassurancetemporaires'),
    getfraismedical: createApiUrl('getfraismedicals'),
    gettarificateuraccident: createApiUrl('gettarificateuraccidents'),
    gettarificateuraccident: createApiUrl('gettarificateuraccidents'),
    gettarificateuraccident: createApiUrl('gettarificateuraccidents'),
    getactivite: createApiUrl('getactivites'),
    // getactivite: createApiUrl('getactivites'),
    
};

// function seteditbranche (uuidBranche) {
//     var data = `${base_url}/editbranche/${uuidBranche}`;
//     return data;
// }

// Export des fonctions et données
export { createApiUrl, apiUrl };
