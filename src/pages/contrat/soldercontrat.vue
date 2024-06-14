<template>
  <div class="modal custom-modal fade" id="solder_contrat" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Solder contrat</h3>
            <p>Le contrat est il solde ?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  class="btn btn-primary continue-btn"
                  @click="ChangeSolde"
                  >Solder</a
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
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["avenantoedit"],
  methods: {
    async ChangeSolde() {
      const uuidContrat = this.$route.params.uuidContrat;
      const uuidAvenantToUpdate = this.avenantoedit.uuidAvenant;

      // Nouvel état du prospect
      const newSolde = 1;

      const newSyncState = 0;

      const updatedAvenants = await switchService.updateAvenantSolde(
        uuidContrat,
        uuidAvenantToUpdate,
        newSolde,
        newSyncState
      );

      // Émettre un événement avec les prospects mis à jour
      this.$emit("avenant-solder", updatedAvenants);

      toaster.success(`Avenant soldé`, {
        position: "top-right",
      });
    },
  },
};
</script>