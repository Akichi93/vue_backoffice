<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Stat apporteur</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Stat apporteur
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Code</th>
                    <th>Adresse</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(apporteur, index) in apporteurs" :key="index">
                    <tr>
                      <td>
                        <router-link :to="{
                          name: 'infoapporteur',
                          params: { id_apporteur: apporteur.id_apporteur },

                        }" style=" color: #007bff;">{{ apporteur.nom_apporteur }}</router-link>
                      </td>
                      <td>
                        {{ apporteur.email_apporteur }}
                      </td>
                      <td>
                        {{ apporteur.contact_apporteur }}
                      </td>
                      <td>
                        {{ apporteur.code_apporteur }}
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
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
export default {
  name: "statapporteur",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      apporteurs: {},
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
        .get("/api/auth/statapporteur", { headers })
        .then((response) => {
          this.apporteurs = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },
  },
};
</script>
