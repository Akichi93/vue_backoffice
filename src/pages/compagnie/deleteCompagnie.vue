<template>
  <div class="modal custom-modal fade" id="delete_compagnie" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer compagnie</h3>
            <p>Voulez vous supprimer la compagnie?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  class="btn btn-primary continue-btn"
                  data-bs-dismiss="modal"
                  @click.prevent="deleteCompagnie"
                  >supprimer</a
                >
              </div>
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  class="btn btn-primary cancel-btn"
                  >Annuler</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../../db/AppStorage";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["compagnietoedit"],
  name: "deleteCompagnie",
  methods: {
    async deleteCompagnie() {
      const uuidCompagnie = this.compagnietoedit.uuidCompagnie;

      // Nouvel état du contrat
      const newSupprime = 1;

      const newSyncState = 0;

      const contratMisAJour = await AppStorage.deleteCompagnies(
        uuidCompagnie,
        newSupprime,
        newSyncState
      );

      // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des contrats
      const updatedCompagnies = await AppStorage.getCompagnies();

      // Émettre un événement avec les contrats mis à jour
      this.$emit("compagnie-delete", updatedCompagnies);

      toaster.success(`Compagnie supprimé`, {
        position: "top-right",
      });
    
    },
  },
};
</script>