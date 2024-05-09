<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Apporteurs</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-kink to="/home">
                      Tableau de bord
                    </router-kink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Apporteur
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
              <router-link to="/createapporteur" class="btn btn-success btn-add-emp" style="width: auto">
                Ajouter apporteur
              </router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <searchbranche :placeholder="'Rechercher un apporteur'" v-model="q" @keyup="searchtask"></searchbranche>
          <div class="col-md-12" style="display: flex; justify-content: end">
            <apporteurexport></apporteurexport>
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <table id="tbl_exporttable_to_xls" class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Nom et prenom de l'apporteur</th>
                    <th>Code postal</th>
                    <th>ville</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(apporteur, i) in apporteurs" :key="i">
                    <tr>
                      <td v-text="apporteur.code_apporteur"></td>
                      <td v-text="apporteur.nom_apporteur ">
                      </td>
                      <td v-text="apporteur.code_postal"></td>
                      <td v-text="apporteur.adresse_apporteur"></td>
                      <td v-text="apporteur.contact_apporteur"></td>
                      <td v-text="apporteur.email_apporteur"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <router-link :to="{
                          name: 'tauxapporteur',
                          params: { uuidApporteur: apporteur.uuidApporteur },
                        }">
                          <i class="fa fa-pen-fancy"></i>
                        </router-link>
                        <router-link :to="{
                          name: 'detailsapporteur',
                          params: { uuidApporteur: apporteur.uuidApporteur },
                        }">
                          <i class="fa fa-eye"></i>
                        </router-link>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#edit_department"
                          @click="editApporteur(apporteur.uuidApporteur)" title="Modifier"><i class="fas fa-pen"></i>
                        </a>
                        <a href="#"  data-bs-toggle="modal" data-bs-target="#delete_apporteur"
                          @click="editApporteur(apporteur.uuidApporteur)" title="supprimer"><i
                            class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <editApporteur v-bind:apporteurtoedit="apporteurtoedit" @apporteur-updated="refresh"></editApporteur>
            <deleteApporteur v-bind:apporteurtoedit="apporteurtoedit" @apporteur-delete="refresh"></deleteApporteur>

            <!-- <pagination align="center" :data="apporteurs" :limit="5" :current_page="apporteurs.current_page"
              :last_page="apporteurs.last_page" @pagination-change-page="getCompagnies">
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
import searchbranche from "../../components/search/searchbranche.vue";
import { getApporteursExport } from "../../services/apporteurService";
import { getRoleActif } from "../../services/roleservice";
import editApporteur from "./editApporteur.vue";
import deleteApporteur from "./deleteApporteur.vue";
// import pagination from "laravel-vue-pagination";
import apporteurexport from "../../components/export/apporteurexport.vue";
import AppStorage from "../../db/AppStorage.js";
import switchService from '../../services/switchService';
export default {
  components: {
    Header,
    Sidebar,
    searchbranche,
    editApporteur,
    deleteApporteur,
    // pagination,
    apporteurexport
  },
  data() {
    return {
      value: null,
      apporteurs: [],
      apporteurtoedit: "",
      q: "",
      roleactif: ""
    };
  },
  created() {
    this.getApporteurs();
    // this.getRoleconnect();
  },
  methods: {

    async getApporteurs() {
      this.apporteurs = await switchService.getApporteurs();
    },

    async editApporteur(uuidApporteur) {
      try {
        this.apporteurtoedit = await switchService.getApporteurByUuid(
          uuidApporteur
        );
      } catch (error) {
        console.log(error);
      }
    },

    async searchtask() {
      if (this.q.length > 3) {
        this.apporteurs = await switchService.searchApporteursByName(this.q);
      } else {
        this.getApporteurs();
      }
    },

   async refresh() {
      this.apporteurs = await switchService.getApporteurs();
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

