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
                  <a href="#emp_profile" data-bs-toggle="tab" class="nav-link active">Général</a>
                </li>
                <li class="nav-item">
                  <a href="#bank_statutory" data-bs-toggle="tab" class="nav-link">Taux</a>
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
                          <inputText :placeholder="'Entrez le nom de l apporteur'" v-model="form.nom_apporteur">
                          </inputText>
                          <p style="color: red" class="text-red" v-if="errors.nom_apporteur"
                            v-text="errors.nom_apporteur"></p>
                        </div>
                        <div class="form-group">
                          <label>Contact</label>
                          <inputText :placeholder="'Entrez le contact de l\'apporteur'" v-model="form.contact_apporteur">
                          </inputText>
                          <p style="color: red" class="text-red" v-if="errors.contact_apporteur"
                            v-text="errors.contact_apporteur"></p>
                        </div>
                        <div class="form-group">
                          <label>Code postal</label>
                          <inputText :placeholder="'Entrez le code postal de l\'apporteur'" v-model="form.code_postal">
                          </inputText>
                          <p style="color: red" class="text-red" v-if="errors.code_postal" v-text="errors.code_postal">
                          </p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Email</label>
                              <inputText :placeholder="'Entrez l\'email de de l\'apporteur'"
                                v-model="form.email_apporteur">
                              </inputText>
                              <p style="color: red" class="text-red" v-if="errors.email_apporteur"
                                v-text="errors.email_apporteur"></p>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-9">
                            <div class="form-group">
                              <label>Adresse</label>
                              <Multiselect v-model="form.adresse_apporteur" :options="localisations" :custom-label="({ uuidLocalisation, nom_ville }) =>
                                `${uuidLocalisation} - [${nom_ville}]`
                                " valueProp="nom_ville" placeholder="Selectionnez zone" label="nom_ville"
                                track-by="nom_ville" :searchable="true">
                              </Multiselect>
                              <p style="color: red" class="text-red" v-if="errors.adresse_apporteur"
                                v-text="errors.adresse_apporteur"></p>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div class="form-group">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addProspect" style="margin-top: 25px">
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
                  <div class="col-md-6" v-for="branche in branches" :key="branche.uuidBranche">
                    <div class="form-group">
                      <label>{{ branche.nom_branche }}</label>
                      <input type="number" class="form-control" placeholder="Entrez le taux" :key="branche.uuidBranche"
                        step="0.01" min="0" max="1000" v-model="branche.value" />
                    </div>
                  </div>
                </div>
                <div class="submit-section">
                  <button class="btn btn-primary submit-btn" type="button" @click="storeApporteur">
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
import { validateApporteurForm } from '../../utils/helpers/formValidation';
import AxiosService from "../../services/AxiosService";
import { v4 as uuidv4 } from 'uuid';
const toaster = createToaster({
  /* options */
});

export default {
  name: "createapporteur",
  data() {
    return {
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
    // async storeApporteur() {
    //   const response = await fetch(
    //     "/api/check-internet-connection"
    //   );

    //   const data = await response.json();

    //   this.isConnected = data.connected;
    //   if (this.isConnected) {
    //     const { v4: uuidv4 } = require('uuid');
    //     const uuid = uuidv4();

    //     const token = AppStorage.getToken();
    //     const userId = AppStorage.getId();
    //     const entrepriseId = AppStorage.getEntreprise();

    //     // Configurez les en-têtes de la requête
    //     let test = JSON.parse(JSON.stringify(this.branches));
    //     let donnees = [];

    //     for (let i = 0; i < Object.keys(test).length; i++) {
    //       donnees.push(test[i]["value"]);
    //     }

    //     let testing = JSON.parse(JSON.stringify(this.branches));
    //     let datas = [];

    //     for (let i = 0; i < Object.keys(testing).length; i++) {
    //       datas.push(testing[i]["uuidBranche"]);
    //     }

    //     // Obtenir la date du jour au format YYYYMMDD
    //     let today = new Date();
    //     let year = today.getFullYear();
    //     let month = (today.getMonth() + 1).toString().padStart(2, '0');
    //     let day = today.getDate().toString().padStart(2, '0');

    //     let dateDuJour = year + month + day;

    //     // Supposons que $nom est votre variable contenant le nom du client
    //     let nom = this.nom_apporteur;

    //     // Prendre les deux premiers caractères du nom
    //     let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase(); // Mettre en majuscules

    //     // Générer le numéro de client en ajoutant "CL-" à la date du jour
    //     let codeApporteur = "AP-" + deuxPremiersCaracteres + dateDuJour;

    //     try {
    //       const response = await this.axiosService.post(apiUrl.postapporteur, {
    //         code_apporteur: codeApporteur,
    //         nom_apporteur: this.nom_apporteur,
    //         contact_apporteur: this.contact_apporteur,
    //         email_apporteur: this.email_apporteur,
    //         adresse_apporteur: this.adresse_apporteur,
    //         code_postal: this.code_postal,
    //         accidents: donnees,
    //         ids: datas,
    //         id_entreprise: entrepriseId,
    //         id: userId,
    //         uuidApporteur: uuid,
    //       });

    //       const updatedApporteurs = await this.fetchApporteurs();

    //       if (response.status === 200) {
    //         toaster.success(`Compagnie ajouté avec succès`, {
    //           position: "top-right",
    //         });
    //       }

    //       // Mettre à jour IndexedDB avec les apporteurs récupérés après comparaison
    //       AppStorage.getApporteurs().then((existingApporteurs) => {
    //         if (existingApporteurs && updatedApporteurs) {
    //           // Comparaison des nouvelles compagnies avec ceux déjà existants
    //           const newApporteurs = updatedApporteurs.filter((apporteur) => {
    //             return !existingApporteurs.some((existingApporteur) => existingApporteur.id_apporteur === apporteur.id_apporteur);
    //           });

    //           // Insérer uniquement les nouvelles compagnies dans IndexedDB
    //           if (newApporteurs.length > 0) {
    //             AppStorage.storeDataInIndexedDB('apporteurs', newApporteurs);
    //           }
    //         }
    //       });

    //       // Mettre à jour IndexedDB avec les taux compagnies récupérés 

    //       const newApporteurId = response.data.id_apporteur;

    //       const ratesEndpoint = `/api/auth/getTauxApporteur/${newApporteurId}`;

    //       const ratesResponse = await axios.get(ratesEndpoint);

    //       const rates = ratesResponse.data;

    //       AppStorage.storeDataInIndexedDB('tauxapporteurs', rates);

    //       this.$router.push("/listapporteur");

    //     } catch (error) {
    //       console.error("Erreur lors de l'ajout de la compagnie sur le serveur", error);
    //     }

    //   } else {
    //     const { v4: uuidv4 } = require('uuid');
    //     const uuid = uuidv4();

    //     const userId = parseInt(AppStorage.getId(), 10);
    //     const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

    //     let test = JSON.parse(JSON.stringify(this.branches));
    //     let donnees = [];

    //     for (let i = 0; i < Object.keys(test).length; i++) {
    //       donnees.push(test[i]["value"]);
    //     }

    //     let testing = JSON.parse(JSON.stringify(this.branches));
    //     let datas = [];

    //     for (let i = 0; i < Object.keys(testing).length; i++) {
    //       datas.push(testing[i]["uuiBranche"]);
    //     }

    //     // Obtenir la date du jour au format YYYYMMDD
    //     let today = new Date();
    //     let year = today.getFullYear();
    //     let month = (today.getMonth() + 1).toString().padStart(2, '0');
    //     let day = today.getDate().toString().padStart(2, '0');

    //     let dateDuJour = year + month + day;

    //     // Supposons que $nom est votre variable contenant le nom du client
    //     let nom = this.nom_apporteur;

    //     // Prendre les deux premiers caractères du nom
    //     let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase(); // Mettre en majuscules

    //     // Générer le numéro de client en ajoutant "CL-" à la date du jour
    //     let codeApporteur = "AP-" + deuxPremiersCaracteres + dateDuJour;

    //     // Si hors ligne, ajoutez la nouvelle donnée directement dans IndexedDB
    //     const newApporteurData = [{
    //       nom_apporteur: this.nom_apporteur,
    //       contact_apporteur: this.contact_apporteur,
    //       email_apporteur: this.email_apporteur,
    //       adresse_apporteur: this.adresse_apporteur,
    //       code_postal: this.code_postal,
    //       accidents: donnees,
    //       ids: datas,
    //       sync: 0,
    //       id_entreprise: entrepriseId,
    //       id: userId,
    //       uuidApporteur: uuid,
    //       code_apporteur: codeApporteur,
    //     }];

    //     // Ajouter la nouvelle donnée dans IndexedDB
    //     await AppStorage.storeDataInIndexedDB("apporteurs", newApporteurData);

    //     const branchesMap = await AppStorage.getBranches();
    //     for (let i = 0; i < datas.length; i++) {

    //       const nom_branche = branchesMap[datas[i]];

    //       let newTauxApporteur = [{
    //         uuidApporteur: uuid,
    //         sync: 0,
    //         taux: donnees[i],
    //         nom_branche: nom_branche,
    //         uuidBranche: datas[i],
    //       }];

    //       await AppStorage.storeDataInIndexedDB("tauxapporteurs", newTauxApporteur);
    //     }

    //     toaster.info(`Apporteur ajouté localement (hors ligne)`, {
    //       position: "top-right",
    //     });

    //     this.$router.push("/listapporteur");
    //   }

    // },



    // fetchApporteurs

    async storeApporteur() {
      try {
        // const isConnected = await this.checkInternetConnection();

        // if (isConnected) {
        //   await this.storeApporteurOnline();
        // } else {
        await this.storeApporteurOffline();
        // }
      } catch (error) {
        console.error("Error storing apporteur:", error);
      }
    },

    // async checkInternetConnection() {
    //   const response = await fetch("/api/check-internet-connection");
    //   const data = await response.json();
    //   return data.connected;
    // },

    // async storeApporteurOnline() {




    //   const uuid = uuidv4();
    //   const userId = AppStorage.getId();
    //   const entrepriseId = AppStorage.getEntreprise();

    //   let codeApporteur = this.generateCodeApporteur();

    //   const postData = {
    //     code_apporteur: codeApporteur,
    //     nom_apporteur: this.nom_apporteur,
    //     contact_apporteur: this.contact_apporteur,
    //     email_apporteur: this.email_apporteur,
    //     adresse_apporteur: this.adresse_apporteur,
    //     code_postal: this.code_postal,
    //     accidents: this.extractValues(this.branches),
    //     ids: this.extractUuidBranches(this.branches),
    //     id_entreprise: entrepriseId,
    //     id: userId,
    //     uuidApporteur: uuid,
    //   };

    //   const response = await AxiosService.post(apiUrl.postapporteur, postData);

    //   const updatedApporteurs = await this.fetchApporteurs();

    //   if (response.status === 200) {
    //     toaster.success(`Compagnie ajouté avec succès`, {
    //       position: "top-right",
    //     });
    //   }

    //   this.updateIndexedDB(updatedApporteurs);

    //   const newApporteurId = response.data.id_apporteur;
    //   const rates = await this.getTauxApporteur(newApporteurId);

    //   AppStorage.storeDataInIndexedDB('tauxapporteurs', rates);

    //   this.$router.push("/listapporteur");
    // },

    async storeApporteurOffline() {
      this.errors = validateApporteurForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        // Afficher un message d'erreur
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
      }

      if (Object.keys(this.errors).length === 0) {
        const uuid = uuidv4();
        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

        let codeApporteur = this.generateCodeApporteur();
        let donnees = this.extractValues(this.branches);
        let datas = this.extractUuidBranches(this.branches);

        const newApporteurData = [{
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
        }];


        await AppStorage.storeDataInIndexedDB("apporteurs", newApporteurData);

        const branchesMap = await AppStorage.getBranches();
        for (let i = 0; i < datas.length; i++) {
          // const nom_branche = branchesMap[datas[i]];
          const dataItem = datas[i];

          const branch = branchesMap.find(branch => branch.uuidBranche === dataItem);
          const nom_branche = branch.nom_branche;
          // Générer un UUID unique pour uuidTauxcompagnie
          const uuidTauxcompagnie = uuidv4();

          let newTauxApporteur = [{
            uuidTauxApporteur: uuidTauxcompagnie,
            uuidApporteur: uuid,
            sync: 0,
            taux: donnees[i],
            nom_branche: nom_branche,
            uuidBranche: datas[i],
          }];

          await AppStorage.storeDataInIndexedDB("tauxapporteurs", newTauxApporteur);
        }

        toaster.success(`Apporteur ajouté `, {
          position: "top-right",
        });

        this.$router.push("/listapporteur");
      }
    },

    getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return year + month + day;
    },
    
    generateCodeApporteur() {
      let dateDuJour = this.getFormattedDate();
      let deuxPremiersCaracteres = this.form.nom_apporteur.substring(0, 2).toUpperCase();
      return "AP-" + deuxPremiersCaracteres + dateDuJour;
    },

    extractValues(branches) {
      return branches.map(branch => branch["value"]);
    },

    extractUuidBranches(branches) {
      return branches.map(branch => branch["uuidBranche"]);
    },

    // updateIndexedDB(updatedApporteurs) {
    //   AppStorage.getApporteurs().then((existingApporteurs) => {
    //     if (existingApporteurs && updatedApporteurs) {
    //       const newApporteurs = updatedApporteurs.filter((apporteur) => {
    //         return !existingApporteurs.some((existingApporteur) => existingApporteur.id_apporteur === apporteur.id_apporteur);
    //       });

    //       if (newApporteurs.length > 0) {
    //         AppStorage.storeDataInIndexedDB('apporteurs', newApporteurs);
    //       }
    //     }
    //   });
    // },

    // async getTauxApporteur(newApporteurId) {
    //   const ratesEndpoint = `/api/auth/getTauxApporteur/${newApporteurId}`;
    //   const ratesResponse = await axios.get(ratesEndpoint);
    //   return ratesResponse.data;
    // },

    getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return year + month + day;
    },


    // async fetchApporteurs() {

    //   try {
    //     const response = await AxiosService.get(apiUrl.getapporteur);

    //     // Vous pouvez traiter les données comme vous le souhaitez
    //     const apporteurs = response.data;

    //     // Retourner les apporteurs pour une utilisation éventuelle
    //     return apporteurs;
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des clients sur le serveur", error);
    //   }
    // },

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
  