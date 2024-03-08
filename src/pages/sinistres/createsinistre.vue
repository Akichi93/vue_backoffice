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
                <li class="breadcrumb-item"><router-link to="/sinistre">Sinistre</router-link></li>
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
                        <Multiselect v-model="police" :options="polices" :searchable="true" name="police" :custom-label="({ id_contrat, numero_police }) =>
                          `${id_contrat} - [${numero_police}]`
                          " valueProp="id_contrat" placeholder="Choisir un numero de police" label="numero_police"
                          track-by="numero_police"></Multiselect>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <div>
                          <button type="button" class="btn btn-primary w-100" @click="addSinistre(police)">
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
          <b-card>
            <div>
              <b-form @submit="createSinistre" v-if="showForm">
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group id="type_contrat" label="Type de contrat:" label-for="type_contrat" description="">
                      <b-form-input id="type_contrat" v-model="form.type_contrat" type="text"
                        placeholder="Type de contrat" required readonly="" :modelValue="form.type_contrat">
                      </b-form-input>
                      <b-form-input id="id_contrat" v-model="form.id_contrat" type="hidden" placeholder="Type de contrat"
                        required :modelValue="form.id_contrat" style="display: none">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group id="reference_compagnie" label="Reference compagnie:" label-for="reference_compagnie"
                      description="">
                      <b-form-input id="reference_compagnie" v-model="form.reference_compagnie" type="text"
                        placeholder="Reference compagnie" :state="form.reference_compagnie.length >= 3">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group id="gestion_compagnie" label="Gestion compagnie:" label-for="gestion_compagnie"
                      description="">
                      <b-form-input id="gestion_compagnie" v-model="form.gestion_compagnie" type="text"
                        placeholder="Gestion compagnie">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group id="numero_sinistre_agence" label="Numéro sinistre agence:"
                      label-for="numero_sinistre_agence" description="">
                      <b-form-input id="numero_sinistre_agence" v-model="form.numero_sinistre_agence" type="text"
                        placeholder="Numéro sinistre agence">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="garantie_applique" label="Garantie appliquée:" label-for="garantie_applique"
                      description="">
                      <b-form-input id="garantie_applique" v-model="form.garantie_applique" type="text"
                        placeholder="Garantie appliquée">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="lieu" label="Lieu:" label-for="lieu" description="">
                      <b-form-input id="lieu" v-model="form.lieu" type="text" placeholder="Lieu">
                      </b-form-input>
                    </b-form-group>

                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group id="materiel_corporel" label="Materiel / corporel:" label-for="materiel_corporel"
                          description="">
                          <b-form-input id="materiel_corporel" v-model="form.materiel_corporel" type="text"
                            placeholder="Materiel / corporel">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group id="ipp" label="IPP:" label-for="ipp" description="">
                          <b-form-input id="ipp" v-model="form.ipp" type="text" placeholder="IPP">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <b-form-group id="materiel_sinistre" label="Materiel sinistre:" label-for="materiel_sinistre"
                      description="">
                      <b-form-input id="materiel_sinistre" v-model="form.materiel_sinistre" type="text"
                        placeholder="Materiel sinistre">
                      </b-form-input>
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <b-form-group id="date_survenance" label="Date de survenance:" label-for="date_survenance"
                      description="">
                      <b-form-input id="date_survenance" v-model="form.date_survenance" type="date"
                        placeholder="Date de survenance">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group id="heure" label="Heure:" label-for="heure" description="">
                      <b-form-input id="heure" v-model="form.heure" type="time" placeholder="Heure">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group id="date_ouverture" label="Date de ouverture:" label-for="date_ouverture"
                      description="">
                      <b-form-input id="date_ouverture" v-model="form.date_ouverture" type="date"
                        placeholder="Date de ouverture">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="date_declaration" label="Date declaration:" label-for="date_declaration"
                      description="">
                      <b-form-input id="date_declaration" v-model="form.date_declaration" type="date"
                        placeholder="Date declaration">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="date_declaration_compagnie" label="Date declaration compagnie:"
                      label-for="date_declaration_compagnie" description="">
                      <b-form-input id="date_declaration_compagnie" v-model="form.date_declaration_compagnie" type="date"
                        placeholder="Date declaration compagnie">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="date_mission" label="Date de mission:" label-for="date_mission" description="">
                      <b-form-input id="date_mission" v-model="form.date_mission" type="date"
                        placeholder="Date de mission">
                      </b-form-input>
                    </b-form-group>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group id="recours" label="Recours:" label-for="recours" description="">
                          <b-form-input id="recours" v-model="form.recours" type="text" placeholder="Recours">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group id="expert" label="Expert:" label-for="expert" description="">
                          <b-form-input id="expert" v-model="form.expert" type="text" placeholder="Expert">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <b-form-group id="accident_adversaire" label="Accident/Adversaire:" label-for="accident_adversaire"
                      description="">
                      <b-form-input id="accident_adversaire" v-model="form.accident_adversaire" type="text"
                        placeholder="Accident/Adversaire">
                      </b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <b-form-textarea id="textarea" v-model="form.commentaire"
                  placeholder="Commentaire... au moins 10 caractères" rows="3" max-rows="6"
                  :state="form.commentaire.length >= 10">
                </b-form-textarea>
                <b-form-group class="mt-3">
                  <b-button type="submit" variant="primary" class="m-3">Ajouter</b-button>
                  <b-button type="reset" variant="danger" class="ml-3">Annuler</b-button>
                </b-form-group>
              </b-form>
            </div>
          </b-card>
          <!--end col-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    Sidebar
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
      lifeNameState: computed(() =>
        this.form.reference_compagnie.value?.length > 2 ? true : false
      ),
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
    addSinistre(police) {
      this.showForm = true;
      axios
        .get("/api/auth/get/police/" + police)
        .then((response) => {
          this.form.type_contrat = response.data.branche.nom_branche;
          this.form.id_contrat = response.data.contrat.id_contrat;
        })
        .catch((error) => console.log(error));
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
    const token = localStorage.getItem("token");

    // Configurez les en-têtes de la requête
    const headers = {
      Authorization: "Bearer " + token,
      "x-access-token": token,
    };
    axios
      .get("/api/auth/get-polices", { headers })
      .then((response) => {
        this.polices = response.data;
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>