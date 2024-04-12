<template>
  <div class="modal custom-modal fade" id="delete_contrat" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer contrat</h3>
            <p>Voulez vous supprimer le contrat?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  class="btn btn-primary continue-btn"
                  data-bs-dismiss="modal"
                  @click="deleteContrat"
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
import AppStorage from "../../db/AppStorage.js";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["contrattoedit"],
  methods: {
    async deleteContrat() {
      const uuidContrat = this.contrattoedit.uuidContrat;

      // Nouvel état du contrat
      const newSupprime = 1;

      const newSyncState = 0;

      const newDelete = 1;

      const contratMisAJour = await AppStorage.deleteContrats(
        uuidContrat,
        newSupprime,
        newSyncState
      );

      const AvenantMisAJour = await AppStorage.deleteAvenants(
        uuidContrat,
        newDelete,
        newSyncState
      );

      // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des contrats
      const updatedContrats = await AppStorage.getContrats();

      // Émettre un événement avec les contrats mis à jour
      this.$emit("delete-contrat", updatedContrats);

      toaster.success(`Contrat supprimé`, {
        position: "top-right",
      });
    
    },
  },
};
</script>

