<template>
    <div class="main-wrapper">
        <Header />

        <Sidebar />
        <div class="page-wrapper">
            <div class="content container-fluid">

                <div class="row">
                    <div class="col-md-12">
                        <div class="page-head-box">
                            <h3>Salaire</h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/home">Tableau de bord</router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Salaire</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>


                <div class="row filter-row">
                    <div class="col-md-8"></div>
                    <div class="col-md-4">
                        <div class="add-emp-section">
                            <a href="/createsalary" class="btn btn-success btn-add-emp" style="width: auto;"><i
                                    class="fas fa-plus"></i>
                                Ajouter un salaire
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
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Sexe</th>
                                        <th>Secteur</th>
                                        <th>Date de naissance</th>
                                        <th>Date d'embauche</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="salarie in salaries" :key="salarie.id_salaire">
                                        <tr>
                                            <td v-text="salarie.nom"></td>
                                            <td v-text="salarie.prenom"></td>
                                            <td v-text="salarie.sexe"></td>
                                            <td v-text="salarie.secteur"></td>
                                            <td v-text="salarie.date_naissance"></td>
                                            <td v-text="salarie.date_embauche"></td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
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
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
    /* options */
});
export default {
    components: {
        Header,
        Sidebar
    },
    data() {
        return {
            salaries: {},
        };
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios
                .get("/api/auth/salaires")
                .then((response) => {
                    this.salaries = response.data;
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
    },
};
</script>
