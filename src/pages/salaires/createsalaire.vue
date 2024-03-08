<template>
    <div class="content container-fluid">

        <div class="row">
            <div class="col-md-12">
                <div class="page-head-box">
                    <h3>Salaires</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">

                            <li class="breadcrumb-item"><router-link to="/home">Tableau de bord</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Salaires</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>



        <div class="row">
            <div class="col-md-12">
                <div class="card mb-0">
                    <div class="card-header">
                        <h4 class="card-title mb-0">Ajoût de salaire</h4>
                    </div>
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Nom:</label>
                                    <input class="form-control" type="text" placeholder="Akichi" v-model="nom" />
                                </div>
                                <div class="form-group">
                                    <label>Prénom:</label>
                                    <input class="form-control" placeholder="Jean-Philippe" type="text" v-model="prenom" />
                                </div>
                                <div class="form-group">
                                    <label>Secteur:</label>
                                    <input class="form-control" placeholder="Jean-Philippe" type="text" v-model="secteur" />
                                </div>
                                <div class="form-group">
                                    <label>Sexe:</label>
                                    <Multiselect v-model="sexe" :options="sexes" placeholder="Choisir le sexe"
                                        :searchable="false" />
                                </div>


                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Date de naissance :</label>
                                            <input type="date" class="form-control" v-model="date_naissance" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Rénumération:</label>
                                            <input type="text" class="form-control" placeholder="850000"
                                                v-model="renumeration" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Date d'embauche:</label>
                                            <input type="date" class="form-control" v-model="date_embauche" />
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn btn-primary" @click="storeSalary">Enregistrer</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
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
            nom: "",
            prenom: "",
            sexe: "",
            date_naissance: "",
            date_embauche: "",
            secteur: "",
            renumeration: "",
            sexes: ["Homme", "Femme"],
        };
    },
    mounted() {
        this.getCategories();
    },
    created() {
        this.getCategories();
    },
    methods: {
        storeSalary() {
            axios
                .post("/api/auth/salaires", {
                    nom: this.nom,
                    prenom: this.prenom,
                    sexe: this.sexe,
                    date_embauche: this.date_embauche,
                    date_naissance: this.date_naissance,
                    date_naissance: this.date_naissance,
                    secteur: this.secteur,
                    renumeration: this.renumeration,
                })
                .then((response) => {
                    if (response.status === 200) {
                        toaster.success(`Apporteur ajouté avec succès`, {
                            position: "top-right",
                        });
                    }
                    window.location.href = "/salary";
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
        getCategories: function () {
            axios.get("/api/auth/catdepenses").then(
                function (response) {
                    this.categories = response.data;
                }.bind(this)
            );
        },
        getTypes: function () {
            axios
                .post("/api/auth/get-depense", {
                    id_catdep: this.category.id_catdep,
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