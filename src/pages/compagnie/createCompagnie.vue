<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Création de compagnie</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Compagnies
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
                          <label>Nom de la compagnie</label>
                          <inputText
                            :placeholder="'Entrez le nom de la compagnie'"
                            v-model="form.nom_compagnie"
                          >
                          </inputText>

                          <p
                            style="color: red"
                            class="text-red"
                            v-if="errors.nom_compagnie"
                            v-text="errors.nom_compagnie"
                          ></p>
                        </div>
                        <div class="form-group">
                          <label>Contact</label>
                          <inputText
                            :placeholder="'Entrez le contact de la compagnie'"
                            v-model="form.contact_compagnie"
                          >
                          </inputText>
                          <p
                            style="color: red"
                            class="text-red"
                            v-if="errors.contact_compagnie"
                            v-text="errors.contact_compagnie"
                          ></p>
                        </div>
                        <div class="form-group">
                          <label>Code postal</label>
                          <inputText
                            :placeholder="'Entrez le code postal de la compagnie'"
                            v-model="form.postal_compagnie"
                          >
                          </inputText>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Email</label>
                              <inputText
                                :placeholder="'Entrez l\'email de la compagnie'"
                                v-model="form.email_compagnie"
                              >
                              </inputText>
                              <p
                                style="color: red"
                                class="text-red"
                                v-if="errors.email_compagnie"
                                v-text="errors.email_compagnie"
                              ></p>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Adresse</label>
                              <Multiselect
                                v-model="form.adresse_compagnie"
                                :options="localisations"
                                :custom-label="
                                  ({ id_localisation, nom_ville }) =>
                                    `${id_localisation} - [${nom_ville}]`
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
                                v-if="errors.adresse_compagnie"
                                v-text="errors.adresse_compagnie"
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
                <form>
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
                      v-if="showButton"
                      class="btn btn-primary submit-btn"
                      type="button"
                      @click="storeCompagnie"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <addadresse @adresse-add="handleClientsChange"></addadresse>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import inputText from "../../components/input/inputText.vue";
import addadresse from "../../pages/form/addadresse.vue";
import AppStorage from "../../db/AppStorage.js";
import { validateCompagnieForm } from "../../utils/helpers/formValidation";
// import { apiUrl } from "../../utils/constants/apiUrl";
import { v4 as uuidv4 } from "uuid";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});

export default {
  name: "createcompagnie",
  components: {
    Header,
    Sidebar,
    inputText,
    addadresse,
    Multiselect,
  },
  data() {
    return {
      showTaux: false,
      showGroup: false,
      showButton: false,
      value: null,
      form: {
        nom_compagnie: "",
        contact_compagnie: "",
        email_compagnie: "",
        adresse_compagnie: "",
      },
      localisations: {},
      branches: {},
      accidents: [],
      ids: [],
      errors: {},
      ajout_adresse: "",
      isConnected: false,
    };
  },
  created() {
    this.getBranche();
    this.getAdresse();
  },

  methods: {
    handleTypeSelection(event) {
      const selectedType = event.target.value;
      this.showTaux = selectedType === "Unique";
      this.showGroup = selectedType === "Définir";
      this.typeSelected = true;
      this.showButton = true;
    },
    async getBranche() {
      AppStorage.getBranches().then((result) => {
        this.branches = result;
      });
    },

    async getAdresse() {
      AppStorage.getLocalisations().then((result) => {
        this.localisations = result;
      });
    },

    async storeCompagnie() {
      // const response = await fetch(
      //   "/api/check-internet-connection"
      // );

      // const data = await response.json();

      // this.isConnected = data.connected;
      // if (this.isConnected) {
      //   const { v4: uuidv4 } = require('uuid');
      //   const uuid = uuidv4();

      //   const token = AppStorage.getToken();
      //   const userId = AppStorage.getId();
      //   const entrepriseId = AppStorage.getEntreprise();

      //   let test = JSON.parse(JSON.stringify(this.branches));
      //   let donnees = [];

      //   for (let i = 0; i < Object.keys(test).length; i++) {
      //     donnees.push(test[i]["value"]);
      //   }

      //   let testing = JSON.parse(JSON.stringify(this.branches));
      //   let datas = [];

      //   for (let i = 0; i < Object.keys(testing).length; i++) {
      //     datas.push(testing[i]["uuidBranche"]);
      //   }

      //   // Obtenir la date du jour au format YYYYMMDD
      //   var today = new Date();
      //   var year = today.getFullYear();
      //   var month = (today.getMonth() + 1).toString().padStart(2, '0');
      //   var day = today.getDate().toString().padStart(2, '0');

      //   var dateDuJour = year + month + day;

      //   // Supposons que $nom est votre variable contenant le nom du client
      //   var nom = this.nom_compagnie;

      //   // Prendre les deux premiers caractères du nom
      //   var deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase(); // Mettre en majuscules

      //   // Générer le numéro de client en ajoutant "CL-" à la date du jour
      //   var codeCompagnie = "CO-" + deuxPremiersCaracteres + dateDuJour;

      //   try {
      //     const response = await axios.post(apiUrl.postcompagnie, {
      //       nom_compagnie: this.nom_compagnie,
      //       contact_compagnie: this.contact_compagnie,
      //       email_compagnie: this.email_compagnie,
      //       adresse_compagnie: this.adresse_compagnie,
      //       accidents: donnees,
      //       ids: datas,
      //       id_entreprise: entrepriseId,
      //       id: userId,
      //       uuidCompagnie: uuid,
      //       code_compagnie: codeCompagnie,
      //     });

      //     const updatedCompagnies = await this.fetchCompagnies();

      //     if (response.status === 200) {
      //       console.log(response.data)
      //       toaster.success(`Compagnie ajouté avec succès`, {
      //         position: "top-right",
      //       });
      //     }

      //     // Mettre à jour IndexedDB avec les compagnies récupérés après comparaison
      //     AppStorage.getCompagnies().then((existingCompagnies) => {
      //       if (existingCompagnies && updatedCompagnies) {
      //         // Comparaison des nouvelles compagnies avec ceux déjà existants
      //         const newCompagnies = updatedCompagnies.filter((compagnie) => {
      //           return !existingCompagnies.some((existingCompagnie) => existingCompagnie.id_compagnie === compagnie.id_compagnie);
      //         });

      //         // Insérer uniquement les nouvelles compagnies dans IndexedDB
      //         if (newCompagnies.length > 0) {
      //           AppStorage.storeDataInIndexedDB('compagnies', newCompagnies);
      //         }
      //       }
      //     });

      //     // Mettre à jour IndexedDB avec les taux compagnies récupérés

      //     const newCompanyId = response.data.id_compagnie;

      //     const ratesEndpoint = `/api/auth/gettauxcompagnie/${newCompanyId}`;

      //     const ratesResponse = await axios.get(ratesEndpoint);

      //     const rates = ratesResponse.data;

      //     AppStorage.storeDataInIndexedDB('tauxcompagnies', rates);

      //     this.$router.push("/listcompagnie");

      //   } catch (error) {
      //     console.error("Erreur lors de l'ajout de la compagnie sur le serveur", error);
      //   }
      // } else {

      this.errors = validateCompagnieForm(this.form);

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

          // Obtenir la date du jour au format YYYYMMDD
          let today = new Date();
          let year = today.getFullYear();
          let month = (today.getMonth() + 1).toString().padStart(2, "0");
          let day = today.getDate().toString().padStart(2, "0");

          let dateDuJour = year + month + day;

          // Supposons que $nom est votre variable contenant le nom du client
          let nom = this.form.nom_compagnie;

          // Prendre les deux premiers caractères du nom
          let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase(); // Mettre en majuscules

          // Générer le numéro de client en ajoutant "CL-" à la date du jour
          let codeCompagnie = "CO-" + deuxPremiersCaracteres + dateDuJour;

          // Si hors ligne, ajoutez la nouvelle donnée directement dans IndexedDB
          const newCompagnieData = [
            {
              nom_compagnie: this.form.nom_compagnie,
              adresse_compagnie: this.form.adresse_compagnie,
              email_compagnie: this.form.email_compagnie,
              postal_compagnie: this.form.postal_compagnie,
              contact_compagnie: this.form.contact_compagnie,
              postal_compagnie: this.form.postal_compagnie,
              sync: 0,
              id_entreprise: entrepriseId,
              user_id: userId,
              uuidCompagnie: uuid,
              code_compagnie: codeCompagnie,
              supprimer_compagnie: 0,
            },
          ];

          // Ajouter la nouvelle donnée dans IndexedDB
          await AppStorage.storeDataInIndexedDB("compagnies", newCompagnieData);

          const branchesMap = await AppStorage.getBranches();

          // Convertir l'objet en tableau de paires clé-valeur
          const entries = Object.entries(branchesMap);

          for (const [key, value] of entries) {
            let newTauxCompagnie = [
              {
                uuidTauxCompagnie: uuidTauxcompagnie,
                uuidCompagnie: uuid,
                sync: 0,
                tauxcomp: this.unique,
                nom_branche: value.nom_branche,
                id_entreprise: entrepriseId,
                uuidBranche: value.uuidBranche,
              },
            ];
          }
          

          await AppStorage.storeDataInIndexedDB(
              "tauxcompagnies",
              newTauxCompagnie
            );
          }

          toaster.success(`Compagnie ajouté`, {
            position: "top-right",
          });

          this.$router.push("/listcompagnie");
        } else {
          const uuid = uuidv4();

          const userId = parseInt(AppStorage.getId(), 10);
          const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

          let test = JSON.parse(JSON.stringify(this.branches));
          let donnees = [];

          for (let i = 0; i < Object.keys(test).length; i++) {
            donnees.push(test[i]["value"]);
          }

          let testing = JSON.parse(JSON.stringify(this.branches));
          let datas = [];

          for (let i = 0; i < Object.keys(testing).length; i++) {
            datas.push(testing[i]["uuidBranche"]);
          }

          // Obtenir la date du jour au format YYYYMMDD
          let today = new Date();
          let year = today.getFullYear();
          let month = (today.getMonth() + 1).toString().padStart(2, "0");
          let day = today.getDate().toString().padStart(2, "0");

          let dateDuJour = year + month + day;

          // Supposons que $nom est votre variable contenant le nom du client
          let nom = this.form.nom_compagnie;

          // Prendre les deux premiers caractères du nom
          let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase(); // Mettre en majuscules

          // Générer le numéro de client en ajoutant "CL-" à la date du jour
          let codeCompagnie = "CO-" + deuxPremiersCaracteres + dateDuJour;

          // Si hors ligne, ajoutez la nouvelle donnée directement dans IndexedDB
          const newCompagnieData = [
            {
              nom_compagnie: this.form.nom_compagnie,
              adresse_compagnie: this.form.adresse_compagnie,
              email_compagnie: this.form.email_compagnie,
              postal_compagnie: this.form.postal_compagnie,
              contact_compagnie: this.form.contact_compagnie,
              postal_compagnie: this.form.postal_compagnie,
              sync: 0,
              id_entreprise: entrepriseId,
              user_id: userId,
              uuidCompagnie: uuid,
              code_compagnie: codeCompagnie,
              supprimer_compagnie: 0,
            },
          ];

          // Ajouter la nouvelle donnée dans IndexedDB
          await AppStorage.storeDataInIndexedDB("compagnies", newCompagnieData);

          const branchesMap = await AppStorage.getBranches();
          // console.log(branchesMap)

          for (let i = 0; i < datas.length; i++) {
            // const nom_branche = branchesMap[datas[i]];

            const dataItem = datas[i];
            const branch = branchesMap.find(
              (branch) => branch.uuidBranche === dataItem
            );
            const nom_branche = branch.nom_branche;

            // Générer un UUID unique pour uuidTauxcompagnie
            const uuidTauxcompagnie = uuidv4();

            let newTauxCompagnie = [
              {
                uuidTauxCompagnie: uuidTauxcompagnie,
                uuidCompagnie: uuid,
                sync: 0,
                tauxcomp: donnees[i],
                nom_branche: nom_branche,
                id_entreprise: entrepriseId,
                uuidBranche: datas[i],
              },
            ];

            await AppStorage.storeDataInIndexedDB(
              "tauxcompagnies",
              newTauxCompagnie
            );
          }

          toaster.success(`Compagnie ajouté`, {
            position: "top-right",
          });

          this.$router.push("/listcompagnie");
        }

        // }
      // }
    },

    // fetchCompagnies
    // async fetchCompagnies() {
    //   const token = AppStorage.getToken();

    //   // Configurez les en-têtes de la requête
    //   const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    //   };

    //   try {
    //     const response = await axios.get(apiUrl.getcompagnie, { headers });

    //     // Vous pouvez traiter les données comme vous le souhaitez
    //     const compagnies = response.data;

    //     // Retourner les compagnies pour une utilisation éventuelle
    //     return compagnies;
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des clients sur le serveur", error);
    //   }
    // },

    handleClientsChange(localisations) {
      this.localisations = localisations;
    },
  },
};
</script>