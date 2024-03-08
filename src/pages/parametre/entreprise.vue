<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Entreprises</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Entreprises
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher une entreprise"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-12">
            <div>
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom de l'entreprise</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Situation géographique</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(entreprise, i) in entreprises" :key="i">
                    <tr>
                      <td v-text="entreprise.nom"></td>
                      <td v-text="entreprise.email"></td>
                      <td v-text="entreprise.contact"></td>
                      <td v-text="entreprise.adresse"></td>
                      <td v-if="entreprise.statut == 0">Encours</td>
                      <td v-else-if="entreprise.statut == 1">Validé</td>
                      <td v-else>Refusé</td>
                      <td
                        v-if="entreprise.statut == 0"
                        class="text-end ico-sec d-flex justify-content-end"
                      >
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          @click="getEntreprise(entreprise.id_entreprise)"
                          title="Valider"
                          data-bs-target="#edit_department"
                          ><i class="fas fa-check"></i
                        ></a>
                        
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          title="Refuser"
                          data-bs-target="#edit_department"
                          ><i class="fas fa-close"></i
                        ></a>

                      </td>
                      <td v-if="entreprise.statut == 1">PAS D'ACTION</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <validateentreprise v-bind:entreprisetoedit="entreprisetoedit"></validateentreprise>
    </div>
  </div>

  
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import { getEntreprisesList } from "../../services/entrepriseservice";
import validateentreprise from "./validateentreprise.vue"
import Multiselect from "@vueform/multiselect";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    Multiselect,
    Header,
    Sidebar,
    validateentreprise
  },
  data() {
    return {
      entreprises: [],
      entreprisetoedit: "",
    };
  },
  created() {
    this.getEntreprises();
  },
  methods: {
    getEntreprises: function () {
      getEntreprisesList().then((resultat) => {
        this.entreprises = resultat;
      });
    },

    getEntreprise(id_entreprise) {
      axios
        .get("/api/auth/entreprises/edit/" + id_entreprise)
        .then((response) => {
          this.entreprisetoedit = response.data;
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  
  },
};
</script>
