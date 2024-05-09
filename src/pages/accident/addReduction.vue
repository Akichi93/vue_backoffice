<template>
  <div id="add_reduction_group" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une reduction</h5>
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
          <div class="section">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Nombre de personne min</label>
                  <InputNumber
                    :numberValue="form.nbre_min"
                    :placeholder="'Entrez le nombre de personne minimal'"
                    @update:numberValue="updateNbreMin"
                  >
                  </InputNumber>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Nombre de personne max</label>
                  <InputNumber
                    :numberValue="form.nbre_max"
                    :placeholder="'Entrez le nombre de personne maximal'"
                    @update:numberValue="updateNbreMax"
                  >
                  </InputNumber>
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Pourcentage</label>
                  <InputNumber
                    :numberValue="form.pourcentage"
                    :placeholder="'Entrez le pourcentage'"
                    @update:numberValue="updatePourcentage"
                  >
                  </InputNumber>

                  <p
                    style="color: red"
                    class="text-red"
                    v-if="errors.pourcentage"
                    v-text="errors.pourcentage"
                  ></p>
                </div>
              </div>
              <div class="col-sm-6">
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
              @click="storeReduction"
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
import InputNumber from "../../components/input/inputNumber.vue";
import compagniecomponent from "../../components/select/compagniecomponent.vue";
import { validateReductionForm } from "../../utils/helpers/formValidation";
import { v4 as uuidv4 } from "uuid";
// import switchService from '../../services/switchService';
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from "../../db/AppStorage";
const toaster = createToaster({
  /* options */
});

export default {
  components: {
    compagniecomponent,
    InputNumber,
  },
  data() {
    return {
      form: {
        compagnie_id: "",
        pourcentage: "",
        nbre_min: "",
        nbre_max: "",
      },
      errors: {},
    };
  },
  methods: {
    updatePourcentage(value) {
      this.form.pourcentage = value;
    },
    updateNbreMax(value) {
      this.form.nbre_max = value;
    },
    updateNbreMin(value) {
      this.form.nbre_min = value;
    },
    async storeReduction() {
      this.errors = validateReductionForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
        return;
      }

      const uuid = uuidv4();
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const newReductionData = [
        {
          id: userId,
          uuidReductionGroupe: uuid,
          uuidCompagnie: this.form.compagnie_id,
          nbrePersonneMin: this.form.nbre_min,
          nbrePersonneMax: this.form.nbre_max,
          pourcentage: this.form.pourcentage,
          sync: 0,
          id_entreprise: entrepriseId,
        },
      ];

      await AppStorage.storeDataInIndexedDB(
        "reductiongroups",
        newReductionData
      );

      const updatedReductions = await AppStorage.getReductionGroups();

      this.$emit("reduction-add", updatedReductions);

      toaster.success(`Reduction groupe ajouté `, { position: "top-right" });
    },
  },
};
</script>
    