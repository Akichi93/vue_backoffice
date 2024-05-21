<template>
    <div class="content container-fluid">

        <div class="row">
            <div class="col-md-12">
                <div class="page-head-box">
                    <h3>Type Catégorie</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/home">Tableau de bord</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Catégorie</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>


        <div class="row filter-row">
            <div class="col-md-8"></div>
            <div class="col-md-4">
                <div class="add-emp-section">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#edit_department" class="btn btn-success btn-add-emp"
                        style="width: auto;"><i class="fas fa-plus"></i>
                        Ajouter catégorie
                    </a>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- <div class="col-row">
                <input type="text" class="form-control" placeholder="Rechercher un apporteur" v-model="q"
                    @keyup="searchtask" />
            </div> -->
            <div class="col-md-12">
                <div>
                    <table class="table table-striped custom-table mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom de la catégorie</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="result in results" :key="result.id_result">
                                <tr>
                                    <td v-text="result.id_result"></td>
                                    <td v-text="result.nom_secteur"></td>
                                    <td v-text="result.nom_type"></td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>



    <div id="edit_department" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ajouter catégorie</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Catégorie</label>
                                    <Multiselect v-model="categorie_id" :options="categories" :custom-label="({ id_catdep, nom_secteur }) =>
                                        `${id_catdep} - [${nom_secteur}]`
                                        " valueProp="id_catdep" placeholder="Choisir une categorie" label="nom_secteur"
                                        track-by="nom_secteur" :searchable="true">
                                    </Multiselect>
                                </div>
                                <div class="form-group">
                                    <label>Type</label>
                                    <Multiselect v-model="expense_id" :options="expenses" :custom-label="({ id_typedep, nom_type }) => `${id_typedep} - [${nom_type}]`
                                        " valueProp="id_typedep" placeholder="Choisir une depense" label="nom_type"
                                        track-by="nom_type" :searchable="true">
                                    </Multiselect>
                                </div>
                            </div>

                        </div>

                        <div class="submit-section">
                            <button class="btn btn-primary cancel-btn" type="button" data-bs-dismiss="modal"
                                aria-label="Close">Annuler</button>
                            <button class="btn btn-primary submit-btn" type="button" data-bs-dismiss="modal"
                                @click="storeCategorie">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
    /* options */
});
export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            value: null,
            categories: {},
            expenses: {},
            results: {},
            categorie_id: "",
            expense_id: "",
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        storeCategorie() {
            axios
                .post("/api/auth/catdepenses/assoc/", {
                    categorie_id: this.categorie_id,
                    expense_id: this.expense_id,
                })
                .then((response) => {
                    this.fetchData();
                    // console.log(response.data);
                    toaster.success(`Catégorie ajouté avec succès`, {
                            position: "top-right",
                        });
                })
                .catch((error) => {
                    // console.log(error.response.headers);

                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        // console.log("Message non enregisté")
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                });
        },
        fetchData() {
            var that = this;
            axios.all([axios.get("/api/auth/catdepenses"), axios.get("/api/auth/typexpenses"), axios.get("/api/auth/getresult")]).then(
                axios.spread(function (categories, expenses, results) {
                    that.categories = categories.data;
                    that.expenses = expenses.data;
                    that.results = results.data;
                })
            );
        },
    },
};
</script>
  
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->