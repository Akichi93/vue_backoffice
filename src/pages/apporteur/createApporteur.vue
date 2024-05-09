<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Création d'apporteur</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Apporteur
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="card tab-box mt-3">
          <div class="row user-tabs">
            <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul class="nav nav-tabs nav-tabs-bottom pt-3 pb-2">
                <li class="nav-item">
                  <a
                    href="#emp_profile"
                    data-bs-toggle="tab"
                    class="nav-link active"
                    >Général</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#bank_statutory"
                    data-bs-toggle="tab"
                    class="nav-link"
                    >Taux</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div id="emp_profile" class="pro-overview tab-pane fade show active">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title mb-0">Général</h4>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Nom de l'apporteur</label>
                          <inputText
                            :placeholder="'Entrez le nom de l apporteur'"
                            v-model="form.nom_apporteur"
                          >
                          </inputText>
                          <p
                            style="color: red"
                            class="text-red"
                            v-if="errors.nom_apporteur"
                            v-text="errors.nom_apporteur"
                          ></p>
                        </div>
                        <div class="form-group">
                          <label>Contact</label>
                          <inputText
                            :placeholder="'Entrez le contact de l\'apporteur'"
                            v-model="form.contact_apporteur"
                          >
                          </inputText>
                          <p
                            style="color: red"
                            class="text-red"
                            v-if="errors.contact_apporteur"
                            v-text="errors.contact_apporteur"
                          ></p>
                        </div>
                        <div class="form-group">
                          <label>Code postal</label>
                          <inputText
                            :placeholder="'Entrez le code postal de l\'apporteur'"
                            v-model="form.code_postal"
                          >
                          </inputText>
                          <p
                            style="color: red"
                            class="text-red"
                            v-if="errors.code_postal"
                            v-text="errors.code_postal"
                          ></p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Email</label>
                              <inputText
                                :placeholder="'Entrez l\'email de de l\'apporteur'"
                                v-model="form.email_apporteur"
                              >
                              </inputText>
                              <p
                                style="color: red"
                                class="text-red"
                                v-if="errors.email_apporteur"
                                v-text="errors.email_apporteur"
                              ></p>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Adresse</label>
                              <Multiselect
                                v-model="form.adresse_apporteur"
                                :options="localisations"
                                :custom-label="
                                  ({ uuidLocalisation, nom_ville }) =>
                                    `${uuidLocalisation} - [${nom_ville}]`
                                "
                                valueProp="nom_ville"
                                placeholder="Selectionnez zone"
                                label="nom_ville"
                                track-by="nom_ville"
                                :searchable="true"
                              >
                              </Multiselect>
                              <p
                                style="color: red"
                                class="text-red"
                                v-if="errors.adresse_apporteur"
                                v-text="errors.adresse_apporteur"
                              ></p>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div class="form-group">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#addProspect"
                                style="margin-top: 25px"
                              >
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="bank_statutory">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">Taux</h3>

                <div class="row">
                  <div class="input-block mb-3 row" v-if="!typeSelected">
                    <label class="col-lg-3 col-form-label"
                      >Selectionner un type</label
                    >
                    <select
                      class="form-select mb-3"
                      name="type"
                      id="type"
                      @change="handleTypeSelection"
                    >
                      <option></option>
                      <option>Unique</option>
                      <option>Définir</option>
                    </select>
                  </div>
                  <div class="row" v-if="showTaux">
                    <div class="col-md-9">
                      <label>Entrez le taux unique</label>
                      <input
                        type="number"
                        v-model="unique"
                        step="0.01"
                        min="0"
                        max="1000"
                      />
                    </div>
                  </div>
                  <div
                    class="col-md-6"
                    v-for="branche in branches"
                    :key="branche.uuidBranche"
                  >
                    <div class="form-group" v-if="showGroup">
                      <label>{{ branche.nom_branche }}</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Entrez le taux"
                        :key="branche.uuidBranche"
                        step="0.01"
                        min="0"
                        max="1000"
                        v-model="branche.value"
                      />
                    </div>
                  </div>
                </div>
                <div class="submit-section">
                  <button
                    class="btn btn-primary submit-btn"
                    type="button"
                    @click="storeApporteur"
                    v-if="showButton"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <addadresse @adresse-add="handleClientsChange"></addadresse>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import inputText from "../../components/input/inputText.vue";
import addadresse from "../../pages/form/addadresse.vue";
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from "../../db/AppStorage.js";
import { validateApporteurForm } from "../../utils/helpers/formValidation";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});

export default {
  name: "createapporteur",
  data() {
    return {
      showTaux: false,
      showGroup: false,
      showButton: false,
      value: null,
      localisations: [],
      branches: [],
      form: {
        nom_apporteur: "",
        contact_apporteur: "",
        email_apporteur: "",
        adresse_apporteur: "",
        code_postal: "",
      },
      ajout_adresse: "",
      accidents: [],
      ids: [],
      errors: {},
      isConnected: false,
    };
  },
  created() {
    this.getBranche();
    this.getAdresse();
  },

  methods: {
    // fetchApporteurs

    handleTypeSelection(event) {
      const selectedType = event.target.value;
      this.showTaux = selectedType === "Unique";
      this.showGroup = selectedType === "Définir";
      this.typeSelected = true;
      this.showButton = true;
    },

    async storeApporteur() {
      try {
        await this.storeApporteurOffline();
      } catch (error) {
        console.error("Error storing apporteur:", error);
      }
    },

    async storeApporteurOffline() {
      this.errors = validateApporteurForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }

      const unique = this.unique;
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
      let donnees = this.extractValues(this.branches);
      let datas = this.extractUuidBranches(this.branches);
      let codeApporteur = this.generateCodeApporteur();

      await switchService.storeApporteur(
        this.form,
        userId,
        entrepriseId,
        codeApporteur,
        unique,
        donnees,
        datas
      );

      toaster.success(`Apporteur ajouté`, {
        position: "top-right",
      });

      this.$router.push("/listapporteur");
    },

    getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return year + month + day;
    },

    generateCodeApporteur() {
      let dateDuJour = this.getFormattedDate();
      let deuxPremiersCaracteres = this.form.nom_apporteur
        .substring(0, 2)
        .toUpperCase();
      return "AP-" + deuxPremiersCaracteres + dateDuJour;
    },

    extractValues(branches) {
      return branches.map((branch) => branch["value"]);
    },

    extractUuidBranches(branches) {
      return branches.map((branch) => branch["uuidBranche"]);
    },

    getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return year + month + day;
    },

    async getAdresse() {
      this.localisations = await switchService.getAdresses();
    },

    async getBranche() {
      this.branches = await switchService.getBranches();
    },
  },
  components: { Header, Sidebar, inputText, addadresse, Multiselect },
};
</script>
  