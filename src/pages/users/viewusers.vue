<template>
    <div class="content container-fluid pb-0">

        <div class="row">
            <div class="col-md-12">
                <div class="page-head-box">
                    <h3>Détails utilisateurs</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/home">Tableau de bord</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Détails utilisateurs</li>
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
                                            <li>
                                                <div class="title">Nom:</div>
                                                <div class="text" v-text="users.name"></div>
                                            </li>
                                            <li>
                                                <div class="title">Email:</div>
                                                <div class="text" v-text="users.email">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="title">Contact:</div>
                                                <div class="text" v-text="users.contact"></div>
                                            </li>
                                            <li>
                                                <div class="title">Adresse:</div>
                                                <div class="text" v-text="users.adresse"></div>
                                            </li>
                                            <li>
                                                <div class="title">Role:</div>
                                                <div class="text" v-text="users.nom_role"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card tab-box mt-3">
            <div class="row user-tabs">
                <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
                    <ul class="nav nav-tabs nav-tabs-bottom pt-3 pb-2">
                        <li class="nav-item"><a href="#emp_profile" data-bs-toggle="tab"
                                class="nav-link active">Prospects</a>
                        </li>
                        <li class="nav-item"><a href="#emp_projects" data-bs-toggle="tab" class="nav-link">Clients</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="tab-content">

            <div id="emp_profile" class="pro-overview tab-pane fade show active">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">


                            <table class="table table-striped custom-table mb-0 datatable">
                                <thead>
                                    <tr>
                                        <th>Nom du prospect</th>
                                        <th>Adresse</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Profession</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="prospect in prospects" :key="prospect.id_prospect">
                                        <tr>
                                            <td v-text="prospect.nom_prospect"></td>
                                            <td v-text="prospect.adresse_prospect"></td>
                                            <td v-text="prospect.email_prospect"></td>
                                            <td v-text="prospect.tel_prospect"></td>
                                            <td v-text="prospect.profession_prospect"></td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>


            <div class="tab-pane fade" id="emp_projects">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">


                            <table class="table table-striped custom-table mb-0 datatable">
                                <thead>
                                    <tr>
                                        <th>Nom du client</th>
                                        <th>Adresse</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Profession</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="client in clients" :key="client.id_client">
                                        <tr>
                                            <td v-text="client.nom_client"></td>
                                            <td v-text="client.adresse_client"></td>
                                            <td v-text="client.email_client"></td>
                                            <td v-text="client.tel_client"></td>
                                            <td v-text="client.profession_client"></td>
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
import axios from "axios";
export default {
    data() {
        return {
            users: "",
            clients: {},
            prospects: {},
        };
    },
    created() {
        this.viewRoute();
        this.getavenant();
    },
    mounted() {
        setInterval(() => {
            this.getavenant();
        }, 2000);
    },

    methods: {
        viewRoute() {
            let urlParams = new URLSearchParams(window.location.search);
            let myParam = urlParams.get("user");
            this.id_contrat = myParam;
        },
        getavenant() {
            let urlParams = new URLSearchParams(window.location.search);
            let myParam = urlParams.get("user");
            axios
                .get("get/logs?user=" + myParam)
                .then((response) => {
                    this.users = response.data.users;
                    this.prospects = response.data.prospects;
                    this.clients = response.data.clients;
                })
                .catch((error) => {
                    // this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
    },
};
</script>
<style>
img {
    max-width: 100%;
    height: 100%;
}
</style>