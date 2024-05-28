<template>
  <div class="modal custom-modal fade" id="delete_branche" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer branche</h3>
            <p>
              Voulez vous supprimer la branche
              <b>{{ branchetoedit.nom_branche }}</b> ?
            </p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  class="btn btn-primary continue-btn"
                  data-bs-dismiss="modal"
                  @click.prevent="brancheDelete"
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
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["branchetoedit"],

  name: "deletebranche",
  data() {
    return {
      branches: {},
    };
  },
  methods: {
    async brancheDelete() {
      const uuidBrancheToUpdate = this.branchetoedit.uuidBranche;

      const updatedBranches = await switchService.deleteBranche(
        uuidBrancheToUpdate
      );

      // axios
        // .patch("/api/auth/deleteBranche/" + this.branchetoedit.id_branche, {
        //   nom_branche: this.branchetoedit.nom_branche,
        // })
        // .then((response) => {
        //   this.$emit("task-delete", response);
        //   toaster.success(`Branche supprimé avec succès`, {
        //     position: "top-right",
        //   });
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    },
  },
};
</script>