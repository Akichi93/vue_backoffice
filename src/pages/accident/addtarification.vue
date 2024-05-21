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
                <div>
                  <component
                    :is="currentStepComponent"
                    @next="nextStep"
                    @prev="prevStep"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Page Content -->
    </div>
  </div>
</template>
  <script>
import Step1 from "./step1.vue";
import Step2 from "./step2.vue";
import Step3 from "./step3.vue";
import Step4 from "./step4.vue";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import AppStorage from "../../db/AppStorage";
import { v4 as uuidv4 } from "uuid";
import InputNumber from "../../components/input/inputNumber.vue";
import inputText from "../../components/input/inputText.vue";
import compagniecomponent from "../../components/select/compagniecomponent.vue";
import { validateTarificationForm } from "../../utils/helpers/formValidation";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

export default {
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    compagniecomponent,
    InputNumber,
    inputText,
    Header,
    Sidebar,
  },
  data() {
    return {
      currentStep: 1,
      afficherInputFrais: false,
      montantFrais: "",
      montants: [],
      form: {
        classe: "",
        activite: "",
        deces: "",
        ipt: "",
        compagnie_id: "",
      },
      errors: {},
    };
  },
  computed: {
    currentStepComponent() {
      return `Step${this.currentStep}`;
    },
  },
  created() {
    this.getMontant();
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    prevStep() {
      this.currentStep--;
    },
    updateClasse(value) {
      this.form.classe = value;
    },
    updateDeces(value) {
      this.form.deces = value;
    },
    updateIPT(value) {
      this.form.ipt = value;
    },
    async getMontant() {
      AppStorage.getFraisMedicals().then((result) => {
        this.montants = result;
      });
    },

    async storeTarification() {
      this.errors = validateTarificationForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
        return;
      }

      const uuid = uuidv4();
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const newTarificationAccidentData = [
        {
          id: userId,
          uuidTarificateurAccident: uuid,
          // uuidCompagnie: this.form.compagnie_id,
          classe: this.form.classe,
          activite: this.form.activite,
          tauxDeces: this.form.deces,
          tauxIPT: this.form.ipt,
          sync: 0,
          id_entreprise: entrepriseId,
        },
      ];

      // Ajouter la nouvelle donnée dans IndexedDB

      await AppStorage.storeDataInIndexedDB(
        "tarificateuraccidents",
        newTarificationAccidentData
      );

      let test = JSON.parse(JSON.stringify(this.montants));
      let montantArray = [];

      for (let i = 0; i < Object.keys(test).length; i++) {
        montantArray.push(test[i]["value"]);
      }

      let testing = JSON.parse(JSON.stringify(this.montants));
      let dataArray = [];

      for (let i = 0; i < Object.keys(testing).length; i++) {
        dataArray.push(testing[i]["uuidFraisMedical"]);
      }

      for (let i = 0; i < dataArray.length; i++) {
        let newTauxApporteur = [
          {
            // uuidFraisMedical: uuidFraisMedical,
            uuidTarificateurAccident: uuid,
            sync: 0,
            taux: montantArray[i],
            uuidCompagnie: this.form.compagnie_id,
            uuidFraisMedical: dataArray[i],
          },
        ];
        await AppStorage.storeDataInIndexedDB(
          "tarificateurfrais",
          newTauxApporteur
        );
      }

      const updatedTarifications = await AppStorage.getTarificateurAccidents();

      this.$emit("tarification-add", updatedTarifications);

      toaster.success(`Tarification  ajouté `, { position: "top-right" });
    },
  },
};
</script>