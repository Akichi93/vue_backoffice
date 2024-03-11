<template>
    <div class="modal custom-modal fade" id="payer_apporteur" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Validation de paiement</h3>
              <p>Cet avenant est il payé ?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary continue-btn"
                    @click="ChangePaye">Payer</a>
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
      async ChangePaye() {
  
        const uuidAvenantToUpdate = this.avenantoedit.uuidAvenant;
  
        // Nouvel état du prospect
        const newPayer = 1;
  
        const newSyncState = 0;
  
        const avenantMisAJour = await AppStorage.updateAvenantPayerCompagnie(uuidAvenantToUpdate, newPayer, newSyncState);
  
        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedAvenants = await AppStorage.getAvenants();
  
        // Émettre un événement avec les prospects mis à jour
        this.$emit("type-update", updatedAvenants);
  
        toaster.success(`Avenant payer`, {
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