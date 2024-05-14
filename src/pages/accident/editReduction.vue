<template>
  <div id="edit_reduction_group" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier une reduction</h5>
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
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                    v-model="reductiontoedit.nbrePersonneMin"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Nombre de personne max</label>
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                    v-model="reductiontoedit.nbrePersonneMax"
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
                    v-model="reductiontoedit.pourcentage"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Compagnie</label>
                  <compagniecomponent
                    :placeholder="'selectionnez la compagnie'"
                    v-model="reductiontoedit.uuidCompagnie"
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
              @click="updateReduction"
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
import AppStorage from "../../db/AppStorage";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  props: ["reductiontoedit"],
  components: {
    compagniecomponent,
    InputNumber,
  },
  methods: {
    async updateReduction() {
      const uuidReductionToUpdate = this.reductiontoedit.uuidReductionGroupe;

      const nouvellesInfos = {
        nbrePersonneMin: this.reductiontoedit.nbrePersonneMin,
        nbrePersonneMax: this.reductiontoedit.nbrePersonneMax,
        pourcentage: this.reductiontoedit.pourcentage,
        uuidCompagnie: this.reductiontoedit.uuidCompagnie,
        sync: 0,
      };

      await AppStorage.updateReduction(uuidReductionToUpdate, nouvellesInfos);

      const updatedReductions = await AppStorage.getReductionGroups();

      this.$emit("reduction-updated", updatedReductions);

      toaster.success(`Reduction groupe modifié `, { position: "top-right" });
    },
  },
};
</script>
      