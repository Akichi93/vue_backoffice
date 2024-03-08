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
                <a href="javascript:void(0);" class="btn btn-primary continue-btn" data-bs-dismiss="modal"
                  @click.prevent="compagnieDelete">supprimer</a>
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
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["compagnietoedit"],
  name: "deleteCompagnie",
  methods: {
    compagnieDelete() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      axios
        .patch("/api/auth/deleteCompagnie/" + this.compagnietoedit.id_compagnie, { headers })
        .then((response) => {
          this.$emit("compagnie-delete", response);
          toaster.success(`Compagnie supprimé avec succès`, {
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>