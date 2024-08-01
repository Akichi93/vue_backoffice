<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <!-- Breadcrumb Section -->
        <div class="row">
          <div class="col-md-12">
            <div
              class="page-head-box d-flex align-items-center justify-content-between mb-4"
            >
              <h3 class="mb-0">Clients</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Client
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <!-- Add Client Button -->
        <div class="row mb-3">
          <div class="col-md-8"></div>
          <div class="col-md-4 text-end">
            <a
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#add_client"
              class="btn btn-primary"
              style="width: auto"
            >
              <i class="fas fa-plus me-2"></i>Ajouter client
            </a>
          </div>
        </div>

        <!-- Search and Export Section -->
        <div class="row mb-4">
          <div class="col-md-8">
            <searchbranche
              :placeholder="'Rechercher un client'"
              v-model="q"
              @keyup="searchtask"
            ></searchbranche>
          </div>
          <div class="col-md-4 text-end">
            <clientexport></clientexport>
          </div>
        </div>

        <!-- Clients Table -->
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table
                id="tbl_exporttable_to_xls"
                class="table table-striped custom-table mb-0"
              >
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
                  <tr v-for="(client, i) in clients" :key="i">
                    <td v-text="client.nom_client"></td>
                    <td v-text="client.adresse_client"></td>
                    <td v-text="client.email_client"></td>
                    <td v-text="client.tel_client"></td>
                    <td v-text="client.profession_client"></td>
                    <td class="text-end d-flex justify-content-end">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_client"
                        @click="editClient(client.uuidClient)"
                        class="btn btn-sm btn-primary me-2"
                        title="Modifier"
                      >
                        <i class="fas fa-pen"></i>
                      </a>

                      <router-link
                        :to="{
                          name: 'detailsclient',
                          params: { uuidClient: client.uuidClient },
                        }"
                        ><i class="fas fa-eye"></i
                      ></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <addclient @client-add="refresh"></addclient>
            <editclient
              :clientoedit="clientoedit"
              @client-updated="refresh"
            ></editclient>
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
import editclient from "./editclient.vue";
import searchbranche from "../../components/search/searchbranche.vue";
import clientexport from "../../components/export/clientexport.vue";
import switchService from "../../services/switchService";

export default {
  name: "listclient",
  components: {
    Header,
    Sidebar,
    addclient,
    editclient,
    searchbranche,
    clientexport,
  },
  data() {
    return {
      clients: [],
      clientoedit: "",
      q: "",
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
        console.error(error);
      }
    },
    async searchtask() {
      if (this.q.length > 3) {
        try {
          this.clients = await switchService.searchClientsByName(this.q);
        } catch (error) {
          console.error(error);
        }
      } else {
        await this.getClients();
      }
    },
    async refresh() {
      await this.getClients();
    },
  },
};
</script>

<style scoped>
.page-head-box {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

.breadcrumb {
  background: transparent;
}

.table thead th {
  background-color: #343a40;
  color: #fff;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-info,
.btn-warning,
.btn-primary,
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
}

.btn-info i,
.btn-warning i,
.btn-primary i,
.btn-danger i {
  margin-right: 0;
}
</style>
