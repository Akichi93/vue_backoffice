<template>
    <div class="main-wrapper">
        <Header />

        <Sidebar />

        <div class="page-wrapper">
            <div class="content container-fluid pb-0"></div>


            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <select class="form-select" id="exampleSelect" aria-label="Default select example">
                        <option selected>Sélectionnez une option :</option>
                        <option value="CLIENT">CLIENT</option>
                        <option value="PROSPECT">PROSPECT</option>
                        <option value="APPORTEUR">APPORTEUR</option>
                        <option value="COMPAGNIE">COMPAGNIE</option>
                        <option value="CONTRAT">CONTRAT</option>
                        <option value="SINISTRE">SINISTRE</option>
                    </select>

                </div>


                <div class="col-xl-3 col-md-6">
                    <select class="form-select mb-3" v-model="branch">
                        <option value="tous">Toutes les branches</option>

                    </select>
                </div>


            </div>


            <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="contrat"></h3>
                                <h2>Nombre de contrats</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="prospect"></h3>
                                <h2>Nombre de prospects</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="echeance"></h3>
                                <h2>Contrat à echeance</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="sinistre"></h3>
                                <h2>Nombre de sinistres</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="countemission"></h3>
                                <h2>Emissions</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="comissioncourtier"></h3>
                                <h2>Commission courtier</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card flex-fill tickets-card">
                        <div class="card-header">
                            <div class="text-center w-100 p-3">
                                <h3 class="bl-text mb-1" v-text="comissionapporteur"></h3>
                                <h2>Commission apporteur</h2>
                            </div>
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
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);
export default {
    data() {
        return {
            year: "",
            branch: "",
            contrat: "",
            prospect: "",
            sinistre: "",
            comissioncourtier: "",
            comissionapporteur: "",
            echeance: "",
            countemission: "",
            // compagnies:[],
            getYear: {},
            branches: {},

        };
    },
    created() {
        this.getData();
    },
    name: "reporting",
    components: { Header, Sidebar, Bar },
    methods: {



        getData() {
            const token = localStorage.getItem("token");

            // Configurez les en-têtes de la requête
            const headers = {
                Authorization: "Bearer " + token,
                "x-access-token": token,
            };

            const params = {
                year: this.year,
                branch: this.branch,
            };
            axios
                .get("/api/auth/stat/", {
                    params: params,
                    headers: headers,
                })
                .then((response) => {
                    this.contrat = response.data.contrat;
                    this.prospect = response.data.prospect;
                    this.sinistre = response.data.sinistre;
                    this.comissioncourtier = response.data.comissioncourtier;
                    this.comissionapporteur = response.data.comissionapporteur;
                    this.echeance = response.data.echeance;
                    this.countemission = response.data.countemission;
                    this.compagnies = response.data.compagnies;


                })
                .catch((error) => console.log(error));
        },


    },
};
</script>