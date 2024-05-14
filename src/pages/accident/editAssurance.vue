<template>
  <div
    id="edit_assurance_temporaire"
    class="modal custom-modal fade"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier une assurance</h5>
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
                  <label>Nombre de mois min</label>
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                    v-model="assurancetoedit.nbreMoisMin"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Nombre de mois max</label>
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                    v-model="assurancetoedit.nbreMoisMax"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Pourcentage</label>
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                    v-model="assurancetoedit.pourcentage"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Compagnie</label>
                  <compagniecomponent
                    :placeholder="'selectionnez la compagnie'"
                    v-model="assurancetoedit.uuidCompagnie"
                  ></compagniecomponent>
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
              @click="updateAssurance"
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
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from "../../db/AppStorage";
const toaster = createToaster({
  /* options */
});

export default {
  props: ["assurancetoedit"],
  components: {
    compagniecomponent,
    InputNumber,
  },

  methods: {
    async updateAssurance() {
      const uuidAssuranceToUpdate = this.assurancetoedit.uuidAssuranceTemporaire;

      const nouvellesInfos = {
        nbreMoisMin: this.assurancetoedit.nbreMoisMin,
        nbreMoisMax: this.assurancetoedit.nbreMoisMax,
        pourcentage: this.assurancetoedit.pourcentage,
        uuidCompagnie: this.assurancetoedit.uuidCompagnie,
        sync: 0,
      };

      await AppStorage.updateAssurance(uuidAssuranceToUpdate, nouvellesInfos);

      const updatedTemporaires = await AppStorage.getAssuranceTemporaires();

      this.$emit("assurance-updated", updatedTemporaires);

      toaster.success(`Reduction groupe modifié `, { position: "top-right" });
    },
  },
};
</script>
      