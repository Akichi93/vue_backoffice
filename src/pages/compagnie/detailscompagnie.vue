<template>
    <div class="main-wrapper">
        <Header />

        <Sidebar />

        <div class="page-wrapper">
            <div class="content container-fluid pb-0">
                <div class="row">
                    <div class="col-md-12">
                        <div class="page-head-box">
                            <h3>Detail de la compagnie</h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/home">Tableau de bord</router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Detail de la compagnie
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="card mb-0">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="profile-view">
                                    <div class="profile-basic">
                                        <div class="row">
                                            <div class="col-md-7">
                                                <ul class="personal-info">
                                                    <!-- <li>
                                                        <div class="title">Nom:</div>
                                                        <div class="text">
                                                            {{ apporteurs.nom_apporteur }}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="title">Adresse:</div>
                                                        <div class="text">
                                                            {{ apporteurs.adresse_apporteur }}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="title">Contact:</div>
                                                        <div class="text">
                                                            {{ apporteurs.contact_apporteur }}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="title">Postal:</div>
                                                        <div class="text">
                                                            {{ apporteurs.code_postal }}
                                                        </div>
                                                    </li> -->
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="emp_profile" class="pro-overview tab-pane fade show active">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table table-striped custom-table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Type de contrat</th>
                                            <th>Numéro de police</th>
                                            <th>Commision</th>
                                            <th>Payé</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(contrat, i) in contrats" :key="i">
                                            <tr>
                                                <td>
                                                    <h5>{{ contrat.nom_branche }}</h5>
                                                </td>
                                                <td>{{ contrat.numero_police }}</td>
                                                <td>{{ contrat.commission_courtier }}</td>
                                                <td v-if="contrat.payer_courtier == 0">
                                                    <span class="badge badge-pill bg-danger">NON</span>
                                                </td>
                                                <td v-else>
                                                    <span class="badge badge-pill bg-success">OUI</span>
                                                </td>
                                                <td v-if="contrat.payer_courtier == 0">
                                                    <a href="#" @click="editAvenant(contrat.uuidAvenant)"
                                                        data-bs-toggle="modal" data-bs-target="#payer_apporteur"
                                                        title="Payer"><i class="fas fa-check"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Total :</th>
                                            <th></th>
                                            <td>{{ sommes }}</td>
                                            <td>{{ sommepayes }}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <validatepaye v-bind:avenantoedit="avenantoedit" @type-update="refresh"></validatepaye>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppStorage from '../../db/AppStorage';
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import validatepaye from "./validatepaye.vue"
export default {
    name: "statapporteur",
    components: {
        Header,
        Sidebar,
        validatepaye
    },
    data() {
        return {
            // apporteurs: [],
            contrats: [],
            sommes: "",
            sommepayes: "",
            avenantoedit: ""
        };
    },
    created() {
        this.fetchData();
        this.fetchDataSomme();
        this.fetchDataSommePayer()
    },
    methods: {
        async editAvenant(uuidAvenant) {
            try {
                this.avenantoedit = await AppStorage.getAvenantByUuid(uuidAvenant);
            } catch (error) {
                console.log(error);
            }
            // axios
            //     .get("/api/auth/editAvenant/" + id_avenant)
            //     .then((response) => {
            //         this.avenantoedit = response.data;


            //         // this.form.id_avenant = response.data.id_avenant;
            //     })
            //     .catch((error) => console.log(error));
        },

        async fetchData() {

            const uuidCompagnie = this.$route.params.uuidCompagnie;
            try {
                const contrats = await AppStorage.getAvenantsByUUIDCompagnie(uuidCompagnie);

                this.contrats = contrats;

            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des contrats:", error);
            }

            // const token = localStorage.getItem("token");

            // // Configurez les en-têtes de la requête
            // const headers = {
            //   Authorization: "Bearer " + token,
            //   "x-access-token": token,
            // };
            // axios
            //   .get(`/api/auth/detailsapporteurs/${this.$route.params.id_apporteur}`, {
            //     headers,
            //   })
            //   .then((response) => {
            //     this.apporteurs = response.data.apporteurs;
            //     this.listescontrats = response.data.listescontrats;
            //     this.sommes = response.data.sommes;
            //     this.sommepayes = response.data.sommepayes;
            //   })
            //   .catch((error) => {
            //     this.error = error.response.data.message || error.message;
            //   });
        },

        async fetchDataSomme() {
            const uuidCompagnie = this.$route.params.uuidCompagnie; // Remplacez "votre_uuid_apporteur" par l'UUID approprié
            const sommes = await AppStorage.getSommeCommissionsCompagnie(uuidCompagnie)
            this.sommes = sommes;

        },

        async fetchDataSommePayer() {
            const uuidCompagnie = this.$route.params.uuidCompagnie; // Remplacez "votre_uuid_apporteur" par l'UUID approprié
            const sommepayes = await AppStorage.getSommeCommissionsCompagniePayer(uuidCompagnie)
            this.sommepayes = sommepayes;

        },

        refresh() {
            AppStorage.getAvenants().then((result) => {
                this.contrats = result;
            });
        }
    },
};
</script>