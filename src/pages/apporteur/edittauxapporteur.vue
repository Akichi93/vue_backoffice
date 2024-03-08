<template>
  <div id="edit_taux" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier taux</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">

          <form>
            <div class="form-group">
              <label>Taux</label>
              <input class="form-control" type="text" v-model="tauxtoedit.taux">
            </div>
            <div class="submit-section">
              <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">Annuler</button>
              <button class="btn btn-primary submit-btn" type="button" data-bs-dismiss="modal"
                @click.prevent="editTaux">Modifier</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../../db/AppStorage";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ['tauxtoedit'],
  name: "edittauxapporteur",
  methods: {
    async editTaux() {

      const uuidTauxApporteurUpdate = this.tauxtoedit.uuidTauxApporteur;
      // console.log(uuidProspectToUpdate);

      // Nouvel état du prospect
      const newTaux = this.tauxtoedit.taux;
      const newSyncState = 0;

      try {
        await AppStorage.updateTauxApporteurByUuid(uuidTauxApporteurUpdate, newTaux, newSyncState);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedTauxApporteurs = await AppStorage.getTauxApporteurs();

        // Émettre un événement avec les prospects mis à jour
        this.$emit("tauxapporteur-update", updatedTauxApporteurs);

        toaster.success(`Taux Apporteur modifié`, {
          position: "top-right",
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du taux  :', error.message);
      }
      // axios
      //   .post("/api/auth/updateTauxApporteur", {
      //     id_tauxapp: this.tauxtoedit.id_tauxapp,
      //     taux: this.tauxtoedit.taux,
      //     id: this.tauxtoedit.id_apporteur,
      //   })
      //   .then((response) => {
      //     this.$emit('taux-update', response)
      //     // if (response.status === 200) {
      //       toaster.success("Taux modifié", {
      //         position: "top-right",
      //       });
      //     // }
      //   });
    },

  },
}
</script>

