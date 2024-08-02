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
                    <router-link to="/listclient"
                      >Listes des clients</router-link
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

        <div v-if="contrats.length === 0">
          <p>Chargement des contrats...</p>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-md-12">
              <div>
                <table class="table table-striped custom-table mb-0">
                  <thead>
                    <tr>
                      <th>Numéro de la police</th>
                      <th>Nom de la branche</th>
                      <th>Souscrit le</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="contrat in contrats" :key="contrat.uuidContrat">
                      <td>
                        <router-link
                        :to="{ name: 'detailscontrat', params: { uuidContrat: contrat.uuidContrat }}"
                        class="btn btn-sm btn-info me-2"
                      >
                        {{ contrat.numero_police }}
                      </router-link>
                      </td>
                      <td v-text="contrat.branche.nom_branche"></td>
                      <td>{{ formatDate(contrat.souscrit_le) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import switchService from "../../services/switchService";
import { formatDate, formatDateTime } from "../../utils/helpers/dateFormat";

export default {
  name: "detailsprospect",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      names: "",
      contrats: [],
    };
  },
  created() {
    this.fetchData();
    this.fetchNameClient();
  },
  methods: {
    formatDate,
    formatDateTime,
    async fetchNameClient() {
      const uuidProspect = this.$route.params.uuidProspect;
      try {
        this.names = await switchService.getNameProspectParUUID(uuidProspect);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },
    async fetchData() {
      const uuidClient = this.$route.params.uuidClient;
      try {
        this.contrats = await switchService.getContratByUuidClient(uuidClient);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },
  },
};
</script>

<style scoped>
.contrat {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
