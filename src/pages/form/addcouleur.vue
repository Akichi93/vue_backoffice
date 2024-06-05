<template>
  <div id="addCouleur" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter couleur</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom de la couleur</label>
                  <input type="text" id="client_nameName-field" class="form-control"
                    placeholder="Entrez une nouvelle couleur" v-model="ajout_couleur" />
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button type="button" class="btn btn-primary submit-btn" @click="storeCouleur" data-bs-dismiss="modal">
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
import switchService from '../../services/switchService';
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  methods: {
    data() {
      return {
        ajout_couleur: "",
      };
    },
    validateForm() {
      if (!this.ajout_couleur) {
        toaster.error(`Veuillez entrer une couleur`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },
    async storeCouleur() {
      if (this.validateForm()) {
        const couleur = this.ajout_couleur;
        const updatedCouleurs = await switchService.storeCouleur(couleur);
     
        // Émettre un événement avec les prospects mis à jour
        this.$emit("couleur-add", updatedCouleurs);

        this.ajout_couleur = '';

        toaster.success(`Couleur ajouté avec succès`, {
          position: "top-right",
        });
      }
    },
  },
};
</script>