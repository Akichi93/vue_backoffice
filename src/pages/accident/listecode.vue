<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Paramètre de tarification individuelle</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home">Tableau de bord</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Paramètre de tarification individuelle
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="card tab-box">
          <div class="row user-tabs">
            <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul class="nav nav-tabs nav-tabs-bottom">
                <li class="nav-item">
                  <a
                    href="#emp_profile"
                    data-bs-toggle="tab"
                    class="nav-link active"
                    >Réductions groupes</a
                  >
                </li>
                <li class="nav-item">
                  <a href="#emp_projects" data-bs-toggle="tab" class="nav-link"
                    >Assurances temporaires</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#bank_statutory"
                    data-bs-toggle="tab"
                    class="nav-link"
                    >Frais médicaux
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#emp_assets" data-bs-toggle="tab" class="nav-link"
                    >Tarification</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tab-content">
          <div id="emp_profile" class="pro-overview tab-pane fade show active">
            <div class="col-lg-12">
              <div class="card-box">
                <div
                  class="card-block d-flex justify-content-between align-items-center"
                >
                  <h4 class="card-title">Réductions Groupes</h4>
                  <div>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add_reduction_group"
                      class="btn btn-success btn-add-emp"
                      ><i class="fas fa-plus"></i> Ajouter</a
                    >
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Nbre de pers min</th>
                        <th>Nbre de pers max</th>
                        <th>Pourcentages</th>
                        <th>Compagnie</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(reduction, i) in reductions" :key="i">
                        <tr>
                          <td v-text="reduction.nbrePersonneMin"></td>
                          <td v-text="reduction.nbrePersonneMax"></td>
                          <td v-text="reduction.pourcentage"></td>
                          <td v-text="reduction.compagnie.nom_compagnie"></td>
                          <td></td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <addReduction @reduction-add="refresh"></addReduction>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="emp_projects">
            <div class="col-lg-12">
              <div class="card-box">
                <div
                  class="card-block d-flex justify-content-between align-items-center"
                >
                  <h4 class="card-title">Assurance temporaire</h4>
                  <div>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add_assurance_temporaire"
                      class="btn btn-success btn-add-emp"
                      ><i class="fas fa-plus"></i> Ajouter</a
                    >
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Nbre de mois min</th>
                        <th>Nbre de mois max</th>
                        <th>Pourcentages</th>
                        <th>Compagnie</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(assurance, i) in assurances" :key="i">
                        <tr>
                          <td v-text="assurance.nbreMoisMin"></td>
                          <td v-text="assurance.nbreMoisMax"></td>
                          <td v-text="assurance.pourcentage"></td>
                          <td v-text="assurance.compagnie.nom_compagnie"></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <addAssurance
                  @assurance-add="handleAssurancesChange"
                ></addAssurance>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="bank_statutory">
            <div class="col-md-12">
              <div class="card-box">
                <div
                  class="card-block d-flex justify-content-between align-items-center"
                >
                  <h4 class="card-title">Frais médicaux</h4>
                  <div>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add_frais"
                      class="btn btn-success btn-add-emp"
                      ><i class="fas fa-plus"></i> Ajouter</a
                    >
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Montant</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(montant, i) in montants" :key="i">
                        <tr>
                          <td v-text="montant.montant"></td>
                          <td></td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <addMontant @frais-add="handleMontantsChange"></addMontant>
              </div>
            </div>
          </div>
          <!-- /Bank Statutory Tab -->

          <!-- Assets -->
          <div class="tab-pane fade" id="emp_assets">
            <div class="col-md-12">
              <div class="card-box">
                <div
                  class="card-block d-flex justify-content-between align-items-center"
                >
                  <h4 class="card-title">Tarification</h4>
                  <div>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add_tarification"
                      class="btn btn-success btn-add-emp"
                      ><i class="fas fa-plus"></i> Ajouter</a
                    >
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Classes</th>
                        <th>Professions</th>
                        <th>Décès</th>
                        <th>IPT</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(accident, i) in accidents" :key="i">
                        <tr>
                          <td v-text="accident.classe"></td>
                          <td v-text="accident.activite"></td>
                          <td v-text="accident.tauxDeces"></td>
                          <td v-text="accident.tauxIPT"></td>
                          <td></td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <addTarification @tarification-add="refresh"></addTarification>
              </div>
            </div>
          </div>
          <!-- /Assets -->
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import AppStorage from "../../db/AppStorage";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import addTarification from "./addTarification.vue";
import addReduction from "./addReduction.vue";
import addAssurance from "./addAssurance.vue";
import addMontant from "./addMontant.vue";

export default {
  name: "listprospect",
  components: {
    Header,
    Sidebar,
    addTarification,
    addReduction,
    addAssurance,
    addMontant,
  },
  data() {
    return {
      value: null,
      reductions: [],
      assurances: [],
      montants: [],
      accidents: [],
      tarifications: [],
    };
  },
  created() {
    this.getReduction();
    this.getAssurance();
    this.getMontant();
    this.getTarificationAccident();
    this.getTarification();
  },

  methods: {
    async getReduction() {
      AppStorage.getReductionGroups().then((result) => {
        this.reductions = result;
      });
    },
    async getAssurance() {
      AppStorage.getAssuranceTemporaires().then((result) => {
        this.assurances = result;
      });
    },

    async getMontant() {
      AppStorage.getFraisMedicals().then((result) => {
        this.montants = result;
      });
    },

    async getTarificationAccident() {
      AppStorage.getTarificateurAccidents().then((result) => {
        this.accidents = result;
      });
    },

    async getTarification() {
      AppStorage.getTarificateurIA().then((result) => {
        this.tarifications = result;
      });
    },

    refresh() {
      AppStorage.getReductionGroups().then((result) => {
        this.reductions = result;
      });
    },

    handleAssurancesChange() {
      AppStorage.getAssuranceTemporaires().then((result) => {
        this.assurances = result;
      });
    },

    handleMontantsChange() {
      AppStorage.getFraisMedicals().then((result) => {
        this.montants = result;
      });
    },
  },
};
</script>

<style scoped>
/* Styles spécifiques pour ces cartes */
.card-box {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  margin-bottom: 0;
}

.btn-add-emp {
  width: auto;
}

.add-emp-section {
  text-align: right;
  margin-bottom: 10px;
}
</style>

    