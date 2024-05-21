<template>
    <div class="content container-fluid">

        <div class="row">
            <div class="col-md-12">
                <div class="page-head-box">
                    <h3>Dépenses</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/home">Tableau de bord</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Dépenses</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>



        <div class="row">
            <div class="col-md-12">
                <div class="card mb-0">
                    <div class="card-header">
                        <h4 class="card-title mb-0">Création de dépense</h4>
                    </div>
                    <div class="card-body">
                        <form action="#">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Categorie:</label>

                                        <select class="form-select mb-3" @change="getTypes()" v-model="category">
                                            <option v-for='data in categories' :value='data.id_catdep'
                                                :key='data.id_catdep'>{{
                                                    data.nom_secteur }}</option>

                                        </select>
                                    </div>


                                    <div class="form-group">
                                        <label>Type de dépense:</label>
                                        <Multiselect v-model="type_id" :options="types" :custom-label="({ id_typedep, nom_type }) =>
                                            `${id_typedep} - [${nom_type}]`
                                            " valueProp="id_typedep" placeholder="Choisir un secteur" label="nom_type"
                                            track-by="nom_type" :searchable="true">
                                        </Multiselect>
                                    </div>
                                    <div class="form-group">



                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Date d'opération:</label>
                                                        <input class="form-control" type="date" v-model="date_operation" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Montant :</label>
                                                        <input type="text" class="form-control" placeholder="Exemple: 75000"
                                                            v-model="montant" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Informations sur dépenses:</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Exemple: Factures CIE" v-model="libelles" />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="text-end">
                                        <button type="button" class="btn btn-primary"
                                            @click="storeProspect">Enregistrer</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({/* options */});

export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            type_id: "",
            id_catdep: "",
            types: {},
            categories: {},
            secteur_id: "",
            category: "",
            date_operation: "",
            montant: "",
            libelles: "",
        };
    },
    created() {
        this.getCategory();
    },
    methods: {
        storeDepense() {
            axios
                .post("/api/auth/expenditures", {
                    id_catdep: this.category,
                    type_id: this.type_id,
                    date_operation: this.date_operation,
                    montant: this.montant,
                    libelles: this.libelles,
                })
                .then((response) => {
                    if (response.status === 200) {
                        toaster.success(`Dépense ajouté avec succès`, {
                            position: "top-right",
                        });
                    }
                    window.location.href = "/depenses";
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

        getCategory: function () {
            axios.get("/api/auth/catdepenses").then(
                function (response) {
                    this.categories = response.data;
                }.bind(this)
            );
        },


        getTypes: function () {
            axios
                .post("/api/auth/get-depense", {
                    id_catdep: this.category,
                })
                .then(
                    function (response) {
                        this.types = response.data;
                    }.bind(this)
                );
        },
    },
};
</script>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->