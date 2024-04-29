import { createRouter, createWebHistory } from "vue-router";
import { useClientFileStore } from '../store/clientfile';
import { useProspectFileStore } from '../store/prospectfile';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
import login from "../pages/auth/login.vue";
import register from "../pages/auth/register.vue";
import forgot from "../pages/auth/forgot.vue";
import logout from "../pages/auth/logout.vue";
import dashboard from "../pages/dashboard.vue";
import localstorage from "../pages/localstorage.vue";
import courtage from "../pages/module/courtage.vue";
import listbranche from "../pages/branche/listBranche.vue";
import createbranche from "../pages/branche/createbranche.vue";
import listapporteur from "../pages/apporteur/listApporteur.vue";
import createapporteur from "../pages/apporteur/createApporteur.vue";
import tauxapporteur from "../pages/apporteur/tauxapporteur.vue";
import listcompagnie from "../pages/compagnie/listCompagnie.vue";
import createcompagnie from "../pages/compagnie/createCompagnie.vue";
import tauxcompagnie from "../pages/compagnie/tauxcompagnie.vue";
import detailscompagnie from "../pages/compagnie/detailscompagnie.vue";
import listprospect from "../pages/prospect/listProspect.vue";
import createprospect from "../pages/prospect/createProspect.vue";
import detailsprospect from "../pages/prospect/detailsProspect.vue";
import listclient from "../pages/clients/listclient.vue";
import listrelance from "../pages/relance/listrelance.vue";
import createrelance from "../pages/relance/createrelance.vue";
import listcontrat from "../pages/contrat/listcontrat.vue";
import createcontrat from "../pages/contrat/createcontrat.vue";
import detailscontrat from "../pages/contrat/detailscontrat.vue";
import avenants from "../pages/contrat/avenants.vue";
import editcontrat from "../pages/contrat/editcontrat.vue";
import listsinistre from "../pages/sinistres/listsinistre.vue";
import createsinistre from "../pages/sinistres/createsinistre.vue";
import editsinistre from "../pages/sinistres/editsinistre.vue";
import voirsinistre from "../pages/sinistres/voirsinistre.vue";
import reglement from "../pages/sinistres/reglement.vue";
import statistique from "../pages/module/statistique.vue";
import statcontrat from "../pages/statistiques/statcontrat.vue";
import statsinistre from "../pages/statistiques/statsinistre.vue";
import statclient from "../pages/statistiques/statclient.vue";
import infoclient from "../pages/statistiques/infoclient.vue";
import infocontrat from "../pages/statistiques/infocontrat.vue";
import statapporteur from "../pages/statistiques/statapporteur.vue";
import infoapporteur from "../pages/statistiques/infoapporteur.vue";
import statsupprime from "../pages/statistiques/statsupprime.vue";
import rh from "../pages/module/rh.vue";
import listuser from "../pages/users/listuser.vue";
import profil from "../pages/users/profil.vue";
import entreprise from "../pages/parametre/entreprise.vue";
import upload from "../pages/uploads/upload.vue";
import reporting from "../pages/statistiques/reporting.vue";
import listsalaire from "../pages/salaires/listsalaires.vue";
import notfound from "../pages/notfound.vue";
import tarification from "../pages/module/tarification.vue";
import listauto from "../pages/automobile/listauto.vue";
import createauto from "../pages/automobile/createauto.vue";
import detailsapporteur from "../pages/apporteur/detailsApporteur.vue";
import listeaccident from "../pages/accident/listeaccident.vue";
import createaccident from "../pages/accident/createaccident.vue";
import listecode from "../pages/accident/listecode.vue";

// Fonction de vérification
function isPageValid(route) {
  // Ajoutez votre logique de vérification ici
  // Par exemple, vérifiez si le chemin correspond à une route existante
  const validRoutes = ['/', '/register', '/forgot', '/home', '/courtage']; // Liste des routes valides
  return validRoutes.includes(route);
}


const routes = [
  {
    path: '/',
    name: 'welcome',
    component: login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: forgot,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'dashboard',
    component: dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/localstorage',
    name: 'localstorage',
    component: localstorage,
    meta: { requiresAuth: true },
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout,
    meta: { requiresAuth: true }
  },
  {
    path: '/courtage',
    name: 'courtage',
    component: courtage,
    meta: { requiresAuth: true }
  },
  {
    path: '/listbranche',
    name: 'listbranche',
    component: listbranche,
    meta: { requiresAuth: true }
  },
  {
    path: '/createbranche',
    name: 'createbranche',
    component: createbranche,
    meta: { requiresAuth: true }
  },
  {
    path: '/listapporteur',
    name: 'listapporteur',
    component: listapporteur,
    meta: { requiresAuth: true },
  },
  {
    path: '/createapporteur',
    name: 'createapporteur',
    component: createapporteur,
    meta: { requiresAuth: true }
  },
  {
    path: '/tauxapporteur/:uuidApporteur',
    name: 'tauxapporteur',
    component: tauxapporteur,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/detailsapporteur/:uuidApporteur',
    name: 'detailsapporteur',
    component: detailsapporteur,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/listcompagnie',
    name: 'listcompagnie',
    component: listcompagnie,
    meta: { requiresAuth: true }
  },
  {
    path: '/createcompagnie',
    name: 'createcompagnie',
    component: createcompagnie,
    meta: { requiresAuth: true }
  },
  {
    path: '/tauxcompagnie/:uuidCompagnie',
    name: 'tauxcompagnie',
    component: tauxcompagnie,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/detailscompagnie/:uuidCompagnie',
    name: 'detailscompagnie',
    component: detailscompagnie,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/listprospect',
    name: 'listprospect',
    component: listprospect,
    meta: { requiresAuth: true }
  },
  {
    path: '/createprospect',
    name: 'createprospect',
    component: createprospect,
    meta: { requiresAuth: true }
  },
  {
    path: '/detailsprospect/:uuidProspect',
    name: 'detailsprospect',
    component: detailsprospect,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/listclient',
    name: 'listclient',
    component: listclient,
    meta: { requiresAuth: true }
  },
  {
    path: '/listrelance',
    name: 'listrelance',
    component: listrelance,
    meta: { requiresAuth: true }
  },
  {
    path: '/createrelance',
    name: 'createrelance',
    component: createrelance,
    meta: { requiresAuth: true }
  },
  {
    path: '/listcontrat',
    name: 'listcontrat',
    component: listcontrat,
    meta: { requiresAuth: true }
  },
  {
    path: '/createcontrat',
    name: 'createcontrat',
    component: createcontrat,
    meta: { requiresAuth: true }
  },
  {
    path: '/detailscontrat/:uuidContrat',
    name: 'detailscontrat',
    component: detailscontrat,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/avenants/:uuidContrat',
    name: 'avenants',
    component: avenants,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/editcontrat/:uuidContrat',
    name: 'editcontrat',
    component: editcontrat,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/listsinistre',
    name: 'listsinistre',
    component: listsinistre,
    meta: { requiresAuth: true }
  },
  {
    path: '/createsinistre',
    name: 'createsinistre',
    component: createsinistre,
    meta: { requiresAuth: true }
  },
  {
    path: '/editsinistre/:uuidSinistre',
    name: 'editsinistre',
    component: editsinistre,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/voirsinistre/:uuidSinistre',
    name: 'voirsinistre',
    component: voirsinistre,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/reglement/:uuidSinistre',
    name: 'reglement',
    component: reglement,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/statistique',
    name: 'statistique',
    component: statistique,
    meta: { requiresAuth: true }
  },
  {
    path: '/statcontrat',
    name: 'statcontrat',
    component: statcontrat,
    meta: { requiresAuth: true }
  },
  {
    path: '/statsinistre',
    name: 'statsinistre',
    component: statsinistre,
    meta: { requiresAuth: true }
  },
  {
    path: '/statclient',
    name: 'statclient',
    component: statclient,
    meta: { requiresAuth: true }
  },
  {
    path: '/statclient/details/:id_client',
    name: 'infoclient',
    component: infoclient,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/statclient/detailcontrats/:id_contrat',
    name: 'infocontrat',
    component: infocontrat,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/statapporteur',
    name: 'statapporteur',
    component: statapporteur,
    meta: { requiresAuth: true }
  },
  {
    path: '/statapporteur/details/:id_apporteur',
    name: 'infoapporteur',
    component: infoapporteur,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/statsupprime',
    name: 'statsupprime',
    component: statsupprime,
    meta: { requiresAuth: true }
  },
  {
    path: '/rh',
    name: 'rh',
    component: rh,
    meta: { requiresAuth: true }
  },
  {
    path: '/listuser',
    name: 'listuser',
    component: listuser,
    meta: { requiresAuth: true }
  },
  {
    path: '/profil',
    name: 'profil',
    component: profil,
    meta: { requiresAuth: true }
  },
  {
    path: '/entreprise',
    name: 'entreprise',
    component: entreprise,
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload,
    meta: { requiresAuth: true }
  },
  {
    path: '/reporting',
    name: 'reporting',
    component: reporting,
    meta: { requiresAuth: true }
  },
  {
    path: '/listsalaire',
    name: 'listsalaire',
    component: listsalaire,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: notfound,
    meta: { requiresAuth: true }
  },
  {
    path: '/tarification',
    name: 'tarification',
    component: tarification,
    meta: { requiresAuth: true }
  },
  {
    path: '/listauto',
    name: 'listauto',
    component: listauto,
    meta: { requiresAuth: true }
  },
  {
    path: '/createauto',
    name: 'createauto',
    component: createauto,
    meta: { requiresAuth: true }
  },
  {
    path: '/listeaccident',
    name: 'listeaccident',
    component: listeaccident,
    meta: { requiresAuth: true }
  },
  {
    path: '/createaccident',
    name: 'createaccident',
    component: createaccident,
    meta: { requiresAuth: true }
  },
  {
    path: '/listecode',
    name: 'listecode',
    component: listecode,
    meta: { requiresAuth: true }
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !User.loggedIn()) {
    next({ name: 'welcome' }); // Redirect to welcome page if not logged in
  } else if (!to.meta.requiresAuth && User.loggedIn()) {
    next({ name: 'dashboard' }); // Redirect to dashboard if logged in and trying to access a non-authenticated route
  } else {
    const clientFileStore = useClientFileStore();
    const prospectFileStore = useProspectFileStore();

    if (clientFileStore.isLoadingFile) {
      // Si le fichier est en cours de chargement, empêcher la navigation
      await toaster.warning("Base des clients en cours de chargement. Veuillez patienter...", {
        position: "top-right",
      });
      next(false);
    } else if (prospectFileStore.isLoadingFile) {
      // Si le fichier est en cours de chargement, empêcher la navigation
      await toaster.warning("Base des prospects en cours de chargement. Veuillez patienter...", {
        position: "top-right",
      });
      next(false);
    }
    else {
      // Sinon, permettre la navigation
      next();
    }

    //else
    next(); // Proceed with the navigation
  }
});




export default router;