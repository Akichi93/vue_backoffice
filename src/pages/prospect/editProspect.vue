<template>
  <div id="edit_department" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier prospect</h5>
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
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Civilite</label>
                  <civilitecomponent
                    :placeholder="'selectionnez une civilité'"
                    v-model="prospectoedit.civilite"
                  >
                  </civilitecomponent>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom complet du prospect</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="prospectoedit.nom_prospect"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Boîte postal</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="prospectoedit.postal_prospect"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Telephone</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="prospectoedit.tel_prospect"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-8 adresse">
                <div class="form-group">
                  <label>Adresse</label>
                  <adressecomponent
                    :placeholder="'selectionnez l\'adresse'"
                    v-model="prospectoedit.adresse_prospect"
                  >
                  </adressecomponent>
                </div>
              </div>
              <div class="col-md-4 ajout">
                <button
                  type="button"
                  style="margin-top: 25px"
                  class="btn btn-primary"
                >
                  Ajouter
                </button>
              </div>
              <div class="col-md-8 form1" style="display: none">
                <div>
                  <label>Adresse</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Entrez une nouvelle adresse"
                    v-model="ajout_adresse"
                  />
                </div>
              </div>
              <div class="col-md-2 form2" style="display: none">
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style="margin-top: 25px"
                    @click="storeAdresse"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              <div class="col-sm-8 profession">
                <div class="form-group">
                  <label>Profession</label>
                  <professioncomponent
                    :placeholder="'selectionnez une profession'"
                    v-model="prospectoedit.profession_prospect"
                  ></professioncomponent>
                </div>
              </div>
              <div class="col-md-4 ajouter">
                <button
                  type="button"
                  style="margin-top: 25px"
                  class="btn btn-primary"
                >
                  Ajouter
                </button>
              </div>
              <div class="col-md-8 form3" style="display: none">
                <label>Profession</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrez une nouvelle profession"
                  v-model="ajout_profession"
                />
              </div>
              <div class="col-md-2 form4" style="display: none">
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style="margin-top: 25px"
                    @click="storeProfession"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button
                class="btn btn-primary cancel-btn"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Annuler
              </button>
              <button
                class="btn btn-primary submit-btn"
                type="button"
                data-bs-dismiss="modal"
                @click="editProspect"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import civilitecomponent from "../../components/select/civilitecomponent.vue";
import adressecomponent from "../../components/select/adressecomponent.vue";
import professioncomponent from "../../components/select/professioncomponent.vue";
import { createToaster } from "@meforma/vue-toaster";
import switchService from '../../services/switchService';
const toaster = createToaster({
  /* options */
});
export default {
  props: ["prospectoedit"],
  components: {
    Multiselect,
    civilitecomponent,
    adressecomponent,
    professioncomponent,
  },
  methods: {
    async editProspect() {
      try {
        const uuidProspectToUpdate = this.prospectoedit.uuidProspect;
        const response = await switchService.updateProspect(
          this.prospectoedit,
          uuidProspectToUpdate
        );

        // Émettre un événement avec les prospects mis à jour
        this.$emit("prospect-updated", response);

        toaster.success(response.message, {
          position: "top-right",
        });
      } catch (error) {
        // Gérer les erreurs, par exemple :
        console.error("Erreur lors de la modification du prospect:", error);
        toaster.error("Erreur lors de la modification du prospect", {
          position: "top-right",
        });
      }
    },
  },
};
</script>
