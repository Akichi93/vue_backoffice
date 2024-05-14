<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Accident individuel</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Accident individuel
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
                to="/createaccident"
                class="btn btn-success btn-add-emp"
                style="width: auto"
              >
                <i class="fas fa-plus"></i>Ajouter</router-link
              >
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher une tarification"
            />
          </div>
          <div
            class="col-md-12"
            style="display: flex; justify-content: end"
          ></div>
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom du prospect</th>
                    <th>Profession</th>
                    <th>Compagnie</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(tarification, i) in tarifications" :key="i">
                    <tr>
                      <td v-text="tarification.nom_complet"></td>
                      <td
                        v-text="tarification.tarificateuraccident.activite"
                      ></td>
                      <td v-text="tarification.compagnie.nom_compagnie"></td>
                      <td class="text-end ico-sec d-flex justify-content-end">
                        <a
                          @click="
                            viewFacture(tarification.uuidTarificationAccident)
                          "
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_facture"
                          title="Voir la facture"
                        >
                          <i class="fas fa-eye"></i>
                        </a>

                        <!-- <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_test"
                          title="Voir la facture"
                        >
                          <i class="fas fa-eye"></i>
                        </a> -->
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <factureTarifacticationAccident v-bind:facturetoedit="facturetoedit"></factureTarifacticationAccident>
            <!-- <viewTest></viewTest> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import AppStorage from "../../db/AppStorage";
import factureTarifacticationAccident from './factureTarifacticationAccident.vue';
import viewTest from "./viewTest.vue";

export default {
  name: "listprospect",
  components: {
    Header,
    Sidebar,
    factureTarifacticationAccident,
    viewTest
  },
  data() {
    return {
      value: null,
      tarifications: [],
      facturetoedit: "",
    };
  },
  created() {
    this.getTarification();
  },

  methods: {
    async getTarification() {
      AppStorage.getTarificationAccidents().then((result) => {
        this.tarifications = result;
      });
    },
    async viewFacture(uuidTarificationAccident) {
      this.facturetoedit = await AppStorage.getFactureAccident(
        uuidTarificationAccident
      );
      console.log(this.facturetoedit)
    },
  },
};
</script>
    