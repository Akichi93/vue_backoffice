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
                  <router-link to="/sinistre"></router-link>
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

        <!-- <div class="container mt-5"> -->
        <div class="row" id="sinistre" v-show="showForm">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="type_contrat" class="form-label"
                      >Type de contrat:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.type_contrat"
                      id="type_contrat"
                      placeholder="Type de contrat"
                      required
                      readonly
                    />

                    <input
                      type="hidden"
                      class="form-control"
                      v-model="form.uuidPolice"
                      required
                      readonly
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="reference_compagnie" class="form-label"
                      >Reference compagnie:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.reference_compagnie"
                      id="reference_compagnie"
                      placeholder="Reference compagnie"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="gestion_compagnie" class="form-label"
                      >Gestion compagnie:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.gestion_compagnie"
                      id="gestion_compagnie"
                      placeholder="Gestion compagnie"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="numero_sinistre_agence" class="form-label"
                      >Numéro sinistre agence:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.numero_sinistre_agence"
                      id="numero_sinistre_agence"
                      placeholder="Numéro sinistre agence"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="garantie_applique" class="form-label"
                      >Garantie appliquée:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.garantie_applique"
                      id="garantie_applique"
                      placeholder="Garantie appliquée"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="lieu" class="form-label">Lieu:</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.lieu"
                      id="lieu"
                      placeholder="Lieu"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-3">
                    <label for="materiel_corporel" class="form-label"
                      >Materiel / corporel:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.materiel_corporel"
                      id="materiel_corporel"
                      placeholder="Materiel / corporel"
                    />
                  </div>
                  <div class="col-md-3">
                    <label for="ipp" class="form-label">IPP:</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.ipp"
                      id="ipp"
                      placeholder="IPP"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="materiel_sinistre" class="form-label"
                      >Materiel sinistre:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.materiel_sinistre"
                      id="materiel_sinistre"
                      placeholder="Materiel sinistre"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="date_survenance" class="form-label"
                      >Date de survenance:</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="date_survenance"
                      v-model="form.date_survenance"
                      placeholder="Date de survenance"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="heure" class="form-label">Heure:</label>
                    <input
                      type="time"
                      class="form-control"
                      v-model="form.heure"
                      id="heure"
                      placeholder="Heure"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="date_ouverture" class="form-label"
                      >Date de ouverture:</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="date_ouverture"
                      v-model="form.date_ouverture"
                      placeholder="Date de ouverture"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="date_declaration" class="form-label"
                      >Date declaration:</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="date_declaration"
                      v-model="form.date_declaration"
                      placeholder="Date declaration"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="date_declaration_compagnie" class="form-label"
                      >Date declaration compagnie:</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="date_declaration_compagnie"
                      v-model="form.date_declaration_compagnie"
                      placeholder="Date declaration compagnie"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="date_mission" class="form-label"
                      >Date de mission:</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date_mission"
                      id="date_mission"
                      placeholder="Date de mission"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-3">
                    <label for="recours" class="form-label">Recours:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="recours"
                      v-model="form.recours"
                      placeholder="Recours"
                    />
                  </div>
                  <div class="col-md-3">
                    <label for="expert" class="form-label">Expert:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="expert"
                      v-model="form.expert"
                      placeholder="Expert"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="accident_adversaire" class="form-label"
                      >Accident/Adversaire:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="accident_adversaire"
                      v-model="form.accident_adversaire"
                      placeholder="Accident/Adversaire"
                    />
                  </div>
                </div>

                <textarea
                  class="form-control mb-3"
                  id="textarea"
                  v-model="form.commentaire"
                  rows="3"
                  placeholder="Commentaire... au moins 10 caractères"
                ></textarea>
                <button
                  type="button"
                  @click="storeSinistre"
                  class="btn btn-primary"
                >
                  Ajouter
                </button>
                <button type="reset" class="btn btn-danger">Annuler</button>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { validateSinistreForm } from "../../utils/helpers/formValidation";
import AppStorage from "../../db/AppStorage";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Multiselect from "@vueform/multiselect";
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
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
      uuidPolice: "",
      police: "",
      polices: {},
      form: {
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
      },
      value: null,
      errors: {},
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
      this.form.uuidPolice = contrat.uuidContrat;
    },

    async storeSinistre() {
      this.errors = validateSinistreForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }

      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      await switchService.storeSinistre(
        this.form,
        userId,
        entrepriseId,
        this.police
      );

      this.$router.push("/listsinistre");
    },
  },
  async created() {
    this.polices = await switchService.getContrats();
  },
};
</script>