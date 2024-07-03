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
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#top-tab1"
                      data-bs-toggle="tab"
                      >Voir le sinistre expires</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#top-tab2" data-bs-toggle="tab"
                      >Voir les pièces</a
                    >
                  </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                  <div class="tab-pane show active" id="top-tab1">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div class="card-body">
                            <form>
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="type_contrat"
                                      >Type de contrat:</label
                                    >
                                    <input
                                      id="type_contrat"
                                      class="form-control"
                                      type="text"
                                      v-model="branches"
                                      required
                                      readonly
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="reference_compagnie"
                                      >Reference compagnie:</label
                                    >
                                    <input
                                      id="reference_compagnie"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.reference_compagnie"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="gestion_compagnie"
                                      >Gestion compagnie:</label
                                    >
                                    <input
                                      id="gestion_compagnie"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.gestion_compagnie"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="numero_sinistre_agence"
                                      >Numéro sinistre agence:</label
                                    >
                                    <input
                                      id="numero_sinistre_agence"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.numero_sinistre_agence"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="garantie_applique"
                                      >Garantie appliquée:</label
                                    >
                                    <input
                                      id="garantie_applique"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.garantie_applique"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="lieu">Lieu:</label>
                                    <input
                                      id="lieu"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.lieu"
                                    />
                                  </div>

                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label for="materiel_corporel"
                                          >Materiel / corporel:</label
                                        >
                                        <input
                                          id="materiel_corporel"
                                          class="form-control"
                                          type="text"
                                          v-model="sinistres.materiel_corporel"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label for="ipp">IPP:</label>
                                        <input
                                          id="ipp"
                                          class="form-control"
                                          type="text"
                                          v-model="sinistres.ipp"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="form-group">
                                    <label for="materiel_sinistre"
                                      >Materiel sinistre:</label
                                    >
                                    <input
                                      id="materiel_sinistre"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.materiel_sinistre"
                                    />
                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="date_survenance"
                                      >Date de survenance:</label
                                    >
                                    <input
                                      id="date_survenance"
                                      class="form-control"
                                      type="date"
                                      v-model="sinistres.date_survenance"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="heure">Heure:</label>
                                    <input
                                      id="heure"
                                      class="form-control"
                                      type="time"
                                      v-model="sinistres.heure"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="date_ouverture"
                                      >Date de ouverture:</label
                                    >
                                    <input
                                      id="date_ouverture"
                                      class="form-control"
                                      type="date"
                                      v-model="sinistres.date_ouverture"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="date_declaration"
                                      >Date declaration:</label
                                    >
                                    <input
                                      id="date_declaration"
                                      class="form-control"
                                      type="date"
                                      v-model="sinistres.date_declaration"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="date_declaration_compagnie"
                                      >Date declaration compagnie:</label
                                    >
                                    <input
                                      id="date_declaration_compagnie"
                                      class="form-control"
                                      type="date"
                                      v-model="
                                        sinistres.date_declaration_compagnie
                                      "
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label for="date_mission"
                                      >Date de mission:</label
                                    >
                                    <input
                                      id="date_mission"
                                      class="form-control"
                                      type="date"
                                      v-model="sinistres.date_mission"
                                    />
                                  </div>

                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label for="recours">Recours:</label>
                                        <input
                                          id="recours"
                                          class="form-control"
                                          type="text"
                                          v-model="sinistres.recours"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label for="expert">Expert:</label>
                                        <input
                                          id="expert"
                                          class="form-control"
                                          type="text"
                                          v-model="sinistres.expert"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="form-group">
                                    <label for="accident_adversaire"
                                      >Accident/Adversaire:</label
                                    >
                                    <input
                                      id="accident_adversaire"
                                      class="form-control"
                                      type="text"
                                      v-model="sinistres.accident_adversaire"
                                    />
                                  </div>
                                </div>
                              </div>

                              <textarea
                                id="textarea"
                                class="form-control"
                                v-model="sinistres.commentaire"
                                rows="3"
                                style="resize: none"
                              ></textarea>
                              <div class="text-center mt-3">
                                <button
                                  type="button"
                                  class="btn btn-primary m-3"
                                  @click="updateSinistre"
                                >
                                  Modifier
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <!-- end card -->
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
                            <template
                              v-for="file in files"
                              :key="file.id_fichier"
                            >
                              <!-- <a :href="'/images/piece_sinistres/' + file.nom_fichier"><img
                                                                :src="'/images/piece_sinistres/' + file.nom_fichier" alt=""
                                                                width="300" class="m-1 col-md-4"></a> -->

                              <iframe
                                :src="
                                  '/images/piece_sinistres/' + file.nom_fichier
                                "
                                frameborder="0"
                                width="120"
                                height="120"
                                class="col-md-9"
                              ></iframe>

                              <a
                                :href="
                                  '/images/piece_sinistres/' + file.nom_fichier
                                "
                                class="btn btn-sm btn-warning col-md-3"
                                target="_blank"
                                >Voir</a
                              >
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
import switchService from "../../services/switchService";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {
  components: { Header, Sidebar },
  data() {
    return {
      // type_contrat: '',
      files: {},
      sinistres: "",
      branches: "",
      id_sinistre: "",
    };
  },
  methods: {
    async viewSinistre() {
      const uuidSinistre = this.$route.params.uuidSinistre;

      const sinistres = await switchService.getInfoSinistreByUuid(uuidSinistre);

      this.branches = sinistres.branche.nom_branche;

      this.sinistres = sinistres;
    },

    async updateSinistre() {
      const uuidSinistreToUpdate = this.$route.params.uuidSinistre;
      
      await switchService.updateSinistre(uuidSinistreToUpdate, this.sinistres);

      toaster.success(`Sinistre modifié`, { position: "top-right" });

      this.$router.push("/listsinistre");
    },
  },
  created() {
    this.viewSinistre();
  },
};
</script>