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
                Listes des branches <em>{{ names }}</em>
              </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/prospect"
                      >Listes des prospects</router-link
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajout
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
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#add_brancheprospect"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i> Ajouter des branches
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div>
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom de la branche</th>
                    <th>Commentaire</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="prospect in prospects"
                    :key="prospect.uuidProspectBranche"
                  >
                    <tr>
                      <td v-text="prospect.nom_branche"></td>
                      <td v-text="prospect.description"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_department"
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

        <addprospectbranche @brancheprospect-add="refresh"></addprospectbranche>
        <!-- <editprospectbranche></editprospectbranche> -->
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import editprospectbranche from "../prospect/editprospectbranche.vue";
import addprospectbranche from "../prospect/addprospectbranche.vue";
import AppStorage from "../../db/AppStorage";
export default {
  name: "detailsprospect",
  components: {
    Header,
    Sidebar,
    editprospectbranche,
    addprospectbranche,
  },
  data() {
    return {
      names: "",
      prospects: [],
    };
  },
  created() {
    this.fetchData();
    this.fetchNameProspect();
  },
  methods: {
    async fetchNameProspect() {
      const uuidProspect = this.$route.params.uuidProspect;

      try {
        const names = await AppStorage.getNameProspectParUUID(uuidProspect);

        this.names = names;
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    async fetchData() {
      const uuidProspect = this.$route.params.uuidProspect;
      AppStorage.getBrancheProspectsByuuidProspect(uuidProspect).then((result) => {
        console.log(result)
        this.prospects = result;
      });
    },



    refresh() {
      const uuidProspect = this.$route.params.uuidProspect;
      AppStorage.getBrancheProspectsByuuidProspect(uuidProspect).then((result) => {
        this.prospects = result;
      });
    },
  },
};
</script>

    