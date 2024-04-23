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
import { apiUrl } from "../../utils/constants/apiUrl.js";
import { validateApporteurForm } from "../../utils/helpers/formValidation";
import AxiosService from "../../services/AxiosService";
import { v4 as uuidv4 } from "uuid";
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
        // Afficher un message d'erreur
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
      }

      if (Object.keys(this.errors).length === 0) {
        if (this.unique) {
          const uuid = uuidv4();
          const userId = parseInt(AppStorage.getId(), 10);
          const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

          let codeApporteur = this.generateCodeApporteur();
          let donnees = this.extractValues(this.branches);
          let datas = this.extractUuidBranches(this.branches);

          const newApporteurData = [
            {
              nom_apporteur: this.form.nom_apporteur,
              contact_apporteur: this.form.contact_apporteur,
              email_apporteur: this.form.email_apporteur,
              adresse_apporteur: this.form.adresse_apporteur,
              code_postal: this.form.code_postal,
              // accidents: donnees,
              // ids: datas,
              sync: 0,
              id_entreprise: entrepriseId,
              id: userId,
              uuidApporteur: uuid,
              code_apporteur: codeApporteur,
              supprimer_apporteur: 0,
            },
          ];

          await AppStorage.storeDataInIndexedDB("apporteurs", newApporteurData);

          const branchesMap = await AppStorage.getBranches();

          // Convertir l'objet en tableau de paires clé-valeur
          const entries = Object.entries(branchesMap);

          for (const [key, value] of entries) {
            // Générer un UUID unique pour uuidTauxcompagnie
            const uuidTauxcompagnie = uuidv4();

            let newTauxApporteur = [
              {
                uuidTauxApporteur: uuidTauxcompagnie,
                uuidApporteur: uuid,
                sync: 0,
                taux: this.unique,
                nom_branche: value.nom_branche,
                id_entreprise: entrepriseId,
                uuidBranche: value.uuidBranche,
              },
            ];

            await AppStorage.storeDataInIndexedDB(
              "tauxapporteurs",
              newTauxApporteur
            );
          }

          toaster.success(`Compagnie ajouté`, {
            position: "top-right",
          });

          this.$router.push("/listapporteur");
        } else {
          const uuid = uuidv4();
          const userId = parseInt(AppStorage.getId(), 10);
          const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

          let codeApporteur = this.generateCodeApporteur();
          let donnees = this.extractValues(this.branches);
          let datas = this.extractUuidBranches(this.branches);

          const newApporteurData = [
            {
              nom_apporteur: this.form.nom_apporteur,
              contact_apporteur: this.form.contact_apporteur,
              email_apporteur: this.form.email_apporteur,
              adresse_apporteur: this.form.adresse_apporteur,
              code_postal: this.form.code_postal,
              // accidents: donnees,
              // ids: datas,
              sync: 0,
              id_entreprise: entrepriseId,
              id: userId,
              uuidApporteur: uuid,
              code_apporteur: codeApporteur,
              supprimer_apporteur: 0,
            },
          ];

          await AppStorage.storeDataInIndexedDB("apporteurs", newApporteurData);

          const branchesMap = await AppStorage.getBranches();
          for (let i = 0; i < datas.length; i++) {
            // const nom_branche = branchesMap[datas[i]];
            const dataItem = datas[i];

            const branch = branchesMap.find(
              (branch) => branch.uuidBranche === dataItem
            );
            const nom_branche = branch.nom_branche;
            // Générer un UUID unique pour uuidTauxcompagnie
            const uuidTauxcompagnie = uuidv4();

            let newTauxApporteur = [
              {
                uuidTauxApporteur: uuidTauxcompagnie,
                uuidApporteur: uuid,
                sync: 0,
                taux: donnees[i],
                nom_branche: nom_branche,
                id_entreprise: entrepriseId,
                uuidBranche: datas[i],
              },
            ];

            await AppStorage.storeDataInIndexedDB(
              "tauxapporteurs",
              newTauxApporteur
            );
          }

          toaster.success(`Apporteur ajouté `, {
            position: "top-right",
          });

          this.$router.push("/listapporteur");
        }
      }
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
      AppStorage.getLocalisations().then((result) => {
        this.localisations = result;
      });
    },

    getBranche: function () {
      AppStorage.getBranches().then((result) => {
        this.branches = result;
      });
    },
  },
  components: { Header, Sidebar, inputText, addadresse, Multiselect },
};
</script>
  