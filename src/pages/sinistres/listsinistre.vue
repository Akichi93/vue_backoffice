<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Sinistres</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Sinistre
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row filter-row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <div class="add-emp-section">
              <router-link
                to="/createsinistre"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i>Ajouter sinistre</router-link
              >
              <!-- <a href="/creersinistre" class="btn btn-success btn-add-emp" style="width: auto;"><i
                                    class="fas fa-plus"></i>
                                Ajouter sinistre
                            </a> -->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher un sinistre"
              v-model="q"
              @keyup="searchtask"
            />
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>N° de police</th>
                    <th>Nom du client</th>
                    <th>Référence compagnie</th>
                    <th>N° sinsitre agence</th>
                    <th>Branche</th>
                    <th>Date de survenance</th>
                    <th>Date d'ouverture</th>
                    <!-- <th>Dossier cloturé</th> -->
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(sinistre, i) in sinistres" :key="i">
                    <tr>
                      <td>
                        {{ sinistre.contrat.numero_police }}
                      </td>
                      <td>{{ sinistre.client.nom_client }}</td>
                      <td>{{ sinistre.reference_compagnie }}</td>
                      <td>{{ sinistre.numero_sinistre_agence }}</td>
                      <td>{{ sinistre.branche.nom_branche }}</td>
                      <td>{{ sinistre.date_survenance }}</td>
                      <td>{{ sinistre.date_ouverture }}</td>

                      <td class="text-end ico-sec d-flex justify-content-end">
                        <button
                          @click="updateSinistreStatus(sinistre.uuidSinistre)"
                          type="button"
                          class="btn"
                        >
                          <i
                            :class="
                              sinistre.etat == 0
                                ? 'fa fa-toggle-off'
                                : 'fa fa-toggle-on'
                            "
                          ></i>
                          <span
                            :class="
                              sinistre.etat == 0
                                ? 'badge badge-pill bg-secondary'
                                : 'badge badge-pill bg-success'
                            "
                          >
                            {{ sinistre.etat == 0 ? "En cours" : "Terminé" }}
                          </span>
                        </button>

                        <router-link
                          v-if="sinistre.etat == 0"
                          :to="{
                            name: 'voirsinistre',
                            params: { uuidSinistre: sinistre.uuidSinistre },
                          }"
                          ><i class="fas fa-eye"></i
                        ></router-link>

                        <router-link
                          :to="{
                            name: 'editsinistre',
                            params: { uuidSinistre: sinistre.uuidSinistre },
                          }"
                          ><i class="fas fa-pen"></i
                        ></router-link>

                        <router-link
                          :to="{
                            name: 'reglement',
                            params: { uuidSinistre: sinistre.uuidSinistre },
                          }"
                          ><i class="fas fa-file"></i
                        ></router-link>

                        <a
                          href="#"
                          @click="addPiece(sinistre.uuidSinistre)"
                          v-if="sinistre.etat == 0"
                          title="Ajouter pièce"
                          ><i class="fas fa-plus"></i>
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
</template>

<script>
import axios from "axios";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Form from "vform";
import { HasError } from "vform/src/components/bootstrap5";
import Multiselect from "@vueform/multiselect";

import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    Multiselect,
    HasError,
    Header,
    Sidebar,
  },

  data() {
    return {
      form: Form.make({
        id_sinistre: "",
        titre: "",
        file: null,
      }),
      value: null,
      sinistres: {},
      q: "",
      sinistretoedit: "",
      roles: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async updateSinistreStatus(uuidSinistre) {
      await switchService.updateSinistreStatus(uuidSinistre);

      toaster.success(`Etat changé`, {
        position: "top-right",
      });

      this.fetchData();
    },

    getSinistre(id_sinistre) {
      axios
        .get("/api/auth/sinistres/edit/" + id_sinistre)
        .then((response) => {
          this.sinistretoedit = response.data;
        })
        .catch((error) => console.log(error));
    },

    async fetchData() {
      this.sinistres = await switchService.getSinistre();
    },

    addPiece(id) {
      // alert($('#createUserLabel').html())
      window.$("#addPiece").modal("show");
      this.form.id_sinistre = id;
      // window.location.href = '/edit/sinistre/' + id
    },

    deleteSinistre() {
      axios
        .patch(
          "/api/auth/sinistres/supprime/" + this.sinistretoedit.id_sinistre
        )
        .then((response) => {
          this.fetchData();
          if (response.status === 200) {
            toaster.success(`Sinistre supprimé avec succes`, {
              position: "top-right",
            });
          }
        })
        .catch((error) => console.log(error));
    },

    createPiece(e) {
      console.log("selected file", e.target.files[0]);
      this.image = e.target.files[0];

      let fd = new FormData();
      fd.append("img", this.image);
      axios.post("/add/piece", fd).then((res) => {
        console.log(res.data);
        window.location.href = "/sinistres";
      });
    },

    handleFile(event) {
      // We'll grab just the first file...
      // You can also do some client side validation here.
      const file = event.target.files[0];

      // Set the file object onto the form...
      this.form.file = file;
      // this.form.id_sinistre = file
      // php artisan make:migration create_item_order_table --create="item_order" file_sinistres
    },

    async submit() {
      const response = await this.form
        .post("/add/piece", {})
        .then((res) => {
          console.log(res.data.id_sinistre);
          window.$("#addPiece").modal("hide");
          this.$toast.success("Pièce ajoutée avec succès", {
            // override the global option
            position: "top-right",
          });
          this.form.reset();
          // this.form.file = ''
        })
        .catch(() => {
          this.$toast.error("Ajout Impossible, Veuillez ressayez plutard", {
            // override the global option
            position: "top-right",
          });
        });
    },

    searchtask() {
      axios
        .get("/get/sinistres/" + this.q)
        .then((response) => (this.sinistres = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
.page-head-box {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

.breadcrumb {
  background: transparent;
}

.table thead th {
  background-color: #343a40;
  color: #fff;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-info,
.btn-warning,
.btn-primary,
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
}

.btn-info i,
.btn-warning i,
.btn-primary i,
.btn-danger i {
  margin-right: 0;
}
</style>
