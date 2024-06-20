<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid pb-0">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Relance</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Relance
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
                    href="#emp_profile"
                    data-bs-toggle="tab"
                    class="nav-link active"
                    >Relance</a
                  >
                </li>
                <li class="nav-item">
                  <a href="#emp_projects" data-bs-toggle="tab" class="nav-link"
                    >Expiration dans 1 mois</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#bank_statutory"
                    data-bs-toggle="tab"
                    class="nav-link"
                    >Expiration dans 2 mois</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div id="emp_profile" class="pro-overview tab-pane fade show active">
            <div class="row filter-row">
              <div class="col-md-8"></div>
              <div class="col-md-4">
                <div class="add-emp-section">
                  <a
                    href="/createrelance"
                    class="btn btn-success btn-add-emp"
                    style="width: auto"
                    ><i class="fas fa-plus"></i>
                    Ajouter relance
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
                        <th>Date</th>
                        <th>Types</th>
                        <th>Objet</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="relance in relances"
                        :key="relance.id_relance"
                      >
                        <tr>
                          <td v-text="relance.date_relance"></td>
                          <td v-text="relance.type"></td>
                          <td v-text="relance.objet"></td>
                          <td
                            class="text-end ico-sec d-flex justify-content-end"
                          >
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_department"
                              @click="getRelance(relance.id_relance)"
                              title="Modifier"
                              ><i class="fas fa-pen"></i>
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

          <div class="tab-pane fade" id="emp_projects">
            <div class="row">
              <div class="col-md-12">
                <div>
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>N de police</th>
                        <th>Branche</th>
                        <th>Compagnie</th>
                        <th>Nom du client</th>
                        <th>Prime nette</th>
                        <th>Prime TTC</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Date d'expiration</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="first in firsts" :key="first.id_contrat">
                        <tr>
                          <td v-text="first.numero_police"></td>
                          <td v-text="first.nom_branche"></td>
                          <td v-text="first.nom_compagnie"></td>
                          <td v-text="first.nom_client"></td>
                          <td v-text="first.prime_nette"></td>
                          <td v-text="first.primes_ttc"></td>
                          <td v-text="first.contact_client"></td>
                          <td v-text="first.email_client"></td>
                          <td v-text="first.adresse_client"></td>
                          <td v-text="first.expire_le"></td>
                          <td
                            class="text-end ico-sec d-flex justify-content-end"
                          >
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_department"
                              title="Envoyer"
                              ><i class="fas fa-phone"></i>
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_department"
                              title="Envoyer"
                              ><i class="fas fa-envelope"></i>
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

          <div class="tab-pane fade" id="bank_statutory">
            <div class="row">
              <div class="col-md-12">
                <div>
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>N de police</th>
                        <th>Branche</th>
                        <th>Compagnie</th>
                        <th>Nom du client</th>
                        <th>Prime nette</th>
                        <th>Prime TTC</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Date d'expiration</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="second in seconds"
                        :key="second.id_contrat"
                      >
                        <tr>
                          <td v-text="second.numero_police"></td>
                          <td v-text="second.nom_branche"></td>
                          <td v-text="second.nom_compagnie"></td>
                          <td v-text="second.nom_client"></td>
                          <td v-text="second.prime_nette"></td>
                          <td v-text="second.primes_ttc"></td>
                          <td v-text="second.contact_client"></td>
                          <td v-text="second.email_client"></td>
                          <td v-text="second.adresse_client"></td>
                          <td v-text="second.expire_le"></td>
                          <td
                            class="text-end ico-sec d-flex justify-content-end"
                          >
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_department"
                              title="Envoyer"
                              ><i class="fas fa-phone"></i>
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_department"
                              title="Envoyer"
                              ><i class="fas fa-envelope"></i>
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
import axios from "axios";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import switchService from "../../services/switchService";
export default {
  name: "relance",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      value: null,
      clients: {},
      users_team: [],
      message: "",
      date_relance: "",
      types: "",
      relances: {},
      firsts: {},
      seconds: {},
      periodes: ["1 semaine", "2 semaines", "1 mois"],
      valeurs: ["Echeances", "Tous les clients", "Certains clients"],
      objets: ["AVIS ECHANCE AUTO", "AVIS d'ECHEANCE INDIVIDUEL ACCIDENT"],
      objet: "",
      periode: "",
    };
  },
  created() {
    this.getClients();
    this.getContratOneExpire();
    this.getContratTwoExpire();
    this.getRelance();
  },
  // mounted() {
  //   this.fetchTask();
  // },
  methods: {
    getRelance(id_relance) {
      axios
        .get("/api/auth/editRelance/" + id_relance)
        .then((response) => {
          this.relancetoedit = response.data;
        })
        .catch((error) => console.log(error));
    },
    async getClients() {
      this.clients = await switchService.getClients();
    },

    async getContratOneExpire() {
      this.clients = await switchService.getContratsOneExpire();
    },

    async getContratTwoExpire() {
      this.clients = await switchService.getContratsTwoExpire();
    },

    async getRelance(){

    },

    // fetchTask() {
    //   var that = this;
    //   const token = localStorage.getItem("token");

    //   // Configurez les en-têtes de la requête
    //   const headers = {
    //     Authorization: "Bearer " + token,
    //     "x-access-token": token,
    //   };
    //   axios
    //     .all([
    //       axios.get("/api/auth/getRelance", { headers }),
    //       axios.get("/api/auth/getOneExpiration", { headers }),
    //       axios.get("/api/auth/getTwoExpiration", { headers }),
    //     ])
    //     .then(
    //       axios.spread(function (relances, firsts, seconds) {
    //         that.relances = relances.data;
    //         that.firsts = firsts.data;
    //         that.seconds = seconds.data;
    //       })
    //     );
    // },
  },
};
</script>
