<template>
  <div class="modal custom-modal fade" id="delete_apporteur" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer apporteur</h3>
            <p>Voulez vous supprimer l'apporteur <b>{{ apporteurtoedit.nom_apporteur }}</b>?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-primary continue-btn" data-bs-dismiss="modal"
                  @click.prevent="deleteApporteur">supprimer</a>
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
  props: ["apporteurtoedit"],
  name: "deleteApporteur",
  methods: {
    // apporteurDelete() {
    //   const entrepriseId = AppStorage.getEntreprise();
    //   axios
    //     .patch("/api/auth/deleteApporteur/" + this.apporteurtoedit.id_apporteur, {
    //       id_entreprise: entrepriseId,
    //     })
    //     .then((response) => {
    //       this.$emit("apporteur-delete", response);
    //       toaster.success(`Apporteur supprimé avec succès`, {
    //         position: "top-right",
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    async deleteApporteur() {
      const uuidApporteur = this.apporteurtoedit.uuidApporteur;

      // Nouvel état du contrat
      const newSupprime = 1;

      const newSyncState = 0;

      const contratMisAJour = await AppStorage.deleteApporteurs(
        uuidApporteur,
        newSupprime,
        newSyncState
      );

      // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des contrats
      const updatedApporteurs = await AppStorage.getApporteurs();

      // Émettre un événement avec les contrats mis à jour
      this.$emit("apporteur-delete", updatedApporteurs);

      toaster.success(`Apporteur supprimé`, {
        position: "top-right",
      });
    
    },
  },
};
</script>