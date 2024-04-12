<template>
  <div class="modal custom-modal fade" id="change_statut" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Changer d'etat</h3>
            <p>Vous êtes sur le point de changer l'etat?</p>
          </div>
          <div class="modal-btn delete-action">
            <input type="hidden" class="form-control" v-model="prospectoedit.id_prospect" />
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <etatcomponent :placeholder="'selectionnez un état'" v-model="etat"></etatcomponent>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary continue-btn">Annuler</a>
              </div>
              <div class="col-6">
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn"
                  @click="ChangeEtat">Valider</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import etatcomponent from "../../components/select/etatcomponent.vue";
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from '../../db/AppStorage.js';
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["prospectoedit"],
  name: "changeProspect",
  components: {
    etatcomponent,
  },
  methods: {
    async ChangeEtat() {
      // const response = await fetch(
      //   "/api/check-internet-connection"
      // );

      // const data = await response.json();

      // this.isConnected = data.connected;
      // if (this.isConnected) {

      //   const entrepriseId = AppStorage.getEntreprise();

      //   axios
      //     .patch("/api/auth/etatProspect/" + this.prospectoedit.id_prospect, {
      //       etat: this.etat,
      //       id_entreprise: entrepriseId
      //     })
      //     .then((response) => {
      //       this.$emit('prospect-change', response)
      //       if (response.status === 200) {
      //         toaster.success(`Etat changé`, {
      //           position: "top-right",
      //         });
      //       }
      //     });
      // } else {
        // UUID du prospect que vous souhaitez mettre à jour
        const uuidProspectToUpdate = this.prospectoedit.uuidProspect;

        // Nouvel état du prospect
        const nouveauStatut = 1;
        const nouveauSyncState = 0;

        const prospectMisAJour = await AppStorage.updateProspectChange(
          uuidProspectToUpdate,
          nouveauStatut,
          nouveauSyncState
        );

        toaster.success(`Etat changé`, {
          position: "top-right",
        });

      // }
    },
  },
};
</script>

<!--  -->
