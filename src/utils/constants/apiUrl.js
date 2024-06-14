const base_url = import.meta.env.VITE_API_BASE_URL;

// Fonction utilitaire pour créer les URL d'API avec le préfixe '/api/auth/'
function createApiUrl(endpoint) {
    return `${base_url}/api/auth/${endpoint}`;
}

function createUrl(endpoint) {
    return `${base_url}/api/${endpoint}`;
}

// Objet contenant toutes les URLs d'API
const apiUrl = {
    authentification: createApiUrl('login'),

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

    getbranche: createApiUrl('getbranches'),
    postbranche: createApiUrl('postbranches'),
    seteditbranche: (uuidBranche) => `${base_url}/api/auth/editbranche/${uuidBranche}`,
    setupdatebranche: (uuidBranche) => `${base_url}/api/auth/updatebranche/${uuidBranche}`,
    setdeletebranche: (uuidBranche) => `${base_url}/api/auth/deletebranche/${uuidBranche}`,

    getprospect: createApiUrl('getprospects'),
    postprospect: createApiUrl('postprospect'),
    seteditprospect: (uuidProspect) => `${base_url}/api/auth/editprospect/${uuidProspect}`,
    setupdateprospect: (uuidProspect) => `${base_url}/api/auth/updateprospect/${uuidProspect}`,
    setetatprospect: (uuidProspect) => `${base_url}/api/auth/etatprospect/${uuidProspect}`,
    setdeleteprospect: (uuidProspect) => `${base_url}/api/auth/deleteprospect/${uuidProspect}`,
    setnameprospect: (uuidProspect) => `${base_url}/api/auth/getnameprospect/${uuidProspect}`,
    setbranchediffprospect: (uuidProspect) => `${base_url}/api/auth/getbranchediffprospect/${uuidProspect}`,
    setbrancheprospect: (uuidProspect) => `${base_url}/api/auth/getbrancheprospect/${uuidProspect}`,
    validateprospect: createApiUrl('validateprospect'),
    postbrancheprospect: createApiUrl('postbrancheprospect'),
    getnameprospect: createApiUrl('validateprospect'),


    getclient: createApiUrl('getclients'),
    postclient: createApiUrl('postclient'),
    seteditclient: (uuidClient) => `${base_url}/api/auth/editclient/${uuidClient}`,
    setupdateclient: (uuidClient) => `${base_url}/api/auth/updateclient/${uuidClient}`,

    getapporteur: createApiUrl('getapporteurs'),
    getapporteursearch: (q) => `${base_url}/api/auth/apporteurlist/${q}`,
    postapporteur: createApiUrl('postapporteur'),
    seteditapporteur: (uuidApporteur) => `${base_url}/api/auth/editapporteur/${uuidApporteur}`,
    setupdateapporteur: (uuidApporteur) => `${base_url}/api/auth/updateapporteur/${uuidApporteur}`,
    settauxapporteur: (uuidApporteur) => `${base_url}/api/auth/gettauxapporteur/${uuidApporteur}`,
    setnamepporteur: (uuidApporteur) => `${base_url}/api/auth/getnameapporteur/${uuidApporteur}`,
    setedittauxapporteur: (uuidTauxApporteur) => `${base_url}/api/auth/edittauxapporteur/${uuidTauxApporteur}`,
    setupdatetauxapporteur: (uuidTauxApporteur) => `${base_url}/api/auth/updatetauxapporteur/${uuidTauxApporteur}`,
    setinfoapporteur: (uuidTauxApporteur) => `${base_url}/api/auth/infoapporteur/${uuidTauxApporteur}`,
    setsommecommissionapporteur: (uuidApporteur) => `${base_url}/api/auth/getsommecommissionapporteur/${uuidApporteur}`,
    setsommecommissionsapporteurpayer: (uuidApporteur) => `${base_url}/api/auth/getsommecommissionsapporteurpayer/${uuidApporteur}`,
    setavenantbyuuid: (uuidAvenant) => `${base_url}/api/auth/getavenantbyuuid/${uuidAvenant}`,
    gettauxapporteur: createApiUrl('gettauxapporteurs'),

    getcompagnie: createApiUrl('getcompagnies'),
    getcompagniesearch: (q) => `${base_url}/api/auth/compagnielist/${q}`,
    seteditcompagnie: (uuidCompagnie) => `${base_url}/api/auth/editcompagnie/${uuidCompagnie}`,
    setupdatecompagnie: (uuidCompagnie) => `${base_url}/api/auth/updatecompagnie/${uuidCompagnie}`,
    settauxcompagnie: (uuidCompagnie) => `${base_url}/api/auth/gettauxcompagnie/${uuidCompagnie}`,
    setnamecompagnie: (uuidCompagnie) => `${base_url}/api/auth/getnamecompagnie/${uuidCompagnie}`,
    setedittauxcompagnie: (uuidTauxCompagnie) => `${base_url}/api/auth/edittauxcompagnie/${uuidTauxCompagnie}`,
    postcompagnie: createApiUrl('postcompagnie'),
    gettauxcompagnie: createApiUrl('gettauxcompagnies'),


    refresh: createApiUrl('refresh'),
    checktoken: createApiUrl('checktoken'),

    postcontrat: createApiUrl('postcontrat'),
    postautomobile: createApiUrl('postautomobile'),
    getcontrat: createApiUrl('getcontrats'),
    gettauxbranchecompagnie: createApiUrl('gettauxbranchecompagnie'),
    gettauxbrancheapporteur: createApiUrl('gettauxbrancheapporteur'),
    seteditcontrat: (uuidContrat) => `${base_url}/api/auth/editcontrat/${uuidContrat}`,
    editavenant: (uuidContrat) => `${base_url}/api/auth/editavenant/${uuidContrat}`,
    setinfoavenant: (uuidContrat) => `${base_url}/api/auth/getinfoavenant/${uuidContrat}`,
    setinfocontrat: (uuidContrat) => `${base_url}/api/auth/getinfocontrat/${uuidContrat}`,
    setinfoavenantcontrat: (uuidContrat) => `${base_url}/api/auth/getinfoavenantcontrat/${uuidContrat}`,
    setavenantcontrat: (uuidContrat) => `${base_url}/api/auth/getavenantcontrat/${uuidContrat}`,
    setinfovehicule: (uuidContrat) => `${base_url}/api/auth/getinfovehicules/${uuidContrat}`,
    setfactureavenant: (uuidAvenant) => `${base_url}/api/auth/getfactures/${uuidAvenant}`,

    importautomobile: createApiUrl('importautomobile'),




    getavenant: createApiUrl('getavenants'),



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

    getinternetconnection : createUrl('check-internet-connection')

};



// Export des fonctions et données
export { createApiUrl, apiUrl };
