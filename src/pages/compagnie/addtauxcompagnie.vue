<template>
    <div id="create_project" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ajouter</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-sm-6" v-for="branche in branches" :key="branche.id_branche">
                                <div class="form-group">
                                    <label>{{ branche.nom_branche }}</label>
                                    <input type="number" class="form-control" min="0" max="100" placeholder="Entrez le taux"
                                        required="" :key="branche.id_branche" v-model="branche.value" />
                                </div>
                            </div>
                        </div>
                        <div class="submit-section">
                            <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal"
                                aria-label="Close">Annuler</button>
                            <button class="btn btn-primary submit-btn" type="button" @click.prevent="addTaux"
                                data-bs-dismiss="modal">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "addtauxcompagnie",
    props: ['tauxcompagnietoedit'],
    methods: {
        getbranche() {
            axios
                .get(
                    `/api/auth/getBrancheDiffCompagnie/${this.$route.params.id_compagnie}`
                )
                .then((response) => {
                    this.branches = response.data;
                })
                .catch((error) => {
                    // this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
        addTaux() {
            let test = JSON.parse(JSON.stringify(this.branches));
            let donnees = [];

            for (let i = 0; i < Object.keys(test).length; i++) {
                donnees.push(test[i]["value"]);
            }

            let testing = JSON.parse(JSON.stringify(this.branches));
            let datas = [];

            for (let i = 0; i < Object.keys(testing).length; i++) {
                datas.push(testing[i]["id_branche"]);
            }
            axios
                .post("/api/auth/postTauxCompagnie", {
                    name: this.names.nom_compagnie,
                    taux: this.tauxcompagnietoedit.taux,
                    accidents: donnees,
                    ids: datas,
                })
                .then((response) => {
                    this.$emit('tauxcompagnie-add', response)
                    // if (response.status === 200) {
                    //     toaster.success("Taux ajouté", {
                    //         position: "top-right",
                    //     });
                    // }
                });
        },
    }


}
</script>