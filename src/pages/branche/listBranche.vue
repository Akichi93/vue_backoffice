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
              <h3 class="mb-0">Branches</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Branche</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <!-- Add Branch Button -->
        <div class="row mb-3">
          <div class="col-md-8"></div>
          <div class="col-md-4 text-end">
            <router-link to="/createbranche" class="btn btn-primary" style="width: auto">
              <i class="fas fa-plus me-2"></i>Ajouter branche
            </router-link>
          </div>
        </div>

        <!-- Search and Export Section -->
        <div class="row mb-4">
          <div class="col-md-8">
            <searchbranche
              :placeholder="'Rechercher une branche'"
              v-model="q"
              @keyup="searchtask"
            ></searchbranche>
          </div>
          <div class="col-md-4 text-end">
            <brancheexport></brancheexport>
          </div>
        </div>

        <!-- Branches Table -->
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table id="tbl_exporttable_to_xls" class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th style="width: 30px">#</th>
                    <th>Nom de la branche</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(branche, i) in branches" :key="i">
                    <td v-text="branche.id_branche"></td>
                    <td v-text="branche.nom_branche"></td>
                    <td class="text-end ico-sec d-flex justify-content-end">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_branche"
                        @click="editbranche(branche.uuidBranche)"
                        class="btn btn-sm btn-primary me-2"
                        title="Modifier"
                      >
                        <i class="fas fa-pen"></i>
                      </a>
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_branche"
                        @click="editbranche(branche.uuidBranche)"
                        class="btn btn-sm btn-danger"
                        title="Supprimer"
                      >
                        <i class="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <editbranche v-bind:branchetoedit="branchetoedit" @branche-updated="refresh"></editbranche>
            <deletebranche v-bind:branchetoedit="branchetoedit" @branche-delete="refresh"></deletebranche>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import editbranche from "./editbranche.vue";
import deletebranche from "./deletebranche.vue";
import searchbranche from "../../components/search/searchbranche.vue";
import brancheexport from "../../components/export/brancheexport.vue";
import switchService from "../../services/switchService";

export default {
  name: "listbranche",
  components: {
    Header,
    Sidebar,
    editbranche,
    deletebranche,
    searchbranche,
    brancheexport,
  },
  data() {
    return {
      branches: [],
      branchetoedit: "",
      q: "",
    };
  },
  created() {
    this.getBranches();
  },
  methods: {
    async getBranches() {
      this.branches = await switchService.getBranches();
    },
    async editbranche(uuidBranche) {
      try {
        this.branchetoedit = await switchService.getBrancheByUuid(uuidBranche);
      } catch (error) {
        console.error(error);
      }
    },
    async searchtask() {
      if (this.q.length > 3) {
        try {
          this.branches = await switchService.searchBranchesByName(this.q);
        } catch (error) {
          console.error(error);
        }
      } else {
        await this.getBranches();
      }
    },
    async refresh() {
      await this.getBranches();
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

.btn-primary, .btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
}

.btn-primary i, .btn-danger i {
  margin-right: 0;
}
</style>
