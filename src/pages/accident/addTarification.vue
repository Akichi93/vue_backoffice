<template>
  <div id="add_tarification" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une tarification</h5>
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Compagnie</label>
                <compagniecomponent
                  :placeholder="'selectionnez la compagnie'"
                  v-model="form.compagnie_id"
                ></compagniecomponent>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.compagnie_id"
                  v-text="errors.compagnie_id"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Classes</label>
                <InputNumber
                  :numberValue="form.classe"
                  :placeholder="'Entrez le numéro de la classe'"
                  @update:numberValue="updateClasse"
                >
                </InputNumber>

                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.classe"
                  v-text="errors.classe"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Profession</label>
                <inputText
                  :placeholder="'Entrez la(les) profession(s)'"
                  v-model="form.activite"
                >
                </inputText>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.activite"
                  v-text="errors.activite"
                ></p>
              </div>
            </div>
          </div>
          <div class="section">
            <h5><b>TAUX</b></h5>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Décès</label>
                  <InputNumber
                    :numberValue="form.deces"
                    :placeholder="'Entrez le taux de décès'"
                    @update:numberValue="updateDeces"
                  >
                  </InputNumber>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>IPT</label>
                  <InputNumber
                    :numberValue="form.ipt"
                    :placeholder="'Entrez le taux IPT'"
                    @update:numberValue="updateIPT"
                  >
                  </InputNumber>
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <h5>
              <b>FRAIS MEDICAUX ET PHARMACEUTIQUES</b>
            </h5>
            <div class="row">
              <div
                class="col-md-6"
                v-for="montant in montants"
                :key="montant.uuidFraisMedical"
              >
                <div class="form-group">
                  <label>{{ montant.montant }}</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Entrez le taux"
                    :key="montant.uuidFraisMedical"
                    step="0.01"
                    min="0"
                    max="1000"
                    v-model="montant.value"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="submit-section">
            <button
              type="button"
              class="btn btn-primary cancel-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-primary submit-btn"
              @click="storeTarification"
              data-bs-dismiss="modal"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
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
    compagniecomponent,
    InputNumber,
    inputText,
  },
  data() {
    return {
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
  created() {
    this.getMontant();
  },
  methods: {
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

      const updatedTarifications = await AppStorage.getTarificationAccident();

      this.$emit("tarification-add", updatedTarifications);

      toaster.success(`Tarification  ajouté `, { position: "top-right" });
    },
  },
};
</script>