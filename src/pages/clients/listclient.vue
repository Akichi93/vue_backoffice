<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Clients</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Client
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row filter-row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <div class="add-emp-section">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#add_client"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i> Ajouter client
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <searchbranche
              :placeholder="'Rechercher un client'"
              v-model="q"
              @keyup="searchtask"
            ></searchbranche>
          </div>
          <div class="col-md-12" style="display: flex; justify-content: end">
            <clientexport></clientexport>
          </div>

          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom du client</th>
                    <th>Adresse</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Profession</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(client, i) in clients" :key="i">
                    <tr>
                      <td v-text="client.nom_client"></td>
                      <td v-text="client.adresse_client"></td>
                      <td v-text="client.email_client"></td>
                      <td v-text="client.tel_client"></td>
                      <td v-text="client.profession_client"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_project"
                          @click="editClient(client.uuidClient)"
                          ><i class="fas fa-pen"></i
                        ></a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <addclient @client-add="refresh"></addclient>
            <editclient
              v-bind:clientoedit="clientoedit"
              @client-updated="refresh"
            ></editclient>

            <!-- <pagination align="center" :data="paginations" :limit="5" :current_page="paginations.current_page"
              :last_page="paginations.last_page" @pagination-change-page="getClients">
            </pagination> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import addclient from "./addclient.vue";
import { getClientSelect } from "../../services/clientService";
import editclient from "./editclient.vue";
import searchbranche from "../../components/search/searchbranche.vue";
// import pagination from "laravel-vue-pagination";
import clientexport from "../../components/export/clientexport.vue";
import AppStorage from "../../db/AppStorage.js";
import switchService from "../../services/switchService";
export default {
  name: "prospect",
  components: {
    Header,
    Sidebar,
    addclient,
    editclient,
    searchbranche,
    // pagination,
    clientexport,
  },
  name: "listclient",
  data() {
    return {
      value: null,
      clients: {},
      paginations: {},
      localisations: {},
      professions: {},
      q: "",
      clientoedit: "",
      isConnected: false,
      itemsPerPage: 5, // Nombre d'éléments par page
      currentPage: 1, // Page actuelle
    };
  },
  created() {
    this.getClients();
  },
  methods: {
    async getClients() {
      this.clients = await switchService.getClients();
    },

    async editClient(uuidClient) {
      try {
        this.clientoedit = await switchService.getClientByUuid(uuidClient);
      } catch (error) {
        console.log(error);
      }
    },

    async searchtask() {
      if (this.q.length > 3) {
        this.clients = await switchService.searchClientsByName(this.q);
      } else {
        this.getClients();
      }
    },

    async refresh() {
      this.clients = await switchService.getClients();
    },
  },
};
</script>
  
<style scoped>
.pagination {
  margin-bottom: 0;
}

.curseur:hover {
  cursor: grab;
}
</style>
  
  