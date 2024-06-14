<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Module courtage</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Module courtage
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row" v-if="isAdmin || isSuperadmin || isCourtier || isCommercial">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xl-4" v-for="module in mainModules" :key="module.name">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link :to="module.link">{{ module.name }}</router-link>
                  </h2>
                  <h2 class="bl-text mb-1">{{ module.description }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="isAdmin || isSuperadmin">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xl-4" v-for="adminModule in adminModules" :key="adminModule.name">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link :to="adminModule.link">{{ adminModule.name }}</router-link>
                  </h2>
                  <h2 class="bl-text mb-1">{{ adminModule.description }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="isAdmin || isSuperadmin || isCommercial">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xl-4" v-for="commercialModule in commercialModules" :key="commercialModule.name">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link :to="commercialModule.link">{{ commercialModule.name }}</router-link>
                  </h2>
                  <h2 class="bl-text mb-1">{{ commercialModule.description }}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xl-4" v-if="isAdmin || isSuperadmin">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="/upload">Upload des bases</router-link>
                  </h2>
                  <h2 class="bl-text mb-1">
                    Ce module permet l'ajout des différentes données
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../../db/AppStorage.js";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";

export default {
  data() {
    return {
      roleactif: AppStorage.getRole(),
      mainModules: [
        {
          name: 'Contrats',
          link: '/listcontrat',
          description: 'Ce module permet d\'ajouter les contrats des clients'
        },
        {
          name: 'Sinistres',
          link: '/listsinistre',
          description: 'Ce module permet de déclarer les sinistres'
        },
        {
          name: 'Relances',
          link: '/listrelance',
          description: 'Ce module permet la relance des clients'
        }
      ],
      adminModules: [
        {
          name: 'Compagnie',
          link: '/listcompagnie',
          description: 'Ce module permet l\'ajout des compagnies avec leurs taux'
        },
        {
          name: 'Branches',
          link: '/listbranche',
          description: 'Ce module permet l\'ajout des branches'
        },
        {
          name: 'Apporteurs',
          link: '/listapporteur',
          description: 'Ce module permet l\'ajout des apporteurs avec leurs taux'
        }
      ],
      commercialModules: [
        {
          name: 'Prospects',
          link: '/listprospect',
          description: 'Ce module permet l\'ajout des prospects'
        },
        {
          name: 'Clients',
          link: '/listclient',
          description: 'Ce module permet l\'ajout des clients'
        }
      ]
    };
  },
  name: "Courtage",
  computed: {
    isAdmin() {
      return this.roleactif === "ADMIN";
    },
    isSuperadmin() {
      return this.roleactif === "SUPERADMIN";
    },
    isRh() {
      return this.roleactif === "RH";
    },
    isCommercial() {
      return this.roleactif === "COMMERCIAL";
    },
    isCourtier() {
      return this.roleactif === "COURTIER";
    },
  },
  components: { Header, Sidebar },
};
</script>
<style scoped>
/* Styles spécifiques pour ces cartes */
.tickets-card {
  position: relative;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.tickets-card:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* Couleur semi-transparente */
  border-radius: 10px; /* S'assurer que les coins sont arrondis */
  pointer-events: none; /* Permet aux clics de passer à travers la superposition */
}

.tickets-card .card-header {
  background-color: #f8f9fa;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  padding: 10px;
}

.tickets-card h2 {
  margin-bottom: 5px;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tickets-card .bl-text {
  color: #495057;
  font-size: 1rem;
  margin-bottom: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tickets-card .card-header .text-center {
  padding: 10px 0;
}
</style>
