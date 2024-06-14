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
              <h3 class="mb-0">Compagnies</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Compagnie</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <!-- Add Compagnie Button -->
        <div class="row mb-3">
          <div class="col-md-8"></div>
          <div class="col-md-4 text-end">
            <router-link
              to="/createcompagnie"
              class="btn btn-primary"
            >
              <i class="fas fa-plus me-2"></i>Ajouter une compagnie
            </router-link>
          </div>
        </div>

        <!-- Search and Export Section -->
        <div class="row mb-4">
          <div class="col-md-8">
            <searchbranche
              :placeholder="'Rechercher une compagnie'"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-4 text-end">
            <compagniexport></compagniexport>
          </div>
        </div>

        <!-- Compagnies Table -->
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom de la compagnie</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Adresse</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(compagnie, i) in compagnies" :key="i">
                    <td v-text="compagnie.nom_compagnie"></td>
                    <td v-text="compagnie.email_compagnie"></td>
                    <td v-text="compagnie.contact_compagnie"></td>
                    <td v-text="compagnie.adresse_compagnie"></td>
                    <td class="text-end d-flex justify-content-end">
                      <router-link
                        :to="{ name: 'tauxcompagnie', params: { uuidCompagnie: compagnie.uuidCompagnie }}"
                        class="btn btn-sm btn-info me-2"
                      >
                        <i class="fas fa-pen-fancy"></i>
                      </router-link>
                      <router-link
                        :to="{ name: 'detailscompagnie', params: { uuidCompagnie: compagnie.uuidCompagnie }}"
                        class="btn btn-sm btn-warning me-2"
                      >
                        <i class="fas fa-eye"></i>
                      </router-link>
                      <button
                        @click="editCompagnie(compagnie.uuidCompagnie)"
                        class="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_compagnie"
                        title="Modifier"
                      >
                        <i class="fas fa-pen"></i>
                      </button>
                      <button
                        @click="editCompagnie(compagnie.uuidCompagnie)"
                        class="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_compagnie"
                        title="Supprimer"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <editCompagnie
              :compagnietoedit="compagnietoedit"
              @compagnie-updated="refresh"
            />
            <deleteCompagnie
              :compagnietoedit="compagnietoedit"
              @compagnie-delete="refresh"
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
import { getRoleActif } from "../../services/roleservice";
import searchbranche from "../../components/search/searchbranche.vue";
import editCompagnie from "./editCompagnie.vue";
import deleteCompagnie from "./deleteCompagnie.vue";
import compagniexport from "../../components/export/compagniexport.vue";
import switchService from "../../services/switchService";

export default {
  name: "compagnie",
  components: {
    Header,
    Sidebar,
    searchbranche,
    editCompagnie,
    deleteCompagnie,
    compagniexport,
  },
  data() {
    return {
      compagnies: [],
      compagnietoedit: "",
      q: "",
      roleactif: "",
    };
  },
  created() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      await this.getCompagnies();
      await this.getRoleconnect();
    },
    async editCompagnie(uuidCompagnie) {
      try {
        this.compagnietoedit = await switchService.getCompagnieByUuid(uuidCompagnie);
      } catch (error) {
        console.error(error);
      }
    },
    async getCompagnies() {
      this.compagnies = await switchService.getCompagnies();
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
          this.compagnies = await switchService.searchCompagnieByName(this.q);
        } catch (error) {
          console.error(error);
        }
      } else {
        await this.getCompagnies();
      }
    },
    async refresh() {
      await this.getCompagnies();
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
