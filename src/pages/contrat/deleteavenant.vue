<template>
  <div class="modal custom-modal fade" id="delete_avenant" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer avenant</h3>
            <p>Voulez vous supprimer l'avenant?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-primary continue-btn" data-bs-dismiss="modal"
                  @click="deleteAvenant">supprimer</a>
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
  props: ["avenantoedit"],
  methods: {
    deleteAvenant() {
      axios
        .post("/api/auth/deleteAvenant", {
          id_avenant: this.avenantoedit.id_avenant,
        })
        .then((response) => {
          this.$emit('avenant-delete', response)
          if (response.status === 200) {
            toaster.success(`Avenant supprimé`, {
              position: "top-right",
            });
          }
        });
    },

  }
}
</script>