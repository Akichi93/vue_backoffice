<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Supprimés</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/home">Tableau de bord</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Supprimés
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="card tab-box mt-3">
          <div class="row user-tabs">
            <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul class="nav nav-tabs nav-tabs-bottom pt-3 pb-2">
                <li class="nav-item">
                  <a
                    href="#client_tab"
                    data-bs-toggle="tab"
                    class="nav-link active"
                    >Clients</a
                  >
                </li>

                <li class="nav-item">
                  <a href="#emp_profile" data-bs-toggle="tab" class="nav-link"
                    >Prospects</a
                  >
                </li>

                <li class="nav-item">
                  <a href="#branche_tab" data-bs-toggle="tab" class="nav-link"
                    >Branches</a
                  >
                </li>

                <li class="nav-item">
                  <a href="#apporteurs" data-bs-toggle="tab" class="nav-link"
                    >Apporteurs</a
                  >
                </li>

                <li class="nav-item">
                  <a
                    href="#bank_statutory"
                    data-bs-toggle="tab"
                    class="nav-link"
                    >Compagnies</a
                  >
                </li>

                <li class="nav-item">
                  <a href="#contrats_tab" data-bs-toggle="tab" class="nav-link"
                    >Contrats</a
                  >
                </li>

                <li class="nav-item">
                  <a href="#sinistres_tab" data-bs-toggle="tab" class="nav-link"
                    >Sinistres</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tab-content">
          <div id="client_tab" class="pro-overview tab-pane fade show active">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Clients</h3>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>Nom du client</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Profession</th>
                                <th>Adresse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(client, index) in clients"
                                :key="index"
                              >
                                <tr>
                                  <td>
                                    {{ client.nom_client }}
                                  </td>
                                  <td>
                                    {{ client.email_client }}
                                  </td>
                                  <td>
                                    {{ client.tel_client }}
                                  </td>
                                  <td>
                                    {{ client.profession_client }}
                                  </td>
                                  <td>
                                    {{ client.adresse_client }}
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

          <div id="emp_profile" class="pro-overview tab-pane fade show">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Prospects</h3>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>Nom du client</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Profession</th>
                                <th>Adresse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(prospect, index) in prospects"
                                :key="index"
                              >
                                <tr>
                                  <td>
                                    {{ prospect.nom_prospect }}
                                  </td>
                                  <td>
                                    {{ prospect.email_prospect }}
                                  </td>
                                  <td>
                                    {{ prospect.tel_prospect }}
                                  </td>
                                  <td>
                                    {{ prospect.profession_prospect }}
                                  </td>
                                  <td>
                                    {{ prospect.adresse_prospect }}
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

          <div id="branche_tab" class="pro-overview tab-pane fade show">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Branches</h3>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Nom de la branche</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(branche, index) in branches"
                                :key="index"
                              >
                                <tr>
                                  <td>
                                    {{ branche.id_branche }}
                                  </td>
                                  <td>
                                    {{ branche.nom_branche }}
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

          <div class="tab-pane fade" id="apporteurs">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Apporteurs</h3>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>Nom de l'apporteur</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Postal</th>
                                <th>Adresse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(apporteur, index) in apporteurs"
                                :key="index"
                              >
                                <tr>
                                  <td>
                                    {{ apporteur.nom_apporteur }}
                                  </td>
                                  <td>
                                    {{ apporteur.email_apporteur }}
                                  </td>
                                  <td>
                                    {{ apporteur.contact_apporteur }}
                                  </td>
                                  <td>
                                    {{ apporteur.postal_apporteur }}
                                  </td>
                                  <td>
                                    {{ apporteur.adresse_apporteur }}
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

          <div class="tab-pane fade" id="bank_statutory">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Compagnies</h3>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>Nom de la compagnie</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Postal</th>
                                <th>Adresse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(compagnie, index) in compagnies"
                                :key="index"
                              >
                                <tr>
                                  <td>
                                    {{ compagnie.nom_compagnie }}
                                  </td>
                                  <td>
                                    {{ compagnie.email_compagnie }}
                                  </td>
                                  <td>
                                    {{ compagnie.contact_companie }}
                                  </td>
                                  <td>
                                    {{ compagnie.postal_compagnie }}
                                  </td>
                                  <td>
                                    {{ compagnie.adresse_compagnie }}
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

          <div class="tab-pane fade" id="contrats_tab">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Contrats</h3>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>Numero de police</th>
                                <th>Nom de la compagnie</th>
                                <th>Nom du client</th>
                                <th>Nom de l'apporteur</th>
                                <th>Expire le</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(contrat, index) in contrats"
                                :key="index"
                              >
                                <tr>
                                  <td>
                                    {{ contrat.numero_police }}
                                  </td>
                                  <td>
                                    {{ contrat.nom_compagnie }}
                                  </td>
                                  <td>
                                    {{ contrat.nom_client }}
                                  </td>
                                  <td>
                                    {{ contrat.nom_apporteur }}
                                  </td>
                                  <td>
                                    {{ contrat.expire_le }}
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

          <div class="tab-pane fade" id="sinistres_tab">
            <div class="row">
              <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                  <div class="card-body">
                    <h3 class="card-title">Sinistres</h3>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="table-responsive">
                          <table class="table table-striped custom-table mb-0">
                            <thead>
                              <tr>
                                <th>Numero e police</th>
                                <th>Date de survenance</th>
                                <th>Heure</th>
                                <th>Date de declaration</th>
                                <th>Date d'ouverture</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template v-for="(sinistre, index) in sinistres"
                                :key="index">
                                <td v-text="sinistre.numero_police"></td>
                                <td v-text="sinistre.date_survenance"></td>
                                <td v-text="sinistre.contact_companie"></td>
                                <td v-text="sinistre.postal_compagnie"></td>
                                <td v-text="sinistre.adresse_compagnie"></td>
                              </template>
                              <tr></tr>
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
      prospects: {},
      branches: {},
      apporteurs: {},
      compagnies: {},
      contrats: {},
      sinistres: {},
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
        .get("/api/auth/statsupprime", { headers })
        .then((response) => {
          this.clients = response.data.clients;
          this.prospects = response.data.prospects;
          this.branches = response.data.branches;
          this.apporteurs = response.data.apporteurs;
          this.compagnies = response.data.compagnies;
          this.contrats = response.data.contrats;
          this.sinistres = response.data.sinistres;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },
  },
};
</script>