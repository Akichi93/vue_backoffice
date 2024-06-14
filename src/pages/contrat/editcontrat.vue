<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Modifier contrat</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/listcontrat"
                      >Liste des contrats</router-link
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Modifier contrat
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card mb-0">
              <div class="card-header">
                <h4 class="card-title mb-0">Information personnelle</h4>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>N° de la police</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="contrats.numero_police"
                              placeholder="Entrez le numéro de police"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Branche</label>
                            <Multiselect
                              disabled
                              :value="contrats.uuidBranche"
                              :options="branches"
                              :custom-label="
                                ({ uuidBranche, nom_branche }) =>
                                  `${uuidBranche} - [${nom_branche}]`
                              "
                              valueProp="uuidBranche"
                              label="nom_branche"
                              track-by="nom_branche"
                              :searchable="true"
                            >
                            </Multiselect>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Compagnie:</label>
                            <Multiselect
                              @select="optionSelected"
                              :value="contrats.uuidCompagnie"
                              :options="compagnies"
                              :custom-label="
                                ({ uuidCompagnie, nom_compagnie }) =>
                                  `${uuidCompagnie} - [${nom_compagnie}]`
                              "
                              valueProp="uuidCompagnie"
                              placeholder="Choisir une compagnie"
                              label="nom_compagnie"
                              track-by="nom_compagnie"
                              :searchable="true"
                            >
                            </Multiselect>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Date d'émission:</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="contrats.souscrit_le"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>A:</label>
                            <input
                              type="time"
                              class="form-control"
                              v-model="contrats.heure_police"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Expire le:</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="contrats.expire_le"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Client:</label>
                            <Multiselect
                              v-model="client_id"
                              :value="contrats.uuidClient"
                              :options="clients"
                              :custom-label="
                                ({ uuidClient, nom_client }) =>
                                  `${uuidClient} - [${nom_client}]`
                              "
                              valueProp="uuidClient"
                              placeholder="Choisir un client"
                              label="nom_client"
                              track-by="nom_client"
                              :searchable="true"
                            >
                            </Multiselect>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#add_client"
                              style="margin-top: 25px"
                            >
                              Ajouter client
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Apporteur:</label>
                            <Multiselect
                              @select="optionSelect"
                              :value="contrats.uuidApporteur"
                              :options="apporteurs"
                              :custom-label="
                                ({ uuidApporteur, nom_apporteur }) =>
                                  `${uuidApporteur} - [${nom_apporteur}]`
                              "
                              valueProp="uuidApporteur"
                              placeholder="Choisir un apporteur"
                              label="nom_apporteur"
                              track-by="nom_apporteur"
                              :searchable="true"
                            >
                            </Multiselect>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Effet de police</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="contrats.effet_police"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Reconduction</label>
                            <Multiselect
                              :value="contrats.reconduction"
                              :options="reconducts"
                              placeholder="Choisir la reconduction"
                              :searchable="false"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="row" style="margin-top: -10px">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0">Primes & commissions</h4>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label>Prime nette</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="contrats.prime_nette"
                  />
                </div>
                <div class="form-group">
                  <label>Accessoires</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="contrats.accessoires"
                  />
                </div>
                <div class="form-group">
                  <label>Frais courtier</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="contrats.frais_courtier"
                  />
                </div>
                <div class="form-group">
                  <label>FGA</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="contrats.cfga"
                  />
                </div>
                <div class="form-group">
                  <label>Taxes totale</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="contrats.taxes_totales"
                  />
                </div>
                <div class="form-group">
                  <label>Gestion</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="contrats.gestion"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="submit-section">
          <button class="btn btn-primary submit-btn" @click="editContrat">
            Enregistrer
          </button>
        </div>

        <addclient @client-add="refresh"></addclient>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import { getClientSelect } from "../../services/clientService";
import { getApporteursExport } from "../../services/apporteurService";
import { getCompagniesExport } from "../../services/compagnieService";
import { getBrancheList } from "../../services/formService";
import { createToaster } from "@meforma/vue-toaster";
import addclient from "../../pages/clients/addclient.vue";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    Multiselect,
    Header,
    Sidebar,
    addclient,
  },
  data() {
    return {
      result: "",
      contrats: {},
      clients: {},
      branches: {},
      apporteurs: {},
      compagnies: {},
      value: null,
      typegarantie: [],
      localisations: {},
      types: ["Technique", "Commercial"],
      reconducts: ["Oui", "Non"],
    };
  },
  created() {
    this.fetchData();
    this.getClients();
    this.getBranche();
    this.getApporteur();
    this.getCompagnie();
  },

  methods: {
    async fetchData() {
      const uuidContrat = this.$route.params.uuidContrat;

      try {
        this.contrats = await switchService.getInfoContratByUuid(uuidContrat);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    async editContrat() {
      const uuidContratToUpdate = this.$route.params.uuidContrat;
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const updatedContrat = await switchService.updateContrat(
        this.contrats,
        uuidContratToUpdate,
        entrepriseId
      );
    },

    async getBranche() {
      this.branches = await switchService.getBranches();
    },

    async getClients() {
      this.clients = await switchService.getClients();
    },

    async getApporteur() {
      this.apporteurs = await switchService.getApporteurs();
    },

    async getCompagnie() {
      this.compagnies = await switchService.getCompagnies();
    },
  },
};
</script>