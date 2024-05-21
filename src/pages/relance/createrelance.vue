<template>
    <div class="content container-fluid pb-0">

        <div class="row">
            <div class="col-md-12">
                <div class="page-head-box">
                    <h3>Relance</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/home">Tableau de bord</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Relance</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div class="row">

            <div class="col-md-12 col-lg-12 settings-cont">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label>Types</label>
                                <Multiselect v-model="types" :options="valeurs" placeholder="Choisir un type"
                                    :searchable="true" class="form-control" />
                            </div>
                            <div class="form-group" v-if="types === 'Echeances'">
                                <label>Periode</label>
                                <Multiselect v-model="periode" :options="periodes" placeholder="Choisir le temps"
                                    :searchable="true" class="form-control" />
                            </div>
                            <div class="form-group" v-if="types === 'Certains clients'">
                                <label>Clients</label>
                                <Multiselect v-model="users_team" :allow-empty="true" mode="tags" :custom-label="({ id_client, nom_client }) =>
                                    `${id_client} - [${nom_client}]`
                                    " valueProp="id_client" placeholder="Selectionnez le(s) personne(s)"
                                    label="nom_client" track-by="nom_client" :options="clients" :object="true"
                                    :close-on-select="false" :searchable="true" class="form-control">
                                </Multiselect>

                            </div>
                            <div class="form-group">
                                <label>Objet</label>
                                <Multiselect v-model="objet" :options="objets" placeholder="Choisir un objet"
                                    :searchable="true" />
                            </div>

                            <div class="form-group mb-0">
                                <div class="text-center">
                                    <button class="btn btn-primary"><span>Envoyer</span> <i class="fas fa-paper-plane m-l-5"
                                            @click="storeRelance"></i></button>
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
// import $ from "jquery";
const toaster = createToaster({
    /* options */
});
export default {
    name: "createrelance",
    components: {
        Multiselect,
    },
    data() {
        return {
            value: null,
            clients: {},
            users_team: [],
            message: "",
            date_relance: "",
            types: "",
            periodes: ["1 semaine", "2 semaines", "1 mois"],
            valeurs: ["Echeances", "Tous les clients", "Certains clients"],
            objets: ["AVIS ECHANCE AUTO", "AVIS d'ECHEANCE INDIVIDUEL ACCIDENT"],
            objet: "",
            periode: "",
        };
    },
    created() {
        this.fetchTask();
    },
    mounted() {
        this.fetchTask();
    },
    methods: {
        storeRelance() {
            let test = JSON.parse(JSON.stringify(this.users_team));
            let donnees = [];

            for (let i = 0; i < Object.keys(test).length; i++) {
                donnees.push(test[i]["id_client"]);
            }

            axios
                .post("/postRelance", {
                    message: this.message,
                    date_relance: this.date_relance,
                    users_team: donnees,
                    types: this.types,
                    objet: this.objet,
                    periode: this.periode,
                })
                .then((response) => {
                    if (response.status === 200) {
                        toaster.success(`Relance enregistré avec succes`, {
                            position: "top-right",
                        });
                    }

                    window.location.href = "/relance";
                })
                .catch((error) => {
                    this.errors = error.response.data;

                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        toaster.error(`Profession existante`, {
                            position: "top-right",
                        });
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

        fetchTask() {
            var that = this;
            axios.all([axios.get("/getClient")]).then(
                axios.spread(function (clients) {
                    that.clients = clients.data;
                })
            );
        },
    },
};
</script>

<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->