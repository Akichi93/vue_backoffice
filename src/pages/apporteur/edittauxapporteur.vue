<template>
  <div id="edit_taux" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier taux <em>{{ tauxtoedit.nom_branche }}</em></h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">

          <form>
            <div class="form-group">
              <label>Taux </label>
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
import { createToaster } from "@meforma/vue-toaster";
import switchService from '../../services/switchService';
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
      const uuidApporteur = this.$route.params.uuidApporteur;

      try {
        // await AppStorage.updateTauxApporteurByUuid(uuidTauxApporteurUpdate, newTaux, newSyncState);

      
        // const updatedTauxApporteurs = await AppStorage.getTauxApporteursByIdApporteur(uuidTauxApporteurUpdate);

        const updatedTauxApporteurs = await switchService.updateTauxApporteur(uuidTauxApporteurUpdate,newTaux,newSyncState,uuidApporteur)

        // Émettre un événement avec les prospects mis à jour
        this.$emit("tauxapporteur-update", updatedTauxApporteurs);

        toaster.success(`Taux Apporteur modifié`, {
          position: "top-right",
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du taux  :', error.message);
      }
     
    },

  },
}
</script>

