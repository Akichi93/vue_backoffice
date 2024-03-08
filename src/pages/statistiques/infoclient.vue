<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Detail du client</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="">Tableau de bord</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Detail du client
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
                          <li>
                            <div class="title">Nom:</div>
                            <div class="text">{{ clients.nom_client }}</div>
                          </li>
                          <li>
                            <div class="title">Profession:</div>
                            <div class="text">
                              {{ clients.profession_client }}
                            </div>
                          </li>
                          <li>
                            <div class="title">Date d'ajout:</div>
                            <div class="text">{{ clients.created_at }}</div>
                          </li>
                          <li>
                            <div class="title">Adresse:</div>
                            <div class="text">{{ clients.adresse_client }}</div>
                          </li>
                          <li>
                            <div class="title">Contact:</div>
                            <div class="text">{{ clients.tel_client }}</div>
                          </li>
                          <li>
                            <div class="title">Postal:</div>
                            <div class="text">
                              {{ clients.postal_client }}
                            </div>
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
                <li class="nav-item">
                  <a
                    href="#emp_profile"
                    data-bs-toggle="tab"
                    class="nav-link active"
                    >Contrats</a
                  >
                </li>
                <li class="nav-item">
                  <a href="#emp_projects" data-bs-toggle="tab" class="nav-link"
                    >Sinistres</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div id="emp_profile" class="pro-overview tab-pane fade show active">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Type de contrat</th>
                        <th>Numéro de police</th>
                        <th>Souscrit le</th>
                        <th>Expire le</th>
                        <th style="width: 120px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(contrat, index) in listescontrats"
                        :key="index"
                      >
                        <tr>
                          <td>
                            <h5 v-text="contrat.nom_branche"></h5>
                          </td>
                          <td v-text="contrat.numero_police"></td>
                          <td v-text="contrat.souscrit_le"></td>
                          <td v-text="contrat.expire_le"></td>

                          <td>
                            <router-link
                              v-if="contrat.id_contrat == 2"
                              class="btn btn-sm btn-white text-primary me-2"
                              :to="{
                                name: 'infocontrat',
                                params: { id_contrat: contrat.id_contrat },
                              }"
                              ><i
                                class="ri-eye-fill me-2 align-bottom text-muted"
                                >Details</i
                              ></router-link
                            >
                            <router-link
                              v-else
                              class="btn btn-sm btn-white text-primary me-2"
                              :to="{
                                name: 'infocontrat',
                                params: { id_contrat: contrat.id_contrat },
                              }"
                              ><i
                                class="ri-eye-fill me-2 align-bottom text-muted"
                                >Details</i
                              ></router-link
                            >
                          </td>
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
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Numéro de police</th>
                        <th scope="col">Date de survenance</th>
                        <th scope="col">Date declaration compagnie</th>
                        <th scope="col">Lieu sinistre</th>
                        <th scope="col" style="width: 120px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(sinistre, index) in listesinistres"
                        :key="index"
                      >
                        <tr>
                          <td>
                            <h5 v-text="sinistre.numero_police"></h5>
                          </td>
                          <td v-text="sinistre.date_survenance"></td>
                          <td v-text="sinistre.date_declaration"></td>
                          <td v-text="sinistre.lieu_sinistre"></td>
                          <td>
                            <a
                              href=""
                              class="btn btn-sm btn-white text-primary me-2"
                              ><i class="far fa-edit me-2">Details</i>
                            </a>
                          </td>
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
    </div>
  </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
export default {
  name: "statclient",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      clients: {},
      listescontrats: {},
      listesinsitres: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      axios
        .get(`/api/auth/detailsclient/${this.$route.params.id_client}`, {
          headers,
        })
        // .get("/api/auth/getAvenantContrat/${this.$route.params.id_contrat}, { headers })
        .then((response) => {
          this.clients = response.data.clients;
          this.listescontrats = response.data.listescontrats;
          this.listesinsitres = response.data.listesinsitres;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },
  },
};
</script>