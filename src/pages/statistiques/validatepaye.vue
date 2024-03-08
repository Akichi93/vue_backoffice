<template>
  <div class="modal custom-modal fade" id="payer_apporteur" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Valider le payement</h3>
            <p>L'apporteur a t'il été payé?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-primary continue-btn" data-bs-dismiss="modal"
                  @click="payeAvenant">Payer</a>
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
const toaster = createToaster({
  /* options */
});
export default {
  props: ["avenantoedit"],
  methods: {
    payeAvenant() {
      axios
        .post("/api/auth/payeAvenant", {
          id: this.avenantoedit.id_avenant,
          id_apporteur: this.$route.params.id_apporteur,
        })
        .then((response) => {
          this.$emit('type-update', response.data)
          toaster.success(`Payer avec succès`, {
            position: "top-right",
          });

        })
        .catch(() => {
          toaster.error(
            "Veuillez renseigner tous les champs",
            {
              // override the global option
              position: "top-right",
            }
          );
        });
    }
  }

}
</script>