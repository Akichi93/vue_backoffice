<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <h3 class="page-title">Ajouter du sinistre</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/home">Tableau de bord</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/sinistre">Sinistre</router-link>
                </li>
                <li class="breadcrumb-item active">Ajouter un sinistre</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Rechercher client</h5>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="form-group">
                        <Multiselect
                          v-model="police"
                          :options="polices"
                          :searchable="true"
                          name="police"
                          :custom-label="
                            ({ uuidContrat, numero_police }) =>
                              `${uuidContrat} - [${numero_police}]`
                          "
                          valueProp="uuidContrat"
                          placeholder="Choisir un numero de police"
                          label="numero_police"
                          track-by="numero_police"
                        ></Multiselect>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <div>
                          <button
                            type="button"
                            class="btn btn-primary w-100"
                            @click="addSinistre(police)"
                          >
                            <i class="ri-equalizer-fill me-1 align-bottom"></i>
                            Chercher
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="row" id="sinistre" v-show="showForm">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Type de contrat</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.type_contrat"
                    :modelValue="form.type_contrat"
                    placeholder="Entrez le numéro de police"
                    readonly
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Reference de la compagnie</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.reference_compagnie"
                    placeholder="Entrez la référence de la compagnie"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Gestion de la compagnie</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.gestion_compagnie"
                      placeholder="Entrez la garantie compagnie"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Numéro de sinistre de l'agence</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.numero_sinistre_agence"
                      placeholder="Entrez le numéro sinistre agence"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Garantie appliqué</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.garantie_applique"
                      placeholder="Garantie appliqué"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Lieu</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.lieu"
                      placeholder="Entrez le lieu"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Materiel corporel</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.materiel_corporel"
                    placeholder="Materiel / corporel"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>IPP</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.ipp"
                    placeholder="ipp"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Materiel sinistre</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.materiel_sinistre"
                      placeholder="Materiel sinistre"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date de survenance</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date_survenance"
                      placeholder="Date de suurvenance"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Heure</label>
                    <input
                      type="time"
                      class="form-control"
                      v-model="form.heure"
                      placeholder="Heure"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date d'ouverture</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date_ouverture"
                      placeholder="Date d'ouverture"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date de déclaration</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date_declaration"
                      placeholder="Date de declaration"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label>Date de déclaration de la compagnie</label>
                  <div class="form-group">
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date_declaration_compagnie"
                      placeholder="Date de declaration de lacompagnie"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date de mission</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date_mission"
                      placeholder="Date de mission"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Recours</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.recours"
                      placeholder="Recours"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Expert</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.expert"
                      placeholder="Expert"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Accident</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.accident_adversaire"
                      placeholder="Accident/Adversaire"
                    />
                  </div>
                </div>
              </div>

              <!-- <b-form-group class="mt-3">
                  <b-button type="submit" variant="primary" class="m-3"
                    >Ajouter</b-button
                  >
                  <b-button type="reset" variant="danger" class="ml-3"
                    >Annuler</b-button
                  > -->
            </div>
          </div>

          <div class="submit-section">
            <button class="btn btn-primary submit-btn" @click="storeContrat">
              Enregistrer
            </button>
          </div>
          <!--end col-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AppStorage from "../../db/AppStorage";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Form from "vform";
// import Multiselect from "@vueform/multiselect";
import Multiselect from "@vueform/multiselect";

import { ref, computed, reactive, nextTick } from "vue";

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
  },
  data() {
    return {
      show: false,
      showForm: false,
      type_contrat: "",
      id_contrat: "",
      police: "",
      polices: {},
      form: new Form({
        type_contrat: "",
        id_contrat: "",
        reference_compagnie: "",
        gestion_compagnie: "",
        numero_sinistre_agence: "",
        garantie_applique: "",
        lieu: "",
        materiel_corporel: "",
        ipp: "",
        date_survenance: "",
        heure: "",
        date_ouverture: "",
        date_declaration: "",
        date_declaration_compagnie: "",
        date_mission: "",
        recours: "",
        expert: "",
        accident_adversaire: "",
        materiel_sinistre: "",
        commentaire: "",
      }),
      // lifeNameState: computed(() =>
      //   this.form.reference_compagnie.value?.length > 2 ? true : false
      // ),
      localisations: [
        "Abidjan",
        "Bouaké",
        "Yamoussoukro",
        "Korhogo",
        "Daloa",
        "San-Pédro",
        "Man",
        "Soubré",
        "Gagnoa",
        "Abengourou",
        "Agboville",
        "Grand-Bassam",
        "Dabou",
        "Bouaflé",
      ],
      value: null,
    };
  },

  methods: {
    getPolice(id) {
      axios
        .get("/api/auth/get/police/" + id)
        .then((response) => (this.police = response.data))
        .catch((error) => console.log(error));
    },
    async addSinistre(police) {
      this.showForm = true;
      const uuidContrat = police;

      const contrat = await AppStorage.getContratByUuid(uuidContrat);

      this.form.type_contrat = contrat.nom_branche;
      this.form.uuidContrat = uuidContrat;

      // this.form.type_contrat = response.data.branche.nom_branche;
      //     this.form.id_contrat = response.data.contrat.id_contrat;
    },

    createSinistre() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      this.form
        .post("/api/auth/add/sinistre", { headers })
        .then((response) => {
          toaster.success(response.data.success, {
            // override the global option
            position: "top-right",
          });
          this.$router.push("/listsinistre");
        })
        .catch(() => {
          toaster.error(
            "Creation Impossible, Veuillez renseigner tous les champs",
            {
              // override the global option
              position: "top-right",
            }
          );
        });
    },
  },
  created() {
    AppStorage.getContrats().then((result) => {
      this.polices = result;
    });
    // const token = localStorage.getItem("token");

    // // Configurez les en-têtes de la requête
    // const headers = {
    //   Authorization: "Bearer " + token,
    //   "x-access-token": token,
    // };
    // axios
    //   .get("/api/auth/get-polices", { headers })
    //   .then((response) => {
    //     this.polices = response.data;
    //     console.log(response.data);
    //   })
    //   .catch((error) => console.log(error));
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>