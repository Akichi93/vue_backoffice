<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Module Statistiques</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Module Statistiques
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="">Statistiques utilisateurs</router-link>
                  </h2>
                  <h2 class="bl-text mb-1" v-text="users"></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="/statclient">Statistiques Clients</router-link>
                  </h2>
                  <h2 class="bl-text mb-1" v-text="clients"></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="/statcontrat">Statistiques contrats</router-link>
                  </h2>
                  <h2 class="bl-text mb-1" v-text="contrats"></h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="/statsinistre">Statistiques sinistres</router-link>
                  </h2>
                  <h2 class="bl-text mb-1" v-text="sinistres"></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="">Statistiques dépenses</router-link>
                  </h2>
                  <h2 class="bl-text mb-1" v-text="depenses"></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="">Statistiques salariés</router-link>
                  </h2>
                  <h2 class="bl-text mb-1" v-text="salaires"></h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="/statapporteur">Statistiques apporteurs</router-link>
                  </h2>
                  <h2 class="bl-text mb-1"></h2>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div class="card flex-fill tickets-card">
              <div class="card-header">
                <div class="text-center w-100 p-3">
                  <h2>
                    <router-link to="/statsupprime">Supprimes</router-link>
                  </h2>
                  <h2 class="bl-text mb-1"></h2>
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
import axios from "axios";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
export default {
  name: "statapporteur",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      users: "",
      clients: "",
      contrats: "",
      sinistres: "",
      depenses: "",
      salaires: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      axios
        .get("/api/auth/modulestat", {
          headers,
        })
        .then((response) => {
          this.users = response.data.users;
          this.clients = response.data.clients;
          this.contrats = response.data.contrats;
          this.sinistres = response.data.sinistres;
          this.contrats = response.data.contrats;
          this.depenses = response.data.depenses;
          this.salaires = response.data.salaires;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },
  },
};
</script>