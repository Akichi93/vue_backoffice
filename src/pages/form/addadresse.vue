<template>
  <div id="addProspect" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter adresse</h5>
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
                  <label>Nom de la zone</label>
                  <input
                    type="text"
                    id="client_nameName-field"
                    class="form-control"
                    placeholder="Entrez une nouvelle adresse"
                    v-model="ajout_adresse"
                  />
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
                @click="storeAdresse"
                data-bs-dismiss="modal"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  methods: {
    data() {
      return {
          ajout_adresse: "",
      };
    },

    async storeAdresse() {
      const adresse = this.ajout_adresse;
      const updatedLocalisations = await switchService.storeAdresse(adresse);

      // Émettre un événement avec les prospects mis à jour
      this.$emit("adresse-add", updatedLocalisations);

      toaster.success(`Adresse ajouté avec succès`, {
        position: "top-right",
      });

      this.ajout_adresse = "";
    },
  },
};
</script>