<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Detail de la compagnie</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Detail de la compagnie
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="card mb-0">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="profile-view">
                  <div class="profile-basic">
                    <div class="row"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="emp_profile" class="pro-overview tab-pane fade show active">
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-striped custom-table mb-0">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Type de contrat</th>
                      <th>Date de début</th>
                      <th>Date de fin</th>
                      <th>Prime nette</th>
                      <th>Commision</th>
                      <th>Payé</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(contrat, i) in contrats" :key="i">
                      <tr>
                        <td>
                          <h5>{{ contrat.nom_client }}</h5>
                        </td>
                        <td>
                          <h5>{{ contrat.nom_branche }}</h5>
                        </td>

                        <td>
                          <h5>{{ formatDate(contrat.date_debut) }}</h5>
                        </td>
                        <td>{{ formatDate(contrat.date_fin) }}</td>
                        <td>{{ contrat.prime_nette }}</td>
                        <td>{{ contrat.commission_courtier }}</td>
                        <td v-if="contrat.payer_courtier == 0">
                          <span class="badge badge-pill bg-danger">NON</span>
                        </td>
                        <td v-else>
                          <span class="badge badge-pill bg-success">OUI</span>
                        </td>
                        <td v-if="contrat.payer_courtier == 0">
                          <a
                            href="#"
                            @click="editAvenant(contrat.uuidAvenant)"
                            data-bs-toggle="modal"
                            data-bs-target="#payer_apporteur"
                            title="Payer"
                            ><i class="fas fa-check"></i>
                          </a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total :</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>

                      <td>{{ sommes }}</td>
                      <td>{{ sommepayes }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <validatepaye
            v-bind:avenantoedit="avenantoedit"
            @type-update="refresh"
          ></validatepaye>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import validatepaye from "./validatepaye.vue";
import { formatDate, formatDateTime } from "../../utils/helpers/dateFormat";
import switchService from "../../services/switchService";
export default {
  name: "statapporteur",
  components: {
    Header,
    Sidebar,
    validatepaye,
  },
  data() {
    return {
      contrats: [],
      sommes: "",
      sommepayes: "",
      avenantoedit: "",
    };
  },
  created() {
    this.fetchData();
    this.fetchDataSomme();
    this.fetchDataSommePayer();
  },
  methods: {
    formatDate,
    formatDateTime,
    async editAvenant(uuidAvenant) {
      try {
        this.avenantoedit = await switchService.getAvenantByUuid(uuidAvenant);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchData() {
      const uuidCompagnie = this.$route.params.uuidCompagnie;
      try {
        const contrats = await switchService.getAvenantsByUUIDCompagnie(
          uuidCompagnie
        );

        this.contrats = contrats;
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des contrats:",
          error
        );
      }
    },

    async fetchDataSomme() {
      const uuidCompagnie = this.$route.params.uuidCompagnie;
      const sommes = await switchService.getSommeCommissionsCompagnie(
        uuidCompagnie
      );
      this.sommes = sommes;
    },

    async fetchDataSommePayer() {
      const uuidCompagnie = this.$route.params.uuidCompagnie;
      const sommepayes = await switchService.getSommeCommissionsCompagniePayer(
        uuidCompagnie
      );
      this.sommepayes = sommepayes;
    },

    async refresh() {
      const uuidCompagnie = this.$route.params.uuidCompagnie;
      this.contrats = await switchService.getAvenantsByUUIDCompagnie(
        uuidCompagnie
      );
      this.sommepayes = await switchService.getSommeCommissionsCompagniePayer(
        uuidCompagnie
      );
    },
  },
};
</script>