<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <!-- Breadcrumb Section -->
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box d-flex align-items-center justify-content-between mb-4">
              <h3 class="mb-0">Contrats</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Contrat</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <!-- Add Contract Button -->
        <div class="row mb-3">
          <div class="col-md-8"></div>
          <div class="col-md-4 text-end">
            <router-link
              to="/createcontrat"
              class="btn btn-primary"
            >
              <i class="fas fa-plus me-2"></i>Ajouter contrat
            </router-link>
          </div>
        </div>

        <!-- Search and Export Section -->
        <div class="row mb-4">
          <div class="col-md-8">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher un contrat"
              v-model="q"
              @keyup="rechercherContrat"
            />
          </div>
          <div class="col-md-4 text-end">
            <contratexport></contratexport>
          </div>
        </div>

        <!-- Contracts Table -->
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Code du client</th>
                    <th>Nom du client</th>
                    <th>Compagnie</th>
                    <th>Branche</th>
                    <th>Date d'effet</th>
                    <th>Date d'échéance</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contrat, i) in contrats" :key="i">
                    <td v-text="contrat.numero_client"></td>
                    <td v-text="contrat.nom_client"></td>
                    <td v-text="contrat.nom_compagnie"></td>
                    <td v-text="contrat.nom_branche"></td>
                    <td v-text="formatDate(contrat.effet_police)"></td>
                    <td v-text="formatDate(contrat.expire_le)"></td>
                    <td class="text-end d-flex justify-content-end">
                      <router-link
                        :to="{ name: 'detailscontrat', params: { uuidContrat: contrat.uuidContrat }}"
                        class="btn btn-sm btn-info me-2"
                      >
                        <i class="fas fa-info"></i>
                      </router-link>
                      <router-link
                        :to="{ name: 'avenants', params: { uuidContrat: contrat.uuidContrat }}"
                        class="btn btn-sm btn-warning me-2"
                      >
                        <i class="fas fa-paper-plane"></i>
                      </router-link>
                      <router-link
                        :to="{ name: 'editcontrat', params: { uuidContrat: contrat.uuidContrat }}"
                        class="btn btn-sm btn-primary me-2"
                      >
                        <i class="fas fa-pen"></i>
                      </router-link>
                      <button
                        @click="editContrat(contrat.uuidContrat)"
                        class="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_contrat"
                        title="Supprimer"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <DeleteContrat
              :contrattoedit="contratAEditer"
              @delete-contrat="rafraîchir"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import deletecontrat from "../contrat/deletecontrat.vue";
import contratexport from "../../components/export/contratexport.vue";
import { getRoleActif } from "../../services/roleservice";
import AppStorage from "../../db/AppStorage.js";
import { formatDate, formatDateTime } from "../../utils/helpers/dateFormat";
import switchService from "../../services/switchService";

export default {
  components: {
    Header,
    Sidebar,
    deletecontrat,
    contratexport,
  },
  data() {
    return {
      contrats: [],
      contrattoedit: "",
      q: "",
      roleactif: "",
    };
  },
  created() {
    this.initializeData();
  },
  methods: {
    formatDate,
    formatDateTime,
    async initializeData() {
      await this.getContrat();
      await this.getRoleconnect();
    },
    async editContrat(uuidContrat) {
      try {
        this.contrattoedit = await switchService.getContratByUuid(uuidContrat);
      } catch (error) {
        console.error(error);
      }
    },
    async getContrat() {
      this.contrats = await switchService.getContrats();
    },
    async getRoleconnect() {
      try {
        this.roleactif = await getRoleActif();
      } catch (error) {
        console.error(error);
      }
    },
    async searchtask() {
      if (this.q.length > 3) {
        try {
          this.contrats = await AppStorage.searchContratsByName(this.q);
        } catch (error) {
          console.error(error);
        }
      } else {
        await this.getContrat();
      }
    },
    async refresh() {
      await this.getContrat();
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

.btn-info, .btn-warning, .btn-primary, .btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
}

.btn-info i, .btn-warning i, .btn-primary i, .btn-danger i {
  margin-right: 0;
}
</style>