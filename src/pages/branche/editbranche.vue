<template>
  <div id="edit_branche" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier branche</h5>
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
            <div class="form-group">
              <label
                >Nom de la branche <span class="text-danger">*</span></label
              >
              <input
                class="form-control"
                v-model="branchetoedit.nom_branche"
                type="text"
              />
            </div>
            <div class="submit-section">
              <button
                class="btn btn-primary cancel-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Annuler
              </button>
              <button
                type="button"
                class="btn btn-primary submit-btn"
                data-bs-dismiss="modal"
                @click.prevent="brancheUpdate"
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
import AppStorage from "../../db/AppStorage.js";
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService.js";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["branchetoedit"],

  name: "editbranche",
  methods: {
    async brancheUpdate() {
      const uuidBrancheToUpdate = this.branchetoedit.uuidBranche;

      const updatedBranches = await switchService.updateBranche(
        this.branchetoedit,
        uuidBrancheToUpdate
      );

      //Émettre un événement avec les compagnues mis à jour
      this.$emit("branche-updated", updatedBranches);

      toaster.success(`Branche modifié avec succès`, {
        position: "top-right",
      });
    },
  },
};
</script>