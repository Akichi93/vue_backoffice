<template>
    <div id="edit_department" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modifier commentaire de la branche</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <input hidden="hidden" v-model="tauxtoedit.id_tauxcomp" /> -->
                    <form>
                        <div class="form-group">
                            <label>Commentaire</label>
                            <textarea class="form-control" v-model="description" id="" cols="30" rows="5"></textarea>
                        </div>
                        <div class="submit-section">
                            <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal"
                                aria-label="Close">Annuler</button>
                            <button class="btn btn-primary submit-btn" type="button" @click="editTaux"
                                data-bs-dismiss="modal">Modifier</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {

    }
}
</script>