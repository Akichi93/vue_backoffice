<template>
  <div class="modal custom-modal fade" id="delete_prospect" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer prospect</h3>
            <p>Voulez vous supprimer le prospect ?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  class="btn btn-primary continue-btn"
                  data-bs-dismiss="modal"
                  @click="deleteProspect"
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
import switchService from '../../services/switchService';
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["prospectoedit"],
  methods: {
    async deleteProspect() {
      const uuidProspectToUpdate = this.prospectoedit.uuidProspect;

      // Nouvel état du prospect
      const newDelete = 1;

      const newSyncState = 0;

      const { success } = await switchService.deleteProspect(uuidProspectToUpdate, newDelete, newSyncState);

      if (success) {
        toaster.success(`Prospect supprimé`, {
          position: "top-right",
        });
      } else {
        toaster.error(`Erreur lors de la suppression du prospect`, {
          position: "top-right",
        });
      }

      // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
      const updatedProspects = await AppStorage.getProspects();

      // Émettre un événement avec les prospects mis à jour
      this.$emit("prospect-deleted", updatedProspects);

      toaster.success(`Prospect supprimé`, {
        position: "top-right",
      });
    },
  },
};
</script>

