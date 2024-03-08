<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Tarification automobile</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Tarification automobbile
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
              <router-link
                to="/createauto"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i> Ajouter </router-link
              >
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher une tarification"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-12" style="display: flex; justify-content: end">
            <contratexport></contratexport>
          </div>
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
                  <template
                    v-for="contrat in contrats.data"
                    :key="contrat.id_contrat"
                  >
                    <tr>
                      <td v-text="contrat.numero_client"></td>
                      <td v-text="contrat.nom_client"></td>
                      <td v-text="contrat.nom_compagnie"></td>
                      <td v-text="contrat.nom_branche"></td>
                      <td v-text="contrat.effet_police"></td>
                      <td v-text="contrat.expire_le"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <router-link
                          :to="{
                            name: 'detailscontrat',
                            params: { id_contrat: contrat.id_contrat },
                          }"
                          ><i class="fas fa-info"></i
                        ></router-link>

                        <router-link
                          :to="{
                            name: 'avenants',
                            params: { id_contrat: contrat.id_contrat },
                          }"
                          ><i class="fas fa-paper-plane"></i
                        ></router-link>

                        <router-link
                          :to="{
                            name: 'editcontrat',
                            params: { id_contrat: contrat.id_contrat },
                          }"
                          ><i class="fas fa-pen"></i
                        ></router-link>

                        <a
                          href="#"
                          v-if="roleactif == 'ADMIN'"
                          @click="editContrat(contrat.id_contrat)"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_contrat"
                          title="Supprimer"
                          ><i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <deletecontrat v-bind:contrattoedit="contrattoedit"></deletecontrat>

            <pagination
              align="center"
              :data="contrats"
              :limit="5"
              :current_page="contrats.current_page"
              :last_page="contrats.last_page"
              @pagination-change-page="getContrat"
            >
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
import { getContratsList } from "../../services/contratService";
import { getRoleActif } from "../../services/roleservice";
import deletecontrat from "../contrat/deletecontrat.vue";
import pagination from "laravel-vue-pagination";
import contratexport from "../../components/export/contratexport.vue";
export default {
  components: {
    Header,
    Sidebar,
    deletecontrat,
    pagination,
    contratexport,
  },
  data() {
    return {
      value: null,
      contrats: [],
      contrattoedit: "",
      q: "",
      roleactif: "",
    };
  },
  created() {
    this.getContrat();
    this.getRoleconnect();
  },
  methods: {
    editContrat(id_contrat) {
      axios
        .get("/api/auth/editContrat/" + id_contrat)
        .then((response) => {
          this.contrattoedit = response.data;
          // this.form.id_contrat = response.data.id_contrat;
        })
        .catch((error) => console.log(error));
    },

    getContrat(page) {
      getContratsList(page).then((result) => {
        this.contrats = result;
      });
    },
    getRoleconnect() {
      getRoleActif().then((result) => {
        this.roleactif = result;
      });
    },

    searchtask() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      if (this.q.length > 0) {
        axios
          .get("/api/auth/contratList/" + this.q, { headers })
          .then((response) => (this.contrats = response.data.data))
          .catch((error) => console.log(error));
      } else {
        axios
          .get("/api/auth/contratList/", { headers })
          .then((response) => (this.contrats = response.data))
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
    