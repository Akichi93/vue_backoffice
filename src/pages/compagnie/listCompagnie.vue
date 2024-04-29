<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Compagnies</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Compagnie
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
              <router-link to="createcompagnie" class="btn btn-success btn-add-emp" style="width: auto"><i
                  class="fa fa-plus"></i> Ajouter une compagnie</router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <searchbranche :placeholder="'Rechercher une compagnie'" v-model="q" @keyup="searchtask"></searchbranche>
          </div>
          <div class="col-md-12" style="display: flex; justify-content: end">
            <compagniexport></compagniexport>
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0" cellspacing="0" cellpadding="1" border="1"
                width="300">
                <thead>
                  <tr>
                    <th>Nom de la compagnie</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Adresse</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(compagnie, i) in compagnies" :key="i">
                    <tr>
                      <td v-text="compagnie.nom_compagnie"></td>
                      <td v-text="compagnie.email_compagnie"></td>
                      <td v-text="compagnie.contact_compagnie"></td>
                      <td v-text="compagnie.adresse_compagnie"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <router-link
                          :to="{ name: 'tauxcompagnie', params: { uuidCompagnie: compagnie.uuidCompagnie } }">
                          <i class="fa fa-pen-fancy"></i>
                        </router-link>
                        <router-link :to="{
              name: 'detailscompagnie',
              params: { uuidCompagnie: compagnie.uuidCompagnie },
            }">
                          <i class="fa fa-eye"></i>
                        </router-link>



                        <a href="#" data-bs-toggle="modal" data-bs-target="#edit_compagnie"
                          @click="editCompagnie(compagnie.uuidCompagnie)" title="Modifier"><i class="fas fa-pen"></i>
                        </a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_compagnie"
                          @click="editCompagnie(compagnie.uuidCompagnie)" title="supprimer"><i
                            class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <editCompagnie v-bind:compagnietoedit="compagnietoedit" @compagnie-updated="refresh"></editCompagnie>
            <deleteCompagnie v-bind:compagnietoedit="compagnietoedit" @compagnie-delete="refresh"></deleteCompagnie>

            <pagination align="center" :data="compagnies" :limit="5" :current_page="compagnies.current_page"
              :last_page="compagnies.last_page" @pagination-change-page="getCompagnies">
            </pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import { getCompagniesExport } from "../../services/compagnieService";
import { getRoleActif } from "../../services/roleservice";
import searchbranche from "../../components/search/searchbranche.vue";
import editCompagnie from "./editCompagnie.vue";
import deleteCompagnie from "./deleteCompagnie.vue";
import pagination from "laravel-vue-pagination";
import compagniexport from "../../components/export/compagniexport.vue";
import AppStorage from "../../db/AppStorage.js";
export default {
  name: "compagnie",
  components: {
    Header,
    Sidebar,
    searchbranche,
    editCompagnie,
    deleteCompagnie,
    pagination,
    compagniexport,
  },
  data() {
    return {
      value: null,
      compagnies: {},
      compagnietoedit: "",
      q: "",
      roleactif: ""
    };
  },
  created() {
    this.getCompagnies();
    this.getRoleconnect();
  },
  methods: {

    async getCompagnies() {
      AppStorage.getCompagnies().then((result) => {
        this.compagnies = result;
      });
    },

    async editCompagnie(uuidCompagnie) {
      try {
        this.compagnietoedit = await AppStorage.getCompagnieByUuid(uuidCompagnie);
      } catch (error) {
        console.log(error);
      }
    },

    getRoleconnect() {
      getRoleActif().then((result) => {
        this.roleactif = result;
      });
    },



    searchtask() {
      if (this.q.length > 3) {
        AppStorage.searchCompagniesByName(this.q).then((result) => {
          this.compagnies = result;
        });
      } else {
        this.getCompagnies();
      }
    },

    refresh() {
      AppStorage.getCompagnies().then((result) => {
        this.compagnies = result;
      });
    },
  },
};
</script>