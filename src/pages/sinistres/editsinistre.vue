<template>
    <div class="main-wrapper">
        <Header />

        <Sidebar />
        <div class="page-wrapper">
            <div>
                <div class="row" id="row_dims">
                    <div class="col-xxl-12">
                        <div class="card">
                            <div class="card-body">
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs nav-tabs-top">
                                    <li class="nav-item"><a class="nav-link active" href="#top-tab1"
                                            data-bs-toggle="tab">Voir le
                                            sinistre
                                            expires</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#top-tab2" data-bs-toggle="tab">Voir les
                                            pièces</a>
                                    </li>
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane show active" id="top-tab1">
                                        <div class="row">
                                            <div class="col-12">
                                                <b-card>
                                                    <div>

                                                        <b-form>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <b-form-group id="type_contrat" label="Type de contrat:"
                                                                        label-for="type_contrat" description="">
                                                                        <b-form-input id="type_contrat"
                                                                            v-model="form.type_contrat" type="text"
                                                                            placeholder="Type de contrat" required
                                                                            readonly="" :modelValue="form.type_contrat">
                                                                        </b-form-input>
                                                                        <b-form-input id="id_contrat"
                                                                            v-model="form.id_contrat" type="hidden"
                                                                            placeholder="Type de contrat" required
                                                                            :modelValue="form.id_contrat"
                                                                            style="display:none">
                                                                        </b-form-input>
                                                                    </b-form-group>

                                                                    <b-form-group id="reference_compagnie"
                                                                        label="Reference compagnie:"
                                                                        label-for="reference_compagnie" description="">
                                                                        <b-form-input id="reference_compagnie"
                                                                            v-model="form.reference_compagnie" type="text"
                                                                            placeholder="Reference compagnie"
                                                                            :state="form.reference_compagnie.length >= 3">
                                                                        </b-form-input>
                                                                    </b-form-group>


                                                                    <b-form-group id="gestion_compagnie"
                                                                        label="Gestion compagnie:"
                                                                        label-for="gestion_compagnie" description="">
                                                                        <b-form-input id="gestion_compagnie"
                                                                            v-model="form.gestion_compagnie" type="text"
                                                                            placeholder="Gestion compagnie">
                                                                        </b-form-input>
                                                                    </b-form-group>

                                                                    <b-form-group id="numero_sinistre_agence"
                                                                        label="Numéro sinistre agence:"
                                                                        label-for="numero_sinistre_agence" description="">
                                                                        <b-form-input id="numero_sinistre_agence"
                                                                            v-model="form.numero_sinistre_agence"
                                                                            type="text"
                                                                            placeholder="Numéro sinistre agence">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                    <b-form-group id="garantie_applique"
                                                                        label="Garantie appliquée:"
                                                                        label-for="garantie_applique" description="">
                                                                        <b-form-input id="garantie_applique"
                                                                            v-model="form.garantie_applique" type="text"
                                                                            placeholder="Garantie appliquée">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                    <b-form-group id="lieu" label="Lieu:" label-for="lieu"
                                                                        description="">
                                                                        <b-form-input id="lieu" v-model="form.lieu"
                                                                            type="text" placeholder="Lieu">
                                                                        </b-form-input>
                                                                    </b-form-group>

                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <b-form-group id="materiel_corporel"
                                                                                label="Materiel / corporel:"
                                                                                label-for="materiel_corporel"
                                                                                description="">
                                                                                <b-form-input id="materiel_corporel"
                                                                                    v-model="form.materiel_corporel"
                                                                                    type="text"
                                                                                    placeholder="Materiel / corporel">
                                                                                </b-form-input>
                                                                            </b-form-group>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <b-form-group id="ipp" label="IPP:"
                                                                                label-for="ipp" description="">
                                                                                <b-form-input id="ipp" v-model="form.ipp"
                                                                                    type="text" placeholder="IPP">
                                                                                </b-form-input>
                                                                            </b-form-group>
                                                                        </div>
                                                                    </div>
                                                                    <b-form-group id="materiel_sinistre"
                                                                        label="Materiel sinistre:"
                                                                        label-for="materiel_sinistre" description="">
                                                                        <b-form-input id="materiel_sinistre"
                                                                            v-model="form.materiel_sinistre" type="text"
                                                                            placeholder="Materiel sinistre">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                </div>

                                                                <div class="col-md-6">
                                                                    <b-form-group id="date_survenance"
                                                                        label="Date de survenance:"
                                                                        label-for="date_survenance" description="">
                                                                        <b-form-input id="date_survenance"
                                                                            v-model="form.date_survenance" type="date"
                                                                            placeholder="Date de survenance">
                                                                        </b-form-input>
                                                                    </b-form-group>


                                                                    <b-form-group id="heure" label="Heure:"
                                                                        label-for="heure" description="">
                                                                        <b-form-input id="heure" v-model="form.heure"
                                                                            type="time" placeholder="Heure">
                                                                        </b-form-input>
                                                                    </b-form-group>


                                                                    <b-form-group id="date_ouverture"
                                                                        label="Date de ouverture:"
                                                                        label-for="date_ouverture" description="">
                                                                        <b-form-input id="date_ouverture"
                                                                            v-model="form.date_ouverture" type="date"
                                                                            placeholder="Date de ouverture">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                    <b-form-group id="date_declaration"
                                                                        label="Date declaration:"
                                                                        label-for="date_declaration" description="">
                                                                        <b-form-input id="date_declaration"
                                                                            v-model="form.date_declaration" type="date"
                                                                            placeholder="Date declaration">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                    <b-form-group id="date_declaration_compagnie"
                                                                        label="Date declaration compagnie:"
                                                                        label-for="date_declaration_compagnie"
                                                                        description="">
                                                                        <b-form-input id="date_declaration_compagnie"
                                                                            v-model="form.date_declaration_compagnie"
                                                                            type="date"
                                                                            placeholder="Date declaration compagnie">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                    <b-form-group id="date_mission" label="Date de mission:"
                                                                        label-for="date_mission" description="">
                                                                        <b-form-input id="date_mission"
                                                                            v-model="form.date_mission" type="date"
                                                                            placeholder="Date de mission">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <b-form-group id="recours" label="Recours:"
                                                                                label-for="recours" description="">
                                                                                <b-form-input id="recours"
                                                                                    v-model="form.recours" type="text"
                                                                                    placeholder="Recours">
                                                                                </b-form-input>
                                                                            </b-form-group>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <b-form-group id="expert" label="Expert:"
                                                                                label-for="expert" description="">
                                                                                <b-form-input id="expert"
                                                                                    v-model="form.expert" type="text"
                                                                                    placeholder="Expert">
                                                                                </b-form-input>
                                                                            </b-form-group>
                                                                        </div>
                                                                    </div>
                                                                    <b-form-group id="accident_adversaire"
                                                                        label="Accident/Adversaire:"
                                                                        label-for="accident_adversaire" description="">
                                                                        <b-form-input id="accident_adversaire"
                                                                            v-model="form.accident_adversaire" type="text"
                                                                            placeholder="Accident/Adversaire">
                                                                        </b-form-input>
                                                                    </b-form-group>
                                                                </div>

                                                            </div>

                                                            <b-form-textarea id="textarea" v-model="form.commentaire"
                                                                placeholder="Commentaire... au moins 10 caractères" rows="3"
                                                                max-rows="6" :state="form.commentaire.length >= 10">
                                                            </b-form-textarea>
                                                            <b-form-group class="mt-3 text-center">
                                                                <b-button type="button" variant="primary" class="m-3"
                                                                    @click="updateSinistre(id_sinistre)">Modifier
                                                                </b-button>
                                                            </b-form-group>

                                                        </b-form>
                                                    </div>
                                                </b-card>
                                                <!-- end row -->
                                            </div>
                                            <!-- end col -->
                                        </div>
                                        <!-- end row -->
                                    </div>
                                    <div class="tab-pane" id="top-tab2">
                                        <div class="card-body">
                                            <div class="live-preview">
                                                <b-card>

                                                    <div>
                                                        <template v-for="file in files" :key="file.id_fichier" class="row">
                                                            <!-- <a :href="'/images/piece_sinistres/' + file.nom_fichier"><img
                                                                :src="'/images/piece_sinistres/' + file.nom_fichier" alt=""
                                                                width="300" class="m-1 col-md-4"></a> -->


                                                            <iframe :src="'/images/piece_sinistres/' + file.nom_fichier"
                                                                frameborder="0" width="120" height="120"
                                                                class="col-md-9"></iframe>

                                                            <a :href="'/images/piece_sinistres/' + file.nom_fichier"
                                                                class="btn btn-sm btn-warning col-md-3"
                                                                target="_blank">Voir</a>

                                                        </template>

                                                    </div>
                                                </b-card>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end card-body -->
                        </div>
                        <!-- end card -->
                    </div>
                    <!--end col-->
                </div>



            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Form from 'vform'
export default {
    components: { Header, Sidebar },
    data() {
        return {
            // type_contrat: '',
            files: {},
            id_sinistre: "",
            form: new Form({
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
            }),
        }
    },
    methods: {
        viewSinistre() {
            let id = this.$route.params.id_sinistre;
            axios
                .get("/api/auth/get/sinistre?id=" + id)
                .then((response) => {
                    this.form.type_contrat = response.data.branche.nom_branche
                    this.form.id_contrat = response.data.contrat.id_contrat
                    this.form.reference_compagnie = response.data.sinistre.reference_compagnie
                    this.form.gestion_compagnie = response.data.sinistre.gestion_compagnie
                    this.form.numero_sinistre_agence = response.data.sinistre.numero_sinistre
                    this.form.garantie_applique = response.data.sinistre.garantie_applique
                    this.form.lieu = response.data.sinistre.lieu_sinistre
                    this.form.materiel_corporel = response.data.sinistre.materiel_sinistre
                    this.form.ipp = response.data.sinistre.ipp
                    this.form.date_survenance = response.data.sinistre.date_survenance
                    this.form.heure = response.data.sinistre.heure
                    this.form.date_ouverture = response.data.sinistre.date_ouverture
                    this.form.date_declaration = response.data.sinistre.date_declaration
                    this.form.date_declaration_compagnie = response.data.sinistre.date_decla_compagnie
                    this.form.date_mission = response.data.sinistre.date_mission
                    this.form.recours = response.data.sinistre.recours_sinistre
                    this.form.expert = response.data.sinistre.expert
                    this.form.accident_adversaire = response.data.sinistre.accident_sinistre
                    this.form.commentaire = response.data.sinistre.commentaire_sinistre


                    this.files = response.data.file_sinistre

                    this.id_sinistre = response.data.sinistre.id_sinistre



                })
                .catch((error) => console.log(error));

        },
        updateSinistre(id) {
            this.form.put('/api/auth/update/sinistre/' + id).then((response) => {
                console.log(response.data)
                this.$router.push("/listsinistre");
            })
        },
        fetchData() {
            const token = localStorage.getItem("token");

            // Configurez les en-têtes de la requête
            const headers = {
                Authorization: "Bearer " + token,
                "x-access-token": token,
            };
            axios
                .get("/api/auth/get/sinistres", { headers })
                .then((response) => {
                    // this.sinistres = response.data.sinistres;
                    // this.type_contrat = response.data.sinistres.type_contrat,
                    // this.form.id_contrat = response.data.sinistres.id_contrat,
                    // this.form.reference_compagnie = response.data.sinistres.reference_compagnie,
                    // this.form.gestion_compagnie = response.data.sinistres.gestion_compagnie,
                    // this.form.numero_sinistre_agence = response.data.sinistres.numero_sinistre_agence,
                    // this.form.garantie_applique = response.data.sinistres.garantie_applique,
                    // this.form.lieu = response.data.sinistres.lieu,
                    // this.form.materiel_corporel = response.data.sinistres.materiel_corporel,
                    // this.form.ipp = response.data.sinistres.ipp,
                    // this.form.date_survenance = response.data.sinistres.date_survenance,
                    // this.form.heure = response.data.sinistres.heure,
                    // this.form.date_ouverture = response.data.sinistres.date_ouverture,
                    // this.form.date_declaration = response.data.sinistres.date_declaration,
                    // this.form.date_declaration_compagnie = response.data.sinistres.date_declaration_compagnie,
                    // this.form.date_mission = response.data.sinistres.date_mission,
                    // this.form.recours = response.data.sinistres.recours,
                    // this.form.expert = response.data.sinistres.expert,
                    // this.form.accident_adversaire = response.data.sinistres.accident_adversaire,
                    // this.form.materiel_sinistre = response.data.sinistres.materiel_sinistre,
                    // this.form.commentaire = response.data.sinistres.commentaire,
                  
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        },
    },
    created() {
        this.fetchData();
        this.viewSinistre()
    },
}
</script>