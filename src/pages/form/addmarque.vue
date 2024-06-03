<template>
  <div id="addMarque" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter marque</h5>
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
                  <label>Nom de la marque</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Entrez une nouvelle marque"
                    v-model="ajout_marque"
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
                @click="storeMarque"
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
import { v4 as uuidv4 } from "uuid";
import { createToaster } from "@meforma/vue-toaster";
import switchService from '../../services/switchService';
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  methods: {
    data() {
      return {
        ajout_marque: "",
      };
    },
    validateForm() {
      if (!this.ajout_marque) {
        toaster.error(`Veuillez entrer une marque`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },
    async storeMarque() {
      if (this.validateForm()) {
        const marque = this.ajout_marque;
        const updatedMarques = await switchService.storeMarque(marque);

        // Émettre un événement avec les prospects mis à jour
        this.$emit("marque-add", updatedMarques);

        // Réinitialiser le formulaire après l'affichage du toaster success
        this.ajout_marque = "";

        toaster.success(`Marque ajouté avec succès`, {
          position: "top-right",
        });
      }
    },
  },
};
</script>