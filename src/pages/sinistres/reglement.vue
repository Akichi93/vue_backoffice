<template>
    <div class="main-wrapper">

        <Header />

        <Sidebar />

        <div class="page-wrapper">
            <div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div id="customerList">
                                    <div class="row g-4 mb-3">
                                        <div class="col-sm-auto">
                                            <div>
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#addReglementss"
                                                    class="btn btn-success" @click="showModal"><i
                                                        class="ri-add-line align-bottom me-1"></i>
                                                    Ajouter reglement</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- end card -->
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->


                <div class="row">
                    <!-- end col -->

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">Reversements</h4>
                            </div>
                            <!-- end card header -->

                            <div class="card-body">
                                <div class="live-preview">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Mode</th>
                                                    <th scope="col">Beneficiaire</th>
                                                    <th scope="col">Type de reglement</th>
                                                    <th scope="col">Montant</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="reglements_client in reglements_clients"
                                                    :key="reglements_client.id_reglement">
                                                    <tr>
                                                        <td>{{ reglements_client.date_reglement }}</td>
                                                        <td>{{ reglements_client.mode }}</td>
                                                        <td>{{ reglements_client.nom }}</td>
                                                        <td>{{ reglements_client.type_reglement }}</td>
                                                        <td>{{ reglements_client.montant }}</td>
                                                        <td>
                                                            <a href="#" data-bs-toggle="modal"
                                                                data-bs-target="#editReglementss" class="btn btn-secondary"
                                                                @click="updateReglement(reglements_client.id_reglement)">
                                                                <i class="ri-edit-box-line align-middle"></i></a>

                                                            <div class="modal fade" id="editReglement" tabindex="-1"
                                                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div class="modal-dialog modal-dialog-centered">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header bg-light p-3">
                                                                            <h5 class="modal-title" id="exampleModalLabel">
                                                                                Modifier Reglememt</h5>
                                                                            <button type="button" class="btn-close"
                                                                                data-bs-dismiss="modal" aria-label="Close"
                                                                                id="close-modal"></button>
                                                                        </div>
                                                                        <form>
                                                                            <div class="modal-body">
                                                                                <div class="form-group">
                                                                                    <input type="hidden"
                                                                                        v-model="form.id_sinistre"
                                                                                        :modelValue="form.id_sinistre">
                                                                                </div>
                                                                                <div class="mb-3" id="modal-id"
                                                                                    style="display: none;">
                                                                                    <label for="id-field"
                                                                                        class="form-label">ID</label>
                                                                                    <input type="text" id="id-field"
                                                                                        class="form-control"
                                                                                        placeholder="ID" readonly="">
                                                                                </div>

                                                                                <div class="mb-3">
                                                                                    <label for="customername-field"
                                                                                        class="form-label">Type de
                                                                                        reglement</label>
                                                                                    <select class="form-control"
                                                                                        data-trigger="" name="status-field"
                                                                                        id="status-field"
                                                                                        v-model="form.type">

                                                                                        <option value="">Selectionnez
                                                                                        </option>
                                                                                        <option value="Client">Client
                                                                                        </option>
                                                                                        <option value="Expert">Expert
                                                                                        </option>
                                                                                        <option value="Garage">Garage
                                                                                        </option>
                                                                                        <option value="Tiers">Tiers</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div class="mb-3">
                                                                                    <label for="nom-field"
                                                                                        class="form-label">Nom</label>
                                                                                    <input type="text" id="nom-field"
                                                                                        class="form-control"
                                                                                        placeholder="Nom ...." required=""
                                                                                        v-model="form.nom"
                                                                                        :modelValue="form.nom">
                                                                                </div>

                                                                                <div class="mb-3">
                                                                                    <label for="phone-field"
                                                                                        class="form-label">Mode</label>
                                                                                    <Multiselect v-model="form.mode"
                                                                                        :options="modes"
                                                                                        placeholder="Choisir le mode"
                                                                                        :searchable="true" />
                                                                                </div>
                                                                                <div class="mb-3">
                                                                                    <label for="montant"
                                                                                        class="form-label">Montant</label>
                                                                                    <input type="number"
                                                                                        class="form-control"
                                                                                        v-model="form.montant"
                                                                                        :modelValue="form.montant"
                                                                                        id="montant" name="montant"
                                                                                        placeholder="Montant">
                                                                                </div>
                                                                                <div>
                                                                                    <label for="status-field"
                                                                                        class="form-label">Date</label>
                                                                                    <input type="date" class="form-control"
                                                                                        v-model="form.date" name="date">
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <div
                                                                                    class="hstack gap-2 justify-content-end">
                                                                                    <button type="button"
                                                                                        class="btn btn-light"
                                                                                        data-bs-dismiss="modal">Annuler</button>
                                                                                    <button type="button"
                                                                                        class="btn btn-success" id="add-btn"
                                                                                        @click="changeReglement(form.id)">Modifier</button>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th id="total" colspan="5">Total reversé :</th>
                                                    <td>{{ reglements_client_sum }}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- end card-body -->
                        </div>
                        <!-- end card -->
                    </div>
                    <!-- end col -->
                </div>


                <div class="modal fade" id="addReglement" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header bg-light p-3">
                                <h5 class="modal-title" id="exampleModalLabel">Reglememt</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    id="close-modal"></button>
                            </div>
                            <form>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <input type="hidden" v-model="form.id_sinistre" :modelValue="form.id_sinistre">
                                    </div>
                                    <div class="mb-3" id="modal-id" style="display: none;">
                                        <label for="id-field" class="form-label">ID</label>
                                        <input type="text" id="id-field" class="form-control" placeholder="ID" readonly="">
                                    </div>

                                    <div class="mb-3">
                                        <label for="customername-field" class="form-label">Type de reglement</label>
                                        <select class="form-control" data-trigger="" name="status-field" id="status-field"
                                            v-model="form.type">
                                            <option value="">Selectionnez</option>
                                            <option value="Client">Client</option>
                                            <option value="Expert">Expert</option>
                                            <option value="Garage">Garage</option>
                                            <option value="Tiers">Tiers</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="nom-field" class="form-label">Nom</label>
                                        <input type="text" id="nom-field" class="form-control" placeholder="Nom ...."
                                            required="" v-model="form.nom">
                                    </div>

                                    <div class="mb-3">
                                        <label for="phone-field" class="form-label">Mode</label>
                                        <Multiselect v-model="form.mode" :options="modes" placeholder="Choisir le mode"
                                            :searchable="true" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="montant" class="form-label">Montant</label>
                                        <input type="number" class="form-control" v-model="form.montant" id="montant"
                                            name="montant" placeholder="Montant">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="hstack gap-2 justify-content-end">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-success" id="add-btn" @click="addReglement"
                                            data-bs-dismiss="modal">Ajouter</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Form from 'vform'
import $ from "jquery";
import Multiselect from "@vueform/multiselect";

import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
    /* options */
});
export default {
    components: {
        Multiselect,
        Header,
        Sidebar
    },
    data() {
        return {
            // id_sinistre:'',
            form: new Form({
                id: '',
                referent: '',
                mode: '',
                date: '',
                type: '',
                nom: '',
                montant: '',
                id_sinistre: '',
            }),
            compagnieform: new Form({
                id: '',
                referent: '',
                mode: '',
                date: '',
                type: '',
                nom: '',
                montant: '',
                id_sinistre: '',
            }),
            value: null,
            referents: {},
            reglements_clients: {},
            reglements_compagnies: {},
            reglements_compagnie_sum: '',
            reglements_client_sum: '',
            modes: ["Espèces", "Carte", "Chèques"],
        };
    },

    methods: {
        fetchData() {
            this.error = this.contrats = null;
            // this.loading = true;
            axios
                .get("/api/auth/get/apporteur")
                .then((response) => {
                    // this.loading = true;
                    this.referents = response.data.apporteurs;
                })
                .catch((error) => {
                    // this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
        getReglement() {
            let id = this.$route.params.id_sinistre;
            // this.form.id_sinistre = myParam
            axios
                .get("/api/auth/get/reglements?sinistre=" + id)
                .then((response) => {
                    // this.loading = true;
                    this.reglements_clients = response.data.reglements_client;
                    this.reglements_compagnies = response.data.reglements_compagnie;
                    this.reglements_compagnie_sum = response.data.reglements_compagnie_sum;
                    this.reglements_client_sum = response.data.reglements_client_sum;
                })
                .catch((error) => {
                    // this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
        showModal() {
            this.form.reset()
            let myParam = this.$route.params.id_sinistre;
            this.form.id_sinistre = myParam
            window.$("#addReglement").modal("show");
        },
        addReglement() {
            this.form.post('/api/auth/add/reglement').then((response) => {
                this.getReglement();
                toaster.success(`Reglement ajouté avec succès`, {
                    position: "top-right",
                });
                this.$toast.success(response.data.success, {
                    // override the global option
                    position: 'top-right'
                });
                window.$("#addReglement").modal("hide");
                this.form.reset()
                this.form.id_sinistre = response.data.id_sinistre
            }).catch(() => {
                this.$toast.error("Creation Impossible, Veuillez renseigner tous les champs", {
                    // override the global option
                    position: 'top-right'
                });
            });
        },
        updateReglement(id, client = "Beneficiaire") {
            let sinistre = this.$route.params.id_sinistre;
            axios
                .get("/api/auth/get/reglement?sinistre=" + sinistre + "&id=" + id + "&type=" + client)
                .then((response) => {
                    // this.loading = true;
                    // this.reglements_clients = response.data.reglements_client;
                    // this.form.referent = response.data.reglement.referent
                    this.form.id = response.data.reglement.id_reglement
                    this.form.mode = response.data.reglement.mode
                    this.form.date = response.data.reglement.date_reglement
                    this.form.type = response.data.reglement.type_reglement
                    this.form.montant = response.data.reglement.montant
                    this.form.nom = response.data.reglement.nom
                    this.form.id_sinistre = response.data.reglement.id_sinistre



                })
                .catch((error) => {
                    // this.loading = false;
                    this.error = error.response.data.message || error.message;
                });

            window.$("#editReglement").modal("show");
            // this.form.put('/api/update/reglement/'+id).then((response) => {
            //     console.log(response.data)
            // })
        },
        updateReglementCompagnie(id, client = "Block") {
            let sinistre = this.$route.params.id_sinistre;
            axios
                .get("/api/auth/get/reglement?sinistre=" + sinistre + "&id=" + id + "&type=" + client)
                .then((response) => {
                    // this.loading = true;
                    // this.reglements_clients = response.data.reglements_client;
                    // this.form.referent = response.data.reglement.referent
                    this.compagnieform.id = response.data.reglement.id_reglement
                    this.compagnieform.mode = response.data.reglement.mode
                    this.compagnieform.date = response.data.reglement.date_reglement
                    this.compagnieform.type = response.data.reglement.type_reglement
                    this.compagnieform.montant = response.data.reglement.montant
                    this.compagnieform.nom = response.data.reglement.nom
                    this.compagnieform.id_sinistre = response.data.reglement.id_sinistre

                })
                .catch((error) => {
                    // this.loading = false;
                    this.error = error.response.data.message || error.message;
                });

            window.$("#editReglementCompagnie").modal("show");
            // this.form.put('/api/update/reglement/'+id).then((response) => {
            //     console.log(response.data)
            // })
        },

        changeReglement(id) {
            this.form.put("/api/auth/change/reglement/" + id).then((response) => {
                this.getReglement();
                window.$("#editReglement").modal("hide");
                toaster.success(`Reglement ajouté avec succès`, {
                    position: "top-right",
                });
                this.$toast.success("Reglement modifiée avec succès", {
                    // override the global option
                    position: 'top-right'
                });
            })
        },

        changeReglementCompagnie(id) {
            this.compagnieform.put("/api/auth/change/reglement/" + id).then((response) => {
                this.getReglement();
                toaster.success(`Client ajouté avec succès`, {
                    position: "top-right",
                });
                window.$("#editReglementCompagnie").modal("hide");
                this.$toast.success("Reglement modifiée avec succès", {
                    // override the global option
                    position: 'top-right'
                });
            })
        }
    },
    created() {
        this.fetchData();
        this.getReglement();
    },

}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
