<template>
  <div id="add_prospect" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter prospect</h5>
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
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
              </div>
            </div>
          </div>
          <div class="submit-section">
            <button
              type="button"
              class="btn btn-primary cancel-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-primary submit-btn"
              @click="storeProspect"
              data-bs-dismiss="modal"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import adressecomponent from "../../components/select/adressecomponent.vue";
import professioncomponent from "../../components/select/professioncomponent.vue";
import civilitecomponent from "../../components/select/civilitecomponent.vue";
import inputText from "../../components/input/inputText.vue";
import AppStorage from "../../db/AppStorage.js";
import etatcomponent from "../../components/select/etatcomponent.vue";
import { createToaster } from "@meforma/vue-toaster";
import { v4 as uuidv4 } from "uuid";
import Multiselect from "@vueform/multiselect";
import switchService from "../../services/switchService";

const toaster = createToaster({
  /* options */
});

export default {
  components: {
    Multiselect,
    adressecomponent,
    professioncomponent,
    civilitecomponent,
    etatcomponent,
    inputText,
  },
  data() {
    return {
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
      localisations: [],
      professions: [],
      errors: {},
    };
  },
  created() {
    this.getAdresse();
    this.getProfession();
  },
  methods: {
    async getAdresse() {
      this.localisations = await switchService.getAdresse();
    },

    async getProfession() {
      this.professions = await switchService.getProfession();
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
        await switchService.storeProspect(this.form, userId, entrepriseId);

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
  },
};
</script>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->