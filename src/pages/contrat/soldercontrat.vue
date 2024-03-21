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
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary continue-btn"
                  @click="ChangeSolde">Solder</a>
              </div>
              <div class="col-6">
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Annuler</a>
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
// import $ from "jquery";
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

      const avenantMisAJour = await AppStorage.updateAvenantSolde(uuidAvenantToUpdate, newSolde, newSyncState);

      // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
      const updatedAvenants = await AppStorage.getAvenantsByUuidContrat(uuidContrat);

      // Émettre un événement avec les prospects mis à jour
      this.$emit("avenant-solder", updatedAvenants);

      toaster.success(`Avenant soldé`, {
        position: "top-right",
      });

      // axios
      //   .post("/api/auth/soldeAvenant", {
      //     id_avenant: this.avenantoedit.id_avenant,
      //   })
      //   .then((response) => {
      //     this.$emit('avenant-solder', response)
      //     if (response.status === 200) {
      //       toaster.success(`Avenant solde`, {
      //         position: "top-right",
      //       });
      //     }
      //   });
    },

  }
}
</script>