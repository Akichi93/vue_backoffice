<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div>
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div id="customerList">
                  <div class="row g-4 mb-3">
                    <div class="col-sm-auto">
                      <div>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#addReglement"
                          class="btn btn-success"
                          ><i class="ri-add-line align-bottom me-1"></i> Ajouter
                          reglement</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->

        <div class="row">
          <!-- end col -->

          <div class="col-md-12">
            <div class="card">
              <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Reversements</h4>
              </div>
              <!-- end card header -->

              <div class="card-body">
                <div class="live-preview">
                  <div class="table-responsive">
                    <table
                      class="table table-striped table-nowrap align-middle mb-0"
                    >
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Mode</th>
                          <th scope="col">Beneficiaire</th>
                          <th scope="col">Type de reglement</th>
                          <th scope="col">Montant</th>
                          <!-- <th scope="col">Actions</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <template
                          v-for="reglement in reglements"
                          :key="reglement.uuiReglement"
                        >
                          <tr>
                            <td>{{ reglement.date }}</td>
                            <td>{{ reglement.mode }}</td>
                            <td>{{ reglement.nom }}</td>
                            <td>{{ reglement.type }}</td>
                            <td>{{ formatMontant(reglement.montant) }}</td>
                          </tr>
                        </template>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th id="total" colspan="4">Total reversé :</th>
                          <td>
                            {{ sommes }}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <!-- end card-body -->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>

        <addReglement @reglement-add="refresh"></addReglement>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import addReglement from "./addReglement.vue";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import { createToaster } from "@meforma/vue-toaster";
import { formatNumberWithThousandsSeparator } from "../../utils/helpers/thousandSeparator";
import AppStorage from "../../db/AppStorage";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    Header,
    Sidebar,
    addReglement,
  },
  data() {
    return {
      value: null,
      //   referents: {},
      reglements: {},
      sommes: "",
      reglements_compagnies: {},
      //   reglements_compagnie_sum: "",
      //   reglements_client_sum: "",
      modes: ["Espèces", "Carte", "Chèques"],
    };
  },

  methods: {
    formatMontant(montant) {
      return formatNumberWithThousandsSeparator(montant);
    },
    async getReglement() {
      const uuidSinistre = this.$route.params.uuidSinistre;

      const reglements = await AppStorage.getReglementsByUuidSinistre(
        uuidSinistre
      );

      this.reglements = reglements;
    },

    async getSomme() {
      const uuidSinistre = this.$route.params.uuidSinistre;

      const reglements = await AppStorage.getSommeReglementsByUuidSinistre(
        uuidSinistre
      );

     
      const nombreFormate = formatNumberWithThousandsSeparator(
        nombre,
        "fr-FR",
        { style: "decimal" }
      );

      this.sommes = nombreFormate;
    },

    async refresh() {
      const uuidSinistre = this.$route.params.uuidSinistre;
      AppStorage.getReglementsByUuidSinistre(uuidSinistre).then((result) => {
        this.reglements = result;
      });
      await this.getSomme();
    },
  },
  created() {
    // this.fetchData();
    this.getReglement();
    this.getSomme();
  },
};
</script>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
