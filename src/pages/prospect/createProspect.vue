<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Prospects</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Prospects
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
                <h4 class="card-title mb-0">Création de prospect</h4>
              </div>
              <div class="card-body">
                <form action="#">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Civilité:</label>
                        <civilitecomponent
                          :placeholder="'selectionnez une civilité'"
                          v-model="form.civilite"
                        ></civilitecomponent>

                        <p
                          style="color: red"
                          class="text-red"
                          v-if="errors.civilite"
                          v-text="errors.civilite"
                        ></p>
                      </div>
                      <div class="form-group">
                        <label>Boite postale:</label>
                        <inputText
                          :placeholder="'Entrez la boîte postal du prospect'"
                          v-model="form.postal_prospect"
                        ></inputText>
                      </div>
                      <div class="form-group">
                        <label>Téléphone:</label>
                        <inputText
                          :placeholder="'Entrez le numéro de téléphone du prospect'"
                          v-model="form.tel_prospect"
                        ></inputText>
                        <p
                          style="color: red"
                          class="text-red"
                          v-if="errors.tel_prospect"
                          v-text="errors.tel_prospect"
                        ></p>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Etat:</label>
                            <etatcomponent
                              :placeholder="'selectionnez un état'"
                              v-model="form.etat"
                            >
                            </etatcomponent>
                            <p
                              style="color: red"
                              class="text-red"
                              v-if="errors.etat"
                              v-text="errors.etat"
                            ></p>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-9 adresse">
                          <div class="form-group">
                            <label>Adresse</label>
                            <Multiselect
                              v-model="form.adresse_prospect"
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
                              v-if="errors.adresse_prospect"
                              v-text="errors.adresse_prospect"
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
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Nom complet du prospect:</label>
                            <inputText
                              :placeholder="'Entrez le nom complet'"
                              v-model="form.nom_prospect"
                            ></inputText>
                            <p
                              style="color: red"
                              class="text-red"
                              v-if="errors.nom_prospect"
                              v-text="errors.nom_prospect"
                            ></p>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Fax:</label>
                            <inputText
                              :placeholder="'Entrez le fax du prospect'"
                              v-model="fax_prospect"
                            ></inputText>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Email:</label>
                            <inputText
                              :placeholder="'Entrez l\'email du prospect'"
                              v-model="form.email_prospect"
                            ></inputText>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-9 profession">
                          <div class="form-group">
                            <label>Profession:</label>
                            <Multiselect
                              v-model="form.profession_prospect"
                              :options="professions"
                              :custom-label="
                                ({ uuidProfession, profession }) =>
                                  `${uuidProfession} - [${profession}]`
                              "
                              valueProp="profession"
                              placeholder="Choisir une profession"
                              label="profession"
                              track-by="profession"
                              :searchable="true"
                            >
                            </Multiselect>
                            <p
                              style="color: red"
                              class="text-red"
                              v-if="errors.profession_prospect"
                              v-text="errors.profession_prospect"
                            ></p>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <button
                              type="button"
                              style="margin-top: 25px"
                              class="btn btn-primary"
                            >
                              Ajouter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-end">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="storeProspect"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>

              <addadresse @adresse-add="handleClientsChange"></addadresse>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../../db/AppStorage.js";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import professioncomponent from "../../components/select/professioncomponent.vue";
import civilitecomponent from "../../components/select/civilitecomponent.vue";
import etatcomponent from "../../components/select/etatcomponent.vue";
import inputText from "../../components/input/inputText.vue";
import addadresse from "../../pages/form/addadresse.vue";
import Multiselect from "@vueform/multiselect";
import { validateProspectForm } from "../../utils/helpers/formValidation";
import { createToaster } from "@meforma/vue-toaster";
import { apiUrl } from "../../utils/constants/apiUrl";
import { v4 as uuidv4 } from "uuid";
import offlineService from "../../services/offlineService.js";
const toaster = createToaster({
  /* options */
});

export default {
  name: "createProspect",
  components: {
    Header,
    Sidebar,
    Multiselect,
    professioncomponent,
    civilitecomponent,
    etatcomponent,
    inputText,
    addadresse,
  },
  data() {
    return {
      value: null,
      form: {
        civilite: "",
        postal_prospect: "",
        etat: "",
        nom_prospect: "",
        tel_prospect: "",
        email_prospect: "",
        adresse_prospect: "",
        fax_prospect: "",
        ajout_adresse: "",
        ajout_profession: "",
        profession_prospect: "",
      },

      prospectoedit: "",
      errors: {},
      localisations: [],
      professions: [],
    };
  },
  created() {
    this.getAdresse();
    this.getProfession();
  },

  methods: {
    async getAdresse() {
      AppStorage.getLocalisations().then((result) => {
        this.localisations = result;
      });
    },

    async getProfession() {
      AppStorage.getProfessions().then((result) => {
        this.professions = result;
      });
    },
    async storeProspect() {
      this.errors = validateProspectForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }

      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
      const userId = parseInt(AppStorage.getId(), 10);

      const { success, uuid, existingProspect } =
        await offlineService.storeProspect(this.form, userId, entrepriseId);

      if (success) {
        this.$router.push("/listprospect");
        toaster.success(`Prospect ajouté`, {
          position: "top-right",
        });
      } else {
        if (existingProspect) {
          toaster.error(
            `Le prospect ${existingProspect.nom_prospect} existe déjà`,
            {
              position: "top-right",
            }
          );
        } else {
          toaster.error(`Erreur lors de l'ajout du prospect`, {
            position: "top-right",
          });
        }
        console.error(error);
      }
    },

    handleClientsChange(localisations) {
      this.localisations = localisations;
    },
  },
};
</script>
  
<style src="@vueform/multiselect/themes/default.css"></style>