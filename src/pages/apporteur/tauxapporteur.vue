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
                Listes des taux de l'apporteur
                <em>{{ names }}</em>
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/listapporteur"
                      >Listes des apporteurs</router-link
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Taux apporteurs
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
                data-bs-target="#add_taux"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                @click="getApporteur(names.id_apporteur)"
                ><i class="fas fa-plus"></i> Ajouter un taux
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <searchbranche :placeholder="'Rechercher un taux apporteur'" v-model="q" @keyup="searchtask"></searchbranche>
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
                    v-for="(tauxapporteur, i) in tauxApporteurs"
                    :key="i"
                  >
                    <tr>
                      <td v-text="tauxapporteur.nom_branche"></td>
                      <td v-text="tauxapporteur.taux"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_taux"
                          @click="getTaux(tauxapporteur.uuidTauxApporteur)"
                          title="Modifier"
                          ><i class="fas fa-pen"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <!-- <addtauxapporteur v-bind:tauxapporteurtoedit="tauxapporteurtoedit" @tauxapporteur-add="refresh"></addtauxapporteur> -->

            <edittauxapporteur
              v-bind:tauxtoedit="tauxtoedit"
              @tauxapporteur-update="refresh"
            ></edittauxapporteur>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import addtauxapporteur from "./addtauxapporteur.vue";
import edittauxapporteur from "./edittauxapporteur.vue";
import AppStorage from "../../db/AppStorage.js";
import searchbranche from "../../components/search/searchbranche.vue";
import switchService from '../../services/switchService';
export default {
  name: "tauxapporteur",
  components: { Header, Sidebar, addtauxapporteur, edittauxapporteur,searchbranche, },
  data() {
    return {
      value: null,
      tauxApporteurs: [],
      tauxtoedit: "",
      tauxapporteurtoedit: "",
      names: null,
      branches: {},
      accidents: [],

      ids: [],
    };
  },
  methods: {
    async fetchData() {
      const uuidApporteur = this.$route.params.uuidApporteur;

      try {
        this.tauxApporteurs = await switchService.getTauxApporteurs(
          uuidApporteur
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    async fetchName() {
      const uuidApporteur = this.$route.params.uuidApporteur;

      try {
        this.names = await switchService.getNameApporteur(uuidApporteur);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    async getTaux(uuidTauxApporteur) {
      try {
        this.tauxtoedit = await switchService.getTauxApporteurByUuid(uuidTauxApporteur);
      } catch (error) {
        console.log(error);
      }
    },
    
    async searchtask() {
      if (this.q.length > 3) {
        const uuidApporteur = this.$route.params.uuidApporteur;
        this.tauxApporteurs = await switchService.searchTauxApporteurByNomBranche(this.q,uuidApporteur)
      } else {
        this.fetchData();
      }
    },
   async refresh() {
      const uuidApporteur = this.$route.params.uuidApporteur;
      this.tauxApporteurs = await switchService.getTauxApporteurs(uuidApporteur);
    },
  },
  created() {
    this.fetchData();
    this.fetchName();
  },
};
</script>
  