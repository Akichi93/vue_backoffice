<template>
    <div class="main-wrapper">

        <Header />

        <Sidebar />

        <div class="page-wrapper">
            <div>
                <div class="container-fluid">
                    <div class="profile-foreground position-relative mx-n4">
                        <div class="profile-wid-bg">

                        </div>
                    </div>
                    <div class="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <div>
                                    <div class="p-2">
                                        <h3 class="text-black mb-1">{{ reference_compagnie }}</h3>
                                        <p class="text-black-75">{{ expert }}</p>
                                        <div class="hstack text-black-50 gap-1">
                                            <div>
                                                <i class="ri-map-pin-user-line me-1 text-black-75 fs-16 align-middle"></i>{{
                                                    lieu
                                                }}
                                            </div>
                                            <div>
                                                <i class="ri-building-line me-1 text-black-75 fs-16 align-middle"></i>{{
                                                    date_ouverture
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end col-->
                            <!--end col-->
                            <div class="col-md-6 order-last order-lg-0">
                                <div class="row text text-black-50 text-center">
                                    <div class="col-md-6 col-4">
                                        <div class="p-1">
                                            <h4 class="text-black mb-1">{{ reglements_compagnie_sum }} FCFA</h4>
                                            <p class="fs-14 mb-0">Reglements compagnie</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-4">
                                        <div class="p-1">
                                            <h4 class="text-black mb-1">{{ reglements_client_sum }} FCFA</h4>
                                            <p class="fs-14 mb-0">Reversements au client</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end col-->

                        </div>
                        <!--end row-->
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                <div class="d-flex">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                                        role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab"
                                                role="tab">
                                                <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                    class="d-none d-md-inline-block">Sinistre</span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link fs-14" data-bs-toggle="tab" href="#documents" role="tab">
                                                <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                    class="d-none d-md-inline-block">Pièces</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="flex-shrink-0">
                                        <button type="button" class="btn btn-success" @click="editSinistre()"><i
                                                class="ri-edit-box-line align-bottom"></i> Modifier Sinistre</button>
                                    </div>
                                </div>
                                <!-- Tab panes -->
                                <div class="tab-content pt-4 text-muted">
                                    <div class="tab-pane active" id="overview-tab" role="tabpanel">
                                        <div class="row">
                                            <div class="col-xxl-3">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h5 class="card-title mb-5">Etat du sinistre</h5>
                                                        <div class="progress animated-progress custom-progress progress-label"
                                                            v-if="etat == 1">
                                                            <div class="progress-bar bg-success" role="progressbar"
                                                                style="width: 100%" aria-valuenow="30" aria-valuemin="0"
                                                                aria-valuemax="100">
                                                                <div class="label">30%</div>
                                                            </div>
                                                        </div>
                                                        <div class="progress animated-progress custom-progress progress-label"
                                                            v-if="etat == 0">
                                                            <div class="progress-bar bg-danger" role="progressbar"
                                                                style="width: 30%" aria-valuenow="30" aria-valuemin="0"
                                                                aria-valuemax="100">
                                                                <div class="label">30%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="card">
                                                    <div class="card-body">
                                                        <h5 class="card-title mb-3">Info</h5>
                                                        <div class="table-responsive">
                                                            <table class="table table-borderless mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th class="ps-0" scope="row">Type de contrat :</th>
                                                                        <td class="text-muted">{{ type_contrat }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th class="ps-0" scope="row">Reference compagnie :
                                                                        </th>
                                                                        <td class="text-muted">{{ reference_compagnie }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th class="ps-0" scope="row">Date declaration
                                                                            compagnie
                                                                            :</th>
                                                                        <td class="text-muted">{{ date_declaration_compagnie
                                                                        }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th class="ps-0" scope="row">Gestion compagnie :
                                                                        </th>
                                                                        <td class="text-muted">{{ gestion_compagnie }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th class="ps-0" scope="row">Date ouverture</th>
                                                                        <td class="text-muted">{{ date_ouverture }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div><!-- end card body -->
                                                </div><!-- end card -->

                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-9">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h5 class="card-title mb-3">Commentaire</h5>
                                                        {{ commentaire }}
                                                        <!-- <div class="row">
                                                    <div class="col-6 col-md-4">
                                                        <div class="d-flex mt-4">
                                                            <div class="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                <div
                                                                    class="avatar-title bg-light rounded-circle fs-16 text-primary shadow">
                                                                    <i class="ri-user-2-fill"></i>
                                                                </div>
                                                            </div>
                                                            <div class="flex-grow-1 overflow-hidden">
                                                                <p class="mb-1">Designation :</p>
                                                                <h6 class="text-truncate mb-0">Lead Designer /
                                                                    Developer</h6>
                                                            </div>
                                                        </div>
                                                    </div> -->
                                                        <!--end col-->
                                                        <!-- <div class="col-6 col-md-4">
                                                        <div class="d-flex mt-4">
                                                            <div class="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                <div
                                                                    class="avatar-title bg-light rounded-circle fs-16 text-primary shadow">
                                                                    <i class="ri-global-line"></i>
                                                                </div>
                                                            </div>
                                                            <div class="flex-grow-1 overflow-hidden">
                                                                <p class="mb-1">Website :</p>
                                                                <a href="#" class="fw-semibold">www.velzon.com</a>
                                                            </div>
                                                        </div>
                                                    </div> -->
                                                        <!--end col-->
                                                        <!-- </div> -->
                                                        <!--end row-->
                                                    </div>
                                                    <!--end card-body-->
                                                </div><!-- end card -->

                                            </div>
                                            <!--end col-->
                                        </div>
                                        <!--end row-->
                                    </div>
                                    <div class="tab-pane fade" id="documents" role="tabpanel">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center mb-4">
                                                    <h5 class="card-title flex-grow-1 mb-0">Documents</h5>
                                                    <!-- <div class="flex-shrink-0">
                                                <input class="form-control d-none" type="file" id="formFile">
                                                <label for="formFile" class="btn btn-danger"><i
                                                        class="ri-upload-2-fill me-1 align-bottom"></i> Charger
                                                    fichier</label>
                                            </div> -->
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="table-responsive">
                                                            <table class="table table-borderless align-middle mb-0">
                                                                <thead class="table-light">
                                                                    <tr>
                                                                        <th scope="col">Nom du fichier</th>
                                                                        <th scope="col">Fichier</th>
                                                                        <th scope="col">Type</th>
                                                                        <th scope="col">Date</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <template v-for="file in files" :key="file.id_fichier">
                                                                        <tr>
                                                                            <td class="col-md-3">
                                                                                <div class="d-flex align-items-center">
                                                                                    <div class="ms-3 flex-grow-1">
                                                                                        <h6 class="fs-15 mb-0">
                                                                                            <a
                                                                                                :href="'/images/piece_sinistres/' + file.nom_fichier">
                                                                                                {{ file.nom_fichier }}
                                                                                            </a>
                                                                                        </h6>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="col-md-3">
                                                                                <a
                                                                                    :href="'/images/piece_sinistres/' + file.nom_fichier">
                                                                                    <iframe
                                                                                        :src="'/images/piece_sinistres/' + file.nom_fichier"
                                                                                        frameborder="0" width="80"
                                                                                        height="80"></iframe>
                                                                                    <!-- <img
                                                                                :src="'/images/piece_sinistres/' + file.nom_fichier"
                                                                                alt="" width="300"
                                                                                class="m-1 col-md-4"> -->
                                                                                </a>
                                                                            </td>
                                                                            <td class="col-md-3">{{
                                                                                "." + file.nom_fichier.split('.').at(-1)
                                                                            }}</td>
                                                                            <!-- <td class="col-md-3">{{ "/images/piece_sinistres/"+ file.nom_fichier }}</td> -->
                                                                            <td class="col-md-3">{{
                                                                                dateMoment(file.created_at)
                                                                            }}</td>
                                                                            <td class="col-md-3">
                                                                                <div class="dropdown">
                                                                                    <a href="javascript:void(0);"
                                                                                        class="btn btn-light btn-icon"
                                                                                        id="dropdownMenuLink7"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="true">
                                                                                        <i class="ri-equalizer-fill"></i>
                                                                                    </a>
                                                                                    <ul class="dropdown-menu dropdown-menu-end"
                                                                                        aria-labelledby="dropdownMenuLink7">
                                                                                        <li><a class="dropdown-item"
                                                                                                :href="'/images/piece_sinistres/' + file.nom_fichier"
                                                                                                target="_blank"><i
                                                                                                    class="fa fa-eye me-2 align-middle"></i>Voir</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item"
                                                                                                :href="'/images/piece_sinistres/' + file.nom_fichier"
                                                                                                download><i
                                                                                                    class="fa fa-download me-2 align-middle"></i>Télécharger</a>
                                                                                        </li>
                                                                                        <!-- <li><a class="dropdown-item"
                                                                                        href="javascript:void(0);"><i
                                                                                            class="ri-delete-bin-5-line me-2 align-middle text-danger"></i>Supprimer</a>
                                                                                </li> -->
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </template>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <!-- <div class="text-center mt-3">
                                                    <a href="javascript:void(0);" class="text-success "><i
                                                            class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                                                        Load more </a>
                                                </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end tab-pane-->
                                </div>
                                <!--end tab-content-->
                            </div>
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->

                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import axios from "axios";
import Form from 'vform';
import moment from "moment";
export default {
    components: {
        Header,
        Sidebar
    },
    data() {
        return {
            // type_contrat: '',
            files: {},
            id_sinistre: "",
            type_contrat: '',
            id_contrat: '',
            reference_compagnie: '',
            gestion_compagnie: '',
            numero_sinistre_agence: '',
            garantie_applique: '',
            lieu: '',
            materiel_corporel: '',
            ipp: '',
            date_survenance: '',
            heure: '',
            date_ouverture: '',
            date_declaration: '',
            date_declaration_compagnie: '',
            date_mission: '',
            recours: '',
            expert: '',
            accident_adversaire: '',
            materiel_sinistre: '',
            commentaire: '',
            etat: '',
            //Règlement
            referents: {},
            reglements_clients: {},
            reglements_compagnies: {},
            reglements_compagnie_sum: '',
            reglements_client_sum: '',
        }
    },
    methods: {
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
        
        dateMoment(created) {
            moment.locale('fr');
            var d = new Date(created);
            return moment(d.getTime()).fromNow();
        },
        viewSinistre() {
            let id = this.$route.params.id_sinistre;
            axios
                .get("/api/auth/get/sinistre?id=" + id)
                .then((response) => {
                    this.type_contrat = response.data.branche.nom_branche
                    this.id_contrat = response.data.contrat.id_contrat
                    this.reference_compagnie = response.data.sinistre.reference_compagnie
                    this.gestion_compagnie = response.data.sinistre.gestion_compagnie
                    this.numero_sinistre_agence = response.data.sinistre.numero_sinistre
                    this.garantie_applique = response.data.sinistre.garantie_applique
                    this.lieu = response.data.sinistre.lieu_sinistre
                    this.materiel_corporel = response.data.sinistre.materiel_sinistre
                    this.ipp = response.data.sinistre.ipp
                    this.date_survenance = response.data.sinistre.date_survenance
                    this.heure = response.data.sinistre.heure
                    this.date_ouverture = response.data.sinistre.date_ouverture
                    this.date_declaration = response.data.sinistre.date_declaration
                    this.date_declaration_compagnie = response.data.sinistre.date_decla_compagnie
                    this.date_mission = response.data.sinistre.date_mission
                    this.recours = response.data.sinistre.recours_sinistre
                    this.expert = response.data.sinistre.expert
                    this.accident_adversaire = response.data.sinistre.accident_sinistre
                    this.commentaire = response.data.sinistre.commentaire_sinistre
                    this.etat = response.data.sinistre.etat


                    this.files = response.data.file_sinistre

                    this.id_sinistre = response.data.sinistre.id_sinistre



                })
                .catch((error) => console.log(error));

        },
    },
    created() {
        this.viewSinistre()
        this.getReglement();
    },
}
</script>