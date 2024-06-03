<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>
                Listes des taux de la compagnie <em>{{ names }}</em>
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/listcompagnie"
                      >Listes des compagnies</router-link
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Taux compagnies
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div class="row filter-row" v-if="branches.length > 0">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <div class="add-emp-section">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#create_project"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i> Ajouter un taux
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <searchbranche
              :placeholder="'Rechercher un taux de la compagnie'"
              v-model="q"
              @keyup="searchtask"
            ></searchbranche>
          </div>
          <div class="col-md-12">
            <div>
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom de la branche</th>
                    <th>Taux</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(tauxCompagnie, i) in tauxCompagnies"
                    :key="i"
                  >
                    <tr>
                      <td v-text="tauxCompagnie.nom_branche"></td>
                      <td v-text="tauxCompagnie.tauxcomp"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_tauxcompagnie"
                          @click="getTaux(tauxCompagnie.uuidTauxCompagnie)"
                          title="Modifier"
                          ><i class="fas fa-pen"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <addtauxcompagnie v-bind:tauxcompagnietoedit="tauxcompagnietoedit" @tauxcompagnie-add="refresh"></addtauxcompagnie> -->
  <edittauxcompagnie
    v-bind:tauxtoedit="tauxtoedit"
    @tauxcompagnie-updated="refresh"
  ></edittauxcompagnie>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import { createToaster } from "@meforma/vue-toaster";
import addtauxcompagnie from "./addtauxcompagnie.vue";
import edittauxcompagnie from "./edittauxcompagnie.vue";
import AppStorage from "../../db/AppStorage.js";
import searchbranche from "../../components/search/searchbranche.vue";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});
export default {
  name: "tauxcompagnie",
  components: {
    Header,
    Sidebar,
    addtauxcompagnie,
    edittauxcompagnie,
    searchbranche,
  },
  data() {
    return {
      value: null,
      branches: [],
      tauxtoedit: "",
      names: null,
      // tauxcompagnietoedit: ""
      tauxCompagnies: {},
    };
  },
  methods: {
    async fetchData() {
      const uuidCompagnie = this.$route.params.uuidCompagnie;

      try {
        const tauxCompagnies = await switchService.getTauxCompagnies(
          uuidCompagnie
        );
        

        this.tauxCompagnies = tauxCompagnies;
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    async fetchName() {
      const uuidcompagnie = this.$route.params.uuidCompagnie;

      try {
        const names = await switchService.getNameCompagnie(uuidcompagnie);
        this.names = names;
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    async getTaux(uuidTauxCompagnie) {
      try {
        this.tauxtoedit = await switchService.getTauxCompagnieByUuid(
          uuidTauxCompagnie
        );
      } catch (error) {
        console.log(error);
      }
    },

    async searchtask() {
      if (this.q.length > 3) {
        const uuidCompagnie = this.$route.params.uuidCompagnie;
        this.tauxCompagnies =
          await switchService.searchTauxCompagnieByNomBranche(
            this.q,
            uuidCompagnie
          );
      } else {
        this.fetchData();
      }
    },

    async refresh() {
      const uuidCompagnie = this.$route.params.uuidCompagnie;
      this.tauxCompagnies = await switchService.getTauxCompagnies(
        uuidCompagnie
      );
    },
  },
  created() {
    this.fetchData();
    this.fetchName();
  },
};
</script>
  