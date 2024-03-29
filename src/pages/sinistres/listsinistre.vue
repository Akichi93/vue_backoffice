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
                    <th>Dossier cloturé</th>
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
                      <td>{{ sinistre.numero_sinistre }}</td>
                      <td>{{ sinistre.branche.nom_branche }}</td>
                      <td>{{ sinistre.date_survenance }}</td>
                      <td>{{ sinistre.date_ouverture }}</td>
                      <td
                        class="text-end ico-sec d-flex justify-content-end"
                        v-if="sinistre.etat == 1"
                      >
                        <button
                          @click="updateSinistreStatus(sinistre.uuidSinistre)"
                          type="button"
                          class="btn"
                        >
                          <i class="fa fa-toggle-on"></i
                          ><span class="badge badge-pill bg-success"
                            >En cours</span
                          >
                        </button>
                        <span class="badge badge-pill bg-danger">Termine</span>
                      </td>
                      <td v-else>
                        <button
                          @click="updateSinistreStatus(sinistre.uuidSinistre)"
                          href="#"
                          class="btn"
                        >
                          <i class="fa fa-toggle-off"></i
                          ><span class="badge badge-pill bg-success"
                            >En cours</span
                          >
                        </button>
                      </td>
                      <td class="text-end ico-sec d-flex justify-content-end">
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

        <div class="modal custom-modal fade" id="delete_sinistre" role="dialog">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <div class="form-header">
                  <h3>Supprimer sinistre</h3>
                  <p>Voulez vous supprimer le sinistre?</p>
                </div>
                <div class="modal-btn delete-action">
                  <div class="row">
                    <div class="col-6">
                      <a
                        href="javascript:void(0);"
                        class="btn btn-primary continue-btn"
                        data-bs-dismiss="modal"
                        @click="deleteSinistre"
                        >supprimer</a
                      >
                    </div>
                    <div class="col-6">
                      <a
                        href="javascript:void(0);"
                        data-bs-dismiss="modal"
                        class="btn btn-primary cancel-btn"
                        >Annuler</a
                      >
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
import axios from "axios";
import AppStorage from "../../db/AppStorage";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Form from "vform";
import { HasError } from "vform/src/components/bootstrap5";
import Multiselect from "@vueform/multiselect";

import { createToaster } from "@meforma/vue-toaster";
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
    updateSinistreStatus(id) {
      axios
        .put("/api/auth/update-sinistre-status/" + id)
        .then((response) => {
          this.fetchData();
          console.log(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },

    getSinistre(id_sinistre) {
      axios
        .get("/api/auth/sinistres/edit/" + id_sinistre)
        .then((response) => {
          this.sinistretoedit = response.data;
        })
        .catch((error) => console.log(error));
    },

    fetchData() {
      AppStorage.getSinistres().then((result) => {
        this.sinistres = result;
      });
      // const token = localStorage.getItem("token");

      // // Configurez les en-têtes de la requête
      // const headers = {
      //     Authorization: "Bearer " + token,
      //     "x-access-token": token,
      // };
      // axios
      //     .get("/api/auth/get/sinistres", { headers })
      //     .then((response) => {
      //         this.sinistres = response.data;
      //     })
      //     .catch((error) => {
      //         this.loading = false;
      //         this.error = error.response.data.message || error.message;
      //     });
    },

    // editSinistre(id) {
    //     // alert(id)
    //     window.location.href = "/edit/sinistre?sinistre=" + id;
    // },

    // voirSinistre(id) {
    //     // alert(id)
    //     window.location.href = "/voir/sinistre?sinistre=" + id;
    // },

    // addReglement(id) {
    //     // alert(id)
    //     window.location.href = "/addreglement?sinistre=" + id;
    // },

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

<style src="@vueform/multiselect/themes/default.css"></style>
