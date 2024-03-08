<template>
    <div class="main-wrapper">
      <Header />
  
      <Sidebar />
  
      <div class="page-wrapper">
        <div class="content container-fluid pb-0">
          <div class="row">
            <div class="col-md-12">
              <div class="page-head-box">
                <h3>Module tarification</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/home">Tableau de bord</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Module tarification
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
  
          <div
            class="row"
            v-if="isAdmin || isSuperadmin || isCourtier || isCommercial"
          >
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div class="card flex-fill tickets-card">
                <div class="card-header">
                  <div class="text-center w-100 p-3">
                    <h2>
                      <router-link to="/listauto">Automobile</router-link>
                    </h2>
                    <h2 class="bl-text mb-1">
                      Ce module permert d'ajouter les contrats des clients
                    </h2>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div class="card flex-fill tickets-card">
                <div class="card-header">
                  <div class="text-center w-100 p-3">
                    <h2>
                      <router-link to="/listsinistre">Code tarifaire</router-link>
                    </h2>
                    <h2 class="bl-text mb-1">
                      Ce module permet de déclarer les sinistres
                    </h2>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div class="card flex-fill tickets-card">
                <div class="card-header">
                  <div class="text-center w-100 p-3">
                    <h2>
                      <router-link to="/listrelance">Garantie</router-link>
                    </h2>
                    <h2 class="bl-text mb-1">
                      Ce module permet la relance des clients
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div
            class="row"
            v-if="isAdmin || isSuperadmin"
          >
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div class="card flex-fill tickets-card">
                <div class="card-header">
                  <div class="text-center w-100 p-3">
                    <h2>
                      <router-link to="/listcompagnie">Compagnie</router-link>
                    </h2>
                    <h2 class="bl-text mb-1">
                      Ce module permet l'ajoût des compagnies avec leurs taux
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div class="card flex-fill tickets-card">
                <div class="card-header">
                  <div class="text-center w-100 p-3">
                    <h2><router-link to="/listbranche">Branches</router-link></h2>
                    <h2 class="bl-text mb-1">
                      Ce module permet l'ajoût des branches
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div class="card flex-fill tickets-card">
                <div class="card-header">
                  <div class="text-center w-100 p-3">
                    <h2>
                      <router-link to="/listapporteur">Apporteurs</router-link>
                    </h2>
                    <h2 class="bl-text mb-1">
                      Ce module permet l'ajoût des apporteurs avec leurs taux
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
        return this.roleactif === "CoMMERCIAL";
      },
      isCourtier() {
        return this.roleactif === "CoMMERCIAL";
      },
    },
    components: { Header, Sidebar },
  };
  </script>
  <style></style>