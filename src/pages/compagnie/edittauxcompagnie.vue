<template>
    <div id="edit_tauxcompagnie" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modifier taux</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <input hidden="hidden" v-model="tauxtoedit.id_tauxcomp" /> -->
                    <form>
                        <div class="form-group">
                            <label>Taux</label>
                            <input type="text" class="form-control" min="0" max="100" v-model="tauxtoedit.tauxcomp" />
                        </div>
                        <div class="submit-section">
                            <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal"
                                aria-label="Close">Annuler</button>
                            <button class="btn btn-primary submit-btn" type="button" @click.prevent="editTaux"
                                data-bs-dismiss="modal">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppStorage from "../../db/AppStorage"
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
    /* options */
});
export default {
    props: ['tauxtoedit'],
    name: "edittauxcompagnie",
    methods: {
        async editTaux() {

            const uuidTauxCompagnieUpdate = this.tauxtoedit.uuidTauxCompagnie;
            // console.log(uuidProspectToUpdate);

            // Nouvel état du prospect
            const newTaux = this.tauxtoedit.tauxcomp;
            const newSyncState = 0;

            try {
                await AppStorage.updateTauxCompagnieByUuid(uuidTauxCompagnieUpdate, newTaux, newSyncState);

                // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
                const updatedTauxCompagnies = await AppStorage.getTauxCompagniesByIdCompagnie(uuidTauxCompagnieUpdate);

                // Émettre un événement avec les prospects mis à jour
                this.$emit("tauxcompagnie-updated", updatedTauxCompagnies);

                toaster.success(`Taux compagnie modifié`, {
                    position: "top-right",
                });
            } catch (error) {
                console.error('Erreur lors de la mise à jour du prospect :', error.message);
            }


            //     .post("/api/auth/updateTauxCompagnie", {
            //         id_tauxcomp: this.tauxtoedit.id_tauxcomp,
            //         tauxcomp: this.tauxtoedit.tauxcomp,
            //         id: this.tauxtoedit.id_compagnie,
            //     })
            //     .then((response) => {
            //         this.$emit('tauxcompagnie-updated', response)
            //         if (response.status === 200) {
            //             toaster.success(`Taux modifié`, {
            //                 position: "top-right",
            //             });
            //         }
            //     });
        },
    }
}
</script>