<template>
    <div class="content container-fluid">

        <div class="row">
            <div class="col-md-12">
                <div class="page-head-box">
                    <h3>Depenses</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/home">Tableau de bord</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Depenses</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>


        <div class="row filter-row">
            <div class="col-md-8"></div>
            <div class="col-md-4">
                <div class="add-emp-section">
                    <a href="/createdepense" class="btn btn-success btn-add-emp" style="width: auto;"><i
                            class="fas fa-plus"></i>
                        Ajouter une dépense
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-row">
                <input type="text" class="form-control" placeholder="Rechercher un apporteur" v-model="q"
                    @keyup="searchtask" />
            </div>
            <div class="col-md-12">
                <div>
                    <table class="table table-striped custom-table mb-0">
                        <thead>
                            <tr>
                                <th>Date opération</th>
                                <th>Libelles</th>
                                <th>Catégorie</th>
                                <th>Type depense</th>
                                <th>Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="expenditure in expenditures" :key="expenditure.id_depense">
                                <tr>
                                    <td v-text="expenditure.date_operation"></td>
                                    <td v-text="expenditure.info_depense"></td>
                                    <td v-text="expenditure.nom_secteur"></td>
                                    <td v-text="expenditure.nom_type"></td>
                                    <td v-text="expenditure.montant"></td>

                                </tr>
                            </template>
                        </tbody>
                    </table>
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
    data() {
        return {
            expenditures: {},
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.error = this.branches = null;
            this.loading = true;
            axios
                .get("/api/auth/expenditures")
                .then((response) => {
                    this.expenditures = response.data;
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
    },
};
</script>
