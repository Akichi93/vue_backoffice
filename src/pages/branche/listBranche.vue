<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Branches</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Branche
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
              <router-link to="/createbranche" class="btn btn-success btn-add-emp" style="width: auto">
                Ajouter branche
              </router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <searchbranche :placeholder="'Rechercher une branche'" v-model="q" @keyup="searchtask"></searchbranche>
          <div class="col-md-12" style="display: flex;justify-content: end;">
            <brancheexport></brancheexport>
          </div>

          <div class="col-md-12">
            <div>
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th style="width: 30px">#</th>
                    <th>Nom de la branche</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(branche, i) in branches" :key="i">
                    <td v-text="branche.id_branche"></td>
                    <td v-text="branche.nom_branche"></td>
                    <td class="text-end ico-sec d-flex justify-content-end">
                      <a href="#" data-bs-toggle="modal" data-bs-target="#edit_branche"
                        @click="editbranche(branche.uuidBranche)"><i class="fas fa-pen"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#delete_branche"
                        @click="editbranche(branche.uuidBranche)"><i class="far fa-trash-alt"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <pagination align="center" :data="paginations" :limit="5" :current_page="paginations.current_page"
              :last_page="paginations.last_page" @pagination-change-page="getBranches">
            </pagination> -->



          </div>
        </div>
      </div>

      <editbranche v-bind:branchetoedit="branchetoedit" @branche-updated="refresh"></editbranche>
      <deletebranche v-bind:branchetoedit="branchetoedit" @task-delete="refresh"></deletebranche>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import { getbrancheExport } from "../../services/brancheService";
import { getRoleActif } from "../../services/roleservice";
import editbranche from "./editbranche.vue";
import deletebranche from "./deletebranche.vue";
import searchbranche from "../../components/search/searchbranche.vue";
// import pagination from "laravel-vue-pagination";
import brancheexport from "../../components/export/brancheexport.vue";
import AppStorage from "../../db/AppStorage.js";
import switchService from "../../services/switchService";
export default {
  data() {
    return {
      branches: [],
      branchetoedit: "",
      q: "",
      roleactif: "",
      isConnected: false,
      itemsPerPage: 5, // Nombre d'éléments par page
      currentPage: 1, // Page actuelle
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
        // this.branchetoedit = await AppStorage.getBrancheByUuid(uuidBranche);
        this.branchetoedit = await switchService.getBrancheByUuid(uuidBranche);
      } catch (error) {
        console.log(error);
      }
    },

  

    searchtask() {
      if (this.q.length > 3) {
        AppStorage.searchBranchesByName(this.q).then((result) => {
          this.branches = result;
        });
      } else {
        this.getBranches();
      }
    },

    async refresh() {
      this.branches = await switchService.getBranches();
    }
  },

  components: {
    Header,
    Sidebar,
    editbranche,
    deletebranche,
    // pagination,
    searchbranche,
    brancheexport
  },
};
</script>
    