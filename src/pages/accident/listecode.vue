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
                          <td
                            class="text-end ico-sec d-flex justify-content-end"
                          >
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_reduction_group"
                              v-bind:reductiontoedit="reductiontoedit"
                              @click="
                                editReductionGroupe(
                                  reduction.uuidReductionGroupe
                                )
                              "
                              ><i class="fas fa-pen"></i
                            ></a>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <addReduction @reduction-add="refresh"></addReduction>
                <editReduction
                  v-bind:reductiontoedit="reductiontoedit"
                  @reduction-updated="refresh"
                ></editReduction>
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

                          <td
                            class="text-end ico-sec d-flex justify-content-end"
                          >
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_assurance_temporaire"
                              v-bind:assurancetoedit="assurancetoedit"
                              @click="
                                editAssuranceTemporaire(
                                  assurance.uuidTarificateurAccident
                                )
                              "
                              ><i class="fas fa-pen"></i
                            ></a>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <addAssurance
                  @assurance-add="handleAssurancesChange"
                ></addAssurance>
                <editAssurance
                  v-bind:assurancetoedit="assurancetoedit"
                ></editAssurance>
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
                      data-bs-target="#import_file"
                      class="btn btn-success btn-add-emp"
                      ><i class="fas fa-plus"></i> ajouter
                    </a>
                  </div>
                </div>
                <div class="row" v-show="show">
                  <div class="col-md-3">
                    <div class="form-group">
                      <Multiselect
                        v-model="form.compagnie_id"
                        :options="compagnies"
                        :searchable="true"
                        @change="optionCompagnie"
                        name="police"
                        :custom-label="
                          ({ uuidCompagnie, nom_compagnie }) =>
                            `${uuidCompagnie} - [${nom_compagnie}]`
                        "
                        valueProp="uuidCompagnie"
                        placeholder="Choisir une compagnie"
                        label="nom_compagnie"
                        track-by="nom_compagnie"
                      ></Multiselect>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="form-group">
                      <div>
                        <button
                          type="button"
                          class="btn btn-primary w-100"
                          @click="viewForm()"
                        >
                          <i class="ri-equalizer-fill me-1 align-bottom"></i>
                          valider
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive" v-show="showForm">
                  <table class="table table-striped custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Classes</th>
                        <th>Professions</th>
                        <th>Décès</th>
                        <th>IPT</th>
                        <th>100.000</th>
                        <th>200.000</th>
                        <th>400.000</th>
                        <th>500.000</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(activite, index) in tarifs"
                        :key="index"
                      >
                        <tr>
                          <td>
                            <input
                              type="text"
                              v-model="activite.classe"
                              readonly
                              style="width: 80px"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              readonly
                              v-model="activite.activite"
                              style="width: 280px"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              v-model="activite.tauxDeces"
                              style="width: 80px"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              v-model="activite.tauxIPT"
                              style="width: 80px"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              v-model="activite.cent"
                              style="width: 80px"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              v-model="activite.deuxCent"
                              style="width: 80px"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              v-model="activite.quatreCent"
                              style="width: 80px"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              v-model="activite.cinqCent"
                              style="width: 80px"
                            />
                          </td>

                          <td
                            class="text-end ico-sec d-flex justify-content-end"
                          >
                            <button
                              class="btn btn-primary"
                              @click="submitRow(index)"
                            >
                              Soumettre
                            </button>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                  <!-- <div class="submit-section">
                    <button
                      class="btn btn-primary submit-btn"
                      @click="storeAll"
                    >
                      Enregistrer
                    </button>
                  </div> -->
                </div>

                <importClasse></importClasse>
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
import Multiselect from "@vueform/multiselect";
import AppStorage from "../../db/AppStorage";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import addReduction from "./addReduction.vue";
import addAssurance from "./addAssurance.vue";
import addMontant from "./addMontant.vue";
import editReduction from "./editReduction.vue";
import editAssurance from "./editAssurance.vue";
import viewTarification from "./viewTarification.vue";
import importClasse from "./importClasse.vue";
import { validateChoiceForm } from "../../utils/helpers/formValidation";
import { v4 as uuidv4 } from "uuid";
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});

export default {
  name: "listprospect",
  components: {
    Multiselect,
    Header,
    Sidebar,
    addReduction,
    addAssurance,
    addMontant,
    editReduction,
    editAssurance,
    viewTarification,
    importClasse,
  },
  data() {
    return {
      activites: [
        { classe: "", deces: "", ipt: "", uuidActivite: "" }, // Assurez-vous de définir deces sur une valeur initiale
      ],
      value: null,
      show: true,
      showForm: false,
      reductions: [],
      assurances: [],
      montants: [],
      accidents: [],
      tarifications: [],
      reductiontoedit: "",
      assurancetoedit: "",
      tarificationtoedit: "",
      // activites: [],
      tarifs: [],
      compagnies: [],
      tauxIpt: "",
      tauxDeces: "",
      form: {
        compagnie_id: "",
      },
    };
  },
  created() {
    this.getReduction();
    this.getAssurance();
    this.getMontant();
    this.getTarificationAccident();
    this.getTarification();
    this.getActivite();
    this.getCompagnie();
  },

  methods: {
    // storeAll() {
    //   console.log("All data:", this.tarifs);
    //   // Logique pour stocker toutes les données
    //   // Vous pouvez envoyer les données à un serveur via une requête API par exemple
    //   // axios.post('/api/save-tarifs', this.tarifs).then(response => {
    //   //   console.log('Data saved successfully');
    //   // }).catch(error => {
    //   //   console.error('Error saving data', error);
    //   // });
    // },
    async viewForm() {
      this.errors = validateChoiceForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez Selectionnez la compagnie`, {
          position: "top-right",
        });
        return;
      }
      this.showForm = true;
      this.show = false;
      const uuidCompagnie = this.form.compagnie_id;
      AppStorage.getActivitiesWithTarificateurAccidents(uuidCompagnie).then(
        (result) => {
          this.tarifs = result;
        }
      );
    },

    async getCompagnie() {
      this.compagnies = await switchService.getCompagnies();
    },

    async getReduction() {
      AppStorage.getReductionGroups().then((result) => {
        this.reductions = result;
      });
    },

    async editReductionGroupe(uuidReductionGroupe) {
      try {
        this.reductiontoedit = await AppStorage.getReductionGroupByUuid(
          uuidReductionGroupe
        );
      } catch (error) {
        console.log(error);
      }
    },

    async getAssurance() {
      this.assurances = await switchService.getAssurance();
    },

    async editAssuranceTemporaire(uuidAssuranceTemporaire) {
      try {
        this.assurancetoedit = await AppStorage.getAssuranceTemporaireByUuid(
          uuidAssuranceTemporaire
        );
      } catch (error) {
        console.log(error);
      }
    },

    async getMontant() {
      AppStorage.getFraisMedicals().then((result) => {
        // console.log(result);
        this.montants = result;
      });
    },

    async getTarificationAccident() {
      AppStorage.getTarificateurAccidents().then((result) => {
        this.accidents = result;
      });
    },

    async getActivite() {
      AppStorage.getActivites().then((result) => {
        this.activites = result;
      });
    },

    async submitRow(index) {
      const activite = this.tarifs[index];
      if (activite.uuidTarificateurAccident == null) {
        const uuid = uuidv4();
        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

        const newTarificationAccidentData = [
          {
            id: userId,
            uuidTarificateurAccident: uuid,
            tauxDeces: activite.tauxDeces,
            tauxIPT: activite.tauxIPT,
            cent: activite.cent,
            deuxCent: activite.deuxCent,
            quatreCent: activite.quatreCent,
            cinqCent: activite.cinqCent,
            sync: 0,
            id_entreprise: entrepriseId,
            uuidCompagnie: this.form.compagnie_id,
            uuidActivite: activite.uuidActivite,
          },
        ];

        await AppStorage.storeDataInIndexedDB(
          "tarificateuraccidents",
          newTarificationAccidentData
        );

        toaster.success(`Tarificateur ajouté `, { position: "top-right" });
      } else {
        const uuidTarificationToUpdate = activite.uuidTarificateurAccident;

        const nouvellesInfos = {
          tauxDeces: activite.tauxDeces,
          tauxIPT: activite.tauxIPT,
          cent: activite.cent,
          deuxCent: activite.deuxCent,
          quatreCent: activite.quatreCent,
          cinqCent: activite.cinqCent,
          sync: 0,
        };

        await AppStorage.updateTarification(
          uuidTarificationToUpdate,
          nouvellesInfos
        );

        toaster.success(`Tarificateur modifié `, { position: "top-right" });
      }
    },

    async viewTarificationAccident(uuidTarificateurAccident) {
      try {
        this.tarificationtoedit =
          await AppStorage.getTarificateurAccidentByUuid(
            uuidTarificateurAccident
          );
        console.log(this.tarificationtoedit);
      } catch (error) {
        console.log(error);
      }
    },

    async getTarification() {
      AppStorage.getTarificateurIA().then((result) => {
        // console.log(result);
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

    handleTarification() {
      AppStorage.getTarificateurAccidents().then((result) => {
        this.accidents = result;
      });
    },

    getTauxDeces(activite) {
      return activite.tarificateurAccidents
        ? activite.tarificateurAccidents.tauxDeces
        : "";
    },

    getTauxIpt(activite) {
      return activite.tarificateurAccidents
        ? activite.tarificateurAccidents.tauxIPT
        : "";
    },

    getTauxCent(activite) {
      return activite.tarificateurAccidents
        ? activite.tarificateurAccidents.cent
        : "";
    },

    getTauxDeuxCent(activite) {
      return activite.tarificateurAccidents
        ? activite.tarificateurAccidents.deuxCent
        : "";
    },
    getTauxQuatreCent(activite) {
      return activite.tarificateurAccidents
        ? activite.tarificateurAccidents.quatreCent
        : "";
    },
    getTauxCinqCent(activite) {
      return activite.tarificateurAccidents
        ? activite.tarificateurAccidents.cinqCent
        : "";
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
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->

    