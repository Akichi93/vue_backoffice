<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">
                Créer une tarification accident individuel
              </h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to=":home">Tableau de bord</router-link>
                </li>
                <li class="breadcrumb-item active">Accident individuel</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
          <div class="col-sm-12">
            <div class="col-xl-12">
              <div class="card">
                <!-- <h4 class="card-title">
                  Proposition de couverture individuelle accident
                </h4> -->
                <div class="card-body">
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
                  <div class="col-md-12" v-show="showForm">
                    <div class="row">
                      <!-- Première colonne -->
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-lg-3 col-form-label">
                            <label
                              >Proposant
                              <span class="text-danger">*</span></label
                            >
                          </div>

                          <div class="col-lg-6">
                            <div class="input-block mb-3">
                              <Multiselect
                                v-model="form.nom"
                                :options="prospects"
                                :searchable="true"
                                name="police"
                                :custom-label="
                                  ({ uuidProspect, nom_prospect }) =>
                                    `${uuidProspect} - [${nom_prospect}]`
                                "
                                valueProp="uuidProspect"
                                placeholder="Choisir un prospect"
                                label="nom_prospect"
                                track-by="nom_prospect"
                              ></Multiselect>
                             
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#add_prospect"
                              >
                                Ajouter
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="input-block mb-3 row">
                          <label class="col-lg-3 col-form-label"
                            >Activité <span class="text-danger">*</span></label
                          >
                          <div class="col-lg-9">
                            <Multiselect
                              v-model="form.accident_id"
                              :options="activites"
                              @change="optionActivite"
                              :searchable="true"
                              :custom-label="
                                ({ uuidActivite, activite }) =>
                                  `${uuidActivite} - [${activite}]`
                              "
                              valueProp="uuidActivite"
                              placeholder="Choisir une activité"
                              label="activite"
                              track-by="activite"
                            ></Multiselect>
                          </div>
                        </div>
                        <div class="input-block mb-3 row">
                          <label class="col-lg-3 col-form-label"
                            >Effectif<span class="text-danger">*</span></label
                          >
                          <div class="col-lg-9">
                            <input
                              type="number"
                              v-model="effectifValue"
                              @input="optionEffectif(effectifValue)"
                              class="form-control"
                              placeholder="Effectif"
                            />
                          </div>
                        </div>
                        <div class="input-block mb-3 row">
                          <br />
                          <label class="col-lg-3 col-form-label"
                            >Durée<span class="text-danger">*</span></label
                          >
                          <div class="col-lg-3">
                            <label>Début</label>
                            <input
                              @change="updateNombreJours"
                              type="date"
                              class="form-control m-b-20"
                              v-model="debut"
                            />
                          </div>
                          <div class="col-lg-3">
                            <label>Fin</label>
                            <input
                              @change="updateNombreJours"
                              type="date"
                              class="form-control m-b-20"
                              v-model="fin"
                            />
                          </div>
                          <div class="col-lg-3">
                            <label>Nbre de jour(s)</label>
                            <input
                              v-model="nombreJours"
                              readonly
                              type="text"
                              class="form-control m-b-20"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Deuxième colonne -->
                      <div class="col-md-6">
                        <div class="row">
                          <!-- Colonne pour les champs "Capitaux assurés", "Décès" et "IPT" -->
                          <div class="col-lg-12">
                            <div class="row">
                              <!-- Champ "Capitaux assurés" -->
                              <div class="col-lg-3 col-form-label">
                                <label
                                  >Capitaux assurés
                                  <span class="text-danger">*</span></label
                                >
                              </div>
                              <!-- <div class="col-lg-9">
                                <div class="input-block mb-3">
                                  <input
                                    type="text"
                                    placeholder="Capitaux assurés"
                                    class="form-control"
                                  />
                                </div>
                              </div> -->

                              <div class="row">
                                <label class="col-lg-3 col-form-label"></label>
                                <div class="col-lg-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label>Décès</label>
                                      <div class="input-block mb-4">
                                        <input
                                          @change="onDecesChange"
                                          v-model="deces"
                                          type="number"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="input-block mb-4">
                                        <label>IPT</label>
                                        <input
                                          @change="onIptChange"
                                          type="number"
                                          v-model="ipt"
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <label class="col-lg-3 col-form-label"></label>
                                <div class="col-lg-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <label>Frais médicaux</label>
                                        <Multiselect
                                          v-model="montant_id"
                                          :options="montants"
                                          @change="optionFrais"
                                          :searchable="true"
                                          name="police"
                                          :custom-label="
                                            ({ uuidFraisMedical, montant }) =>
                                              `${uuidFraisMedical} - [${montant}]`
                                          "
                                          valueProp="uuidFraisMedical"
                                          placeholder="Choisir un montant"
                                          label="montant"
                                          track-by="montant"
                                        ></Multiselect>
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <label
                                          >Prime nette brute/personne</label
                                        >
                                        <input
                                          type="text"
                                          v-model="montantDeces"
                                          readonly
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <label class="col-lg-3 col-form-label"></label>
                                <div class="col-lg-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <label>Taux de réduction</label>
                                        <input
                                          v-model="tauxEffectif"
                                          type="text"
                                          readonly
                                          class="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="input-block mb-3">
                                        <label
                                          >Prime nette reduite/personne</label
                                        >
                                        <input
                                          v-model="PrimeReduite"
                                          type="text"
                                          readonly
                                          class="form-control"
                                        />
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

                  <div class="row" v-show="showForm">
                    <div class="col-md-6">
                      <div class="card-body">
                        <div class="form-group row">
                          <label
                            for="primeNetteAnnuelle"
                            class="col-sm-4 col-form-label"
                            >Prime nette annuelle:</label
                          >
                          <div class="col-sm-8">
                            <input
                              v-model="PrimeNetteAnnuelle"
                              type="number"
                              readonly
                              class="form-control"
                              id="primeNetteAnnuelle"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="accessoires"
                            class="col-sm-4 col-form-label"
                            >Accessoires:</label
                          >
                          <div class="col-sm-8">
                            <input
                              v-model="accessoireanuelle"
                              @input="optionTaxeAnuelle(accessoireanuelle)"
                              type="number"
                              class="form-control"
                              id="accessoires"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="taxes" class="col-sm-4 col-form-label"
                            >Taxes:</label
                          >
                          <div class="col-sm-8">
                            <input
                              v-model="TaxePrimeAnnuelle"
                              readonly
                              type="number"
                              class="form-control"
                              id="taxes"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label"
                            ><b>Prime TTC:</b></label
                          >
                          <div class="col-sm-8">
                            {{ primeTTCAnuelle }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                        <div class="form-group row">
                          <label
                            for="primeNetteCourteDuree"
                            class="col-sm-4 col-form-label"
                            >Prime nette courte durée:</label
                          >
                          <div class="col-sm-2">
                            <input
                              v-model="pourcentageDay"
                              readonly
                              type="number"
                              class="form-control"
                              id="primeNetteCourteDuree"
                            />
                          </div>
                          <div class="col-sm-6">
                            <input
                              v-model="PrimeNetteCourte"
                              readonly
                              type="number"
                              class="form-control"
                              id="primeNetteCourteDuree"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="accessoires2"
                            class="col-sm-4 col-form-label"
                            >Accessoires:</label
                          >
                          <div class="col-sm-8">
                            <input
                              v-model="accessoirecourte"
                              @input="optionTaxeCourte(accessoirecourte)"
                              type="number"
                              class="form-control"
                              id="accessoires2"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="taxes2" class="col-sm-4 col-form-label"
                            >Taxes:</label
                          >
                          <div class="col-sm-8">
                            <input
                              v-model="TaxePrimeCourte"
                              readonly
                              type="number"
                              class="form-control"
                              id="taxes2"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label"
                            ><b>Prime TTC:</b></label
                          >
                          <div class="col-sm-8">
                            {{ primeTTCCourte }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="submit-section">
                    <!-- <button class="btn btn-primary submit-btn m-r-10">
                Enregistrer & imprimer
              </button> -->
                    <button
                      v-show="showForm"
                      class="btn btn-primary submit-btn"
                      @click="storeAccident"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <addProspect></addProspect>
      <!-- /Page Content -->
    </div>
  </div>
</template>

<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Multiselect from "@vueform/multiselect";
import AppStorage from "../../db/AppStorage";
import { v4 as uuidv4 } from "uuid";
import { validateChoiceForm } from "../../utils/helpers/formValidation";
import { createToaster } from "@meforma/vue-toaster";
import addProspect from "./../prospect/addProspect.vue";
import switchService from '../../services/switchService';
const toaster = createToaster({
  /* options */
});

export default {
  name: "listprospect",
  components: {
    Header,
    Sidebar,
    Multiselect,
    addProspect,
  },
  data() {
    return {
      form: {
        compagnie_id: "",
        accident_id: "",
      },

      montants: [
        { uuidFraisMedical: "cent", montant: "100000" },
        { uuidFraisMedical: "deuxCent", montant: "200000" },
        { uuidFraisMedical: "quatreCent", montant: "400000" },
        { uuidFraisMedical: "cinqCent", montant: "500000" },
      ],

      montant_id: "",
      deces: "",
      ipt: "",
      montantDeces: "",
      tauxEffectif: "",
      PrimeReduite: "",
      PrimeNetteAnnuelle: "",
      TaxePrimeAnnuelle: "",
      accessoireanuelle: "",
      primeTTCAnuelle: "",
      primeTTCCourte: "",
      debut: "",
      fin: "",
      nombreJours: "",
      pourcentageDay: "",
      PrimeNetteCourte: "",
      TaxePrimeCourte: "",
      show: true,
      showForm: false,
      effectifValue: "",
      compagnies: [],
      accidents: [],
      activites: [],
      prospects: [],
      errors: {},
    };
  },
  created() {
    this.getCompagnie();
    this.getProspect();
    this.getActivite();
    this.getTarificationAccident();
    this.calculatePrimeReduite();
  },
  

  methods: {
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
    },

    async onDecesChange() {
      const montant_id = this.montant_id;
      const option = montant_id || this.montant_id;
      if (option) {
        // Vérifie si l'option des frais médicaux est sélectionnée
        const deces = this.deces;
        const ipt = this.ipt;

        // Vérifie si les champs 'deces' et 'ipt' sont remplis
        if (deces !== "" && ipt !== "") {
          // Les champs sont remplis, effectuer les calculs
          await this.optionFrais(option);
        }
      }
    },

    async onIptChange() {
      const montant_id = this.montant_id;
      const option = montant_id || this.montant_id;
      if (option) {
        // Vérifie si l'option des frais médicaux est sélectionnée
        const deces = this.deces;
        const ipt = this.ipt;

        // Vérifie si les champs 'deces' et 'ipt' sont remplis
        if (deces !== "" && ipt !== "") {
          // Les champs sont remplis, effectuer les calculs
          await this.optionFrais(option);
        }
      }
    },

    async calculerNombreJours(debut, fin) {
      // Convertir les chaînes de date en objets Date
      const dateDebut = new Date(debut);
      const dateFin = new Date(fin);

      // Calculer la différence entre les dates en millisecondes
      const differenceEnMillisec = dateFin - dateDebut;

      // Convertir la différence en jours
      const differenceEnJours = differenceEnMillisec / (1000 * 3600 * 24);

      // Retourner le nombre de jours arrondi à l'entier le plus proche
      return Math.round(differenceEnJours);
    },

    async updateNombreJours() {
      // Vérifier si les dates de début et de fin sont définies
      if (this.debut && this.fin) {
        // Calculer le nombre de jours entre les dates
        const nombreJours = await this.calculerNombreJours(
          this.debut,
          this.fin
        );

        // Mettre à jour la valeur du champ "Nombre de jour(s)"
        this.nombreJours = nombreJours;

        if (nombreJours) {
          const id_compagnie = this.form.compagnie_id;
          const pourcentageDay = await AppStorage.getTauxMonth(
            nombreJours,
            id_compagnie
          );

          this.pourcentageDay = pourcentageDay;
        }
        const PrimeNetteAnnuelle = this.PrimeNetteAnnuelle;
        const pourcentageDay = this.pourcentageDay;

        if (nombreJours && PrimeNetteAnnuelle) {
          const PrimeNetteCourte = (PrimeNetteAnnuelle * pourcentageDay) / 100;

          this.PrimeNetteCourte = PrimeNetteCourte;
        }
      }
    },

    async calculatePrimeReduite(tauxEffectif, montantDeces) {
      if (tauxEffectif && montantDeces) {
        const CalculPrimeReduite =
          montantDeces - (montantDeces * tauxEffectif) / 100;

        // Arrondir le résultat et le convertir en entier
        const PrimeReduite = parseInt(Math.round(CalculPrimeReduite));

        return PrimeReduite;
      }
    },

    async calculatePrimeNetteAnnuelle(PrimeReduite) {
      const effectif = parseInt(this.effectifValue);
      if (PrimeReduite && effectif) {
        const CalculPrimeNetteAnnuelle = PrimeReduite * effectif;

        // Arrondir le résultat et le convertir en entier
        const PrimeNetteAnnuelle = parseInt(
          Math.round(CalculPrimeNetteAnnuelle)
        );

        return PrimeNetteAnnuelle;
      }
    },

    async optionTaxeAnuelle(accessoireanuelle) {
      const PrimeNetteAnnuelle = this.PrimeNetteAnnuelle;

      if (PrimeNetteAnnuelle && accessoireanuelle) {
        const TaxePrimeAnnuelle =
          ((PrimeNetteAnnuelle + accessoireanuelle) * 14.5) / 100;

        // Arrondir le résultat et le convertir en entier
        const TaxePrimeAnnuelleArrondie = parseInt(
          Math.round(TaxePrimeAnnuelle)
        );

        this.TaxePrimeAnnuelle = TaxePrimeAnnuelleArrondie;

        if (PrimeNetteAnnuelle && TaxePrimeAnnuelle && accessoireanuelle) {
          const primeTTCAnuelle =
            PrimeNetteAnnuelle + TaxePrimeAnnuelle + accessoireanuelle;

          // Arrondir le résultat et le convertir en entier
          const primeTTCAnuelleArrondie = parseInt(Math.round(primeTTCAnuelle));

          this.primeTTCAnuelle = primeTTCAnuelleArrondie;
        }
      }
    },

    async optionTaxeCourte(accessoirecourte) {
      const PrimeNetteCourte = this.PrimeNetteCourte;
      if (PrimeNetteCourte && accessoirecourte) {
        const TaxePrimeCourte =
          ((PrimeNetteCourte + accessoirecourte) * 14.5) / 100;

        // Arrondir le résultat et le convertir en entier
        const TaxePrimeCourteArrondie = parseInt(Math.round(TaxePrimeCourte));

        this.TaxePrimeCourte = TaxePrimeCourteArrondie;

        if (PrimeNetteCourte && TaxePrimeCourte && accessoirecourte) {
          const primeTTCCourte =
            PrimeNetteCourte + TaxePrimeCourte + accessoirecourte;

          // Arrondir le résultat et le convertir en entier
          const primeTTCCourteArrondie = parseInt(Math.round(primeTTCCourte));

          this.primeTTCCourte = primeTTCCourteArrondie;
        }
      }
    },

    async optionEffectif(option) {
      const id_compagnie = this.form.compagnie_id;
      const tauxEffectif = await AppStorage.getTauxEffectif(
        option,
        id_compagnie
      );
      this.tauxEffectif = tauxEffectif;
    },

    async optionFrais(option) {
      // console.log(option);
      const id_compagnie = this.form.compagnie_id;
      const id_activite = this.form.accident_id;
      const deces = this.deces;
      const ipt = this.ipt;

      const tauxDeces = await AppStorage.getTauxDeces(
        id_activite,
        id_compagnie,
        option
      );
      const tauxIpt = await AppStorage.getTauxIpt(
        id_activite,
        id_compagnie,
        option
      );

      const tauxFrais = await AppStorage.getTauxFrais(
        id_activite,
        id_compagnie,
        option
      );

      // Calculer le montant des décès en utilisant la fonction calculerMontantDeces
      this.montantDeces = await this.calculerMontantDeces(
        deces,
        tauxDeces,
        ipt,
        tauxIpt,
        tauxFrais
      );

      const tauxEffectif = this.tauxEffectif;
      const montantDeces = this.montantDeces;

      if (tauxEffectif != null && montantDeces != null) {
        this.PrimeReduite = await this.calculatePrimeReduite(
          tauxEffectif,
          montantDeces
        );
      }

      const PrimeReduite = this.PrimeReduite;
      if (PrimeReduite != null) { 
        
        this.PrimeNetteAnnuelle = await this.calculatePrimeNetteAnnuelle(
          PrimeReduite
        );
      }
    },

    async calculerMontantDeces(
      nombreDeces,
      tauxDeces,
      nombreIpt,
      tauxIpt,
      tauxFrais
    ) {
      // Vérifiez si les valeurs sont valides et sont des nombres
      if (
        !isNaN(nombreDeces) &&
        !isNaN(tauxDeces) &&
        !isNaN(nombreIpt) &&
        !isNaN(tauxIpt) &&
        !isNaN(tauxFrais)
      ) {
        // Convertissez les valeurs en nombres
        const nombreDecesEntier = parseInt(nombreDeces);
        const tauxDecesNombre = parseFloat(tauxDeces);
        const nombreIptEntier = parseFloat(nombreIpt);
        const tauxIptNombre = parseFloat(tauxIpt);
        const tauxFraisNombre = parseFloat(tauxFrais);

        // Vérifiez si les valeurs sont positives
        if (nombreDecesEntier >= 0 && tauxDecesNombre >= 0) {
          // Calculez le montant des décès en multipliant le nombre de décès par le taux de décès
          let montantDeces =
            Math.floor((nombreDecesEntier * tauxDecesNombre) / 1000) +
            Math.floor((nombreIptEntier * tauxIptNombre) / 1000) +
            Math.floor(tauxFraisNombre);

          // Retourner le montant arrondi
          return montantDeces;
        } else {
          // Si les valeurs sont négatives, retournez une erreur
          return "Erreur : Les nombres positifs.";
        }
      } else {
        // Si les valeurs ne sont pas des nombres, retournez une erreur
        return 0;
      }
    },

    async getProspect() {
      this.prospects = await switchService.getProspects();
    },

    async getCompagnie() {
      this.compagnies = await switchService.getCompagnies();
    },
    async getActivite() {
      AppStorage.getActivites().then((result) => {
        this.activites = result;
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

    async storeAccident() {
      const uuid = uuidv4();
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      // const activiteName = await AppStorage.getActivityNameByUUID(
      //       this.form.accident_id
      //     );

      const newTarificationData = [
        {
          uuidTarificationAccident: uuid,
          uuidCompagnie: this.form.compagnie_id,
          uuidProspect: this.form.nom,
          uuidActivite: this.form.accident_id,
          effectif: this.effectifValue,
          duree: this.nombreJours,
          deces: this.deces,
          ipt: this.ipt,
          frais_medicaux: this.montant_id,
          prime_nette_brute: this.montantDeces,
          taux_reduction_effectif: this.tauxEffectif,
          prime_nette_reduite: this.PrimeReduite,
          prime_nette_annuelle: this.PrimeNetteAnnuelle,
          accessoire_annuel: this.accessoireanuelle,
          taxe_annuelle: this.TaxePrimeAnnuelle,
          prime_ttc_annuelle: this.primeTTCAnuelle,
          prime_nette_courte: this.PrimeNetteCourte,
          taux_reduction_duree: this.pourcentageDay,
          accesoire_courte: this.accessoirecourte,
          taxe_courte: this.TaxePrimeCourte,
          prime_ttc_courte: this.primeTTCCourte,
          sync: 0,
          id_entreprise: entrepriseId,
          id: userId,
        },
      ];

      await AppStorage.storeDataInIndexedDB(
        "tarificationaccidents",
        newTarificationData
      );

      this.$router.push("/listeaccident");

      toaster.success(`tarification ajouté `, { position: "top-right" });
    },
  },
};
</script>

    