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
              <h3 class="mb-0">Apporteurs</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Apporteur</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <!-- Add Apporteur Button -->
        <div class="row mb-3">
          <div class="col-md-8"></div>
          <div class="col-md-4 text-end">
            <router-link
              to="/createapporteur"
              class="btn btn-primary"
            >
              <i class="fas fa-plus me-2"></i>Ajouter apporteur
            </router-link>
          </div>
        </div>

        <!-- Search and Export Section -->
        <div class="row mb-4">
          <div class="col-md-8">
            <searchbranche
              :placeholder="'Rechercher un apporteur'"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-4 text-end">
            <apporteurexport></apporteurexport>
          </div>
        </div>

        <!-- Apporteurs Table -->
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table id="tbl_exporttable_to_xls" class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Nom et prénom de l'apporteur</th>
                    <th>Code postal</th>
                    <th>Ville</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(apporteur, i) in apporteurs" :key="i">
                    <td v-text="apporteur.code_apporteur"></td>
                    <td v-text="apporteur.nom_apporteur"></td>
                    <td v-text="apporteur.code_postal"></td>
                    <td v-text="apporteur.adresse_apporteur"></td>
                    <td v-text="apporteur.contact_apporteur"></td>
                    <td v-text="apporteur.email_apporteur"></td>
                    <td class="text-end d-flex justify-content-end">
                      <router-link
                        :to="{ name: 'tauxapporteur', params: { uuidApporteur: apporteur.uuidApporteur } }"
                        class="btn btn-sm btn-info me-2"
                      >
                        <i class="fas fa-pen-fancy"></i>
                      </router-link>
                      <router-link
                        :to="{ name: 'detailsapporteur', params: { uuidApporteur: apporteur.uuidApporteur } }"
                        class="btn btn-sm btn-warning me-2"
                      >
                        <i class="fas fa-eye"></i>
                      </router-link>
                      <button
                        @click="editApporteur(apporteur.uuidApporteur)"
                        class="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_apporteur"
                        title="Modifier"
                      >
                        <i class="fas fa-pen"></i>
                      </button>
                      <button
                        @click="editApporteur(apporteur.uuidApporteur)"
                        class="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_apporteur"
                        title="Supprimer"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <editApporteur
              :apporteurtoedit="apporteurtoedit"
              @apporteur-updated="refresh"
            />
            <deleteApporteur
              :apporteurtoedit="apporteurtoedit"
              @apporteur-delete="refresh"
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
import searchbranche from "../../components/search/searchbranche.vue";
import { getApporteursExport } from "../../services/apporteurService";
import { getRoleActif } from "../../services/roleservice";
import editApporteur from "./editApporteur.vue";
import deleteApporteur from "./deleteApporteur.vue";
import apporteurexport from "../../components/export/apporteurexport.vue";
import switchService from '../../services/switchService';

export default {
  components: {
    Header,
    Sidebar,
    searchbranche,
    editApporteur,
    deleteApporteur,
    apporteurexport,
  },
  data() {
    return {
      apporteurs: [],
      apporteurtoedit: "",
      q: "",
      roleactif: ""
    };
  },
  created() {
    this.getApporteurs();
  },
  methods: {
    async getApporteurs() {
      this.apporteurs = await switchService.getApporteurs();
    },
    async editApporteur(uuidApporteur) {
      try {
        this.apporteurtoedit = await switchService.getApporteurByUuid(uuidApporteur);
      } catch (error) {
        console.error(error);
      }
    },
    async searchtask() {
      if (this.q.length > 3) {
        try {
          this.apporteurs = await switchService.searchApporteursByName(this.q);
        } catch (error) {
          console.error(error);
        }
      } else {
        await this.getApporteurs();
      }
    },
    async refresh() {
      await this.getApporteurs();
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
