<template>
  <div
    class="modal fade"
    id="addReglement"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-light p-3">
          <h5 class="modal-title" id="exampleModalLabel">Reglememt</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close-modal"
          ></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="mb-3">
              <label for="customername-field" class="form-label"
                >Type de reglement</label
              >
              <typereglementcomponent
                :placeholder="'Choisir un type'"
                v-model="form.type"
              ></typereglementcomponent>
              <!-- <select
                class="form-control"
                data-trigger=""
                name="status-field"
                id="status-field"
                v-model="form.type"
              >
                <option value="">Selectionnez</option>
                <option value="Client">Client</option>
                <option value="Expert">Expert</option>
                <option value="Garage">Garage</option>
                <option value="Tiers">Tiers</option>
              </select> -->
            </div>

            <div class="mb-3">
              <label for="nom-field" class="form-label">Nom</label>
              <input
                type="text"
                id="nom-field"
                class="form-control"
                placeholder="Nom ...."
                required=""
                v-model="form.nom"
              />
            </div>

            <div class="mb-3">
              <label for="phone-field" class="form-label">Mode</label>
              <modecomponent
                :placeholder="'Choisir un mode'"
                v-model="form.mode"
              ></modecomponent>
              <!-- <Multiselect
                v-model="form.mode"
                :options="modes"
                placeholder="Choisir le mode"
                :searchable="true"
              /> -->
            </div>
            <div class="mb-3">
              <label for="montant" class="form-label">Montant</label>
              <input
                type="number"
                class="form-control"
                v-model="form.montant"
                id="montant"
                name="montant"
                placeholder="Montant"
              />
            </div>
          </div>
          <div class="modal-footer">
            <div class="hstack gap-2 justify-content-end">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                class="btn btn-success"
                id="add-btn"
                @click="addReglement"
                data-bs-dismiss="modal"
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import modecomponent from "../../components/select/modecomponent.vue";
import Typereglementcomponent from "../../components/select/typereglementcomponent.vue";
export default {
  data() {
    return {
      form: {
        type: "",
        nom: "",
        mode: "",
        montant: "",
        modes: ["Espèces", "Carte", "Chèques"],
      },
    };
  },
  components: {
    modecomponent,
    Typereglementcomponent,
  },
  methods: {
    async addReglement() {
      const uuid = uuidv4();
      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const newReglementData = [
        {
          uuidReglement: uuid,
          type: this.form.type,
          nom: this.form.nom,
          mode: this.form.mode,
          montant: this.form.montant,
          sync: 0,
          id_entreprise: entrepriseId,
          user_id: userId,
          supprimer_reglement: 0,
        },
      ];

      //   await AppStorage.storeDataInIndexedDB("regelemnts", newReglementData);
      //   const result = await AppStorage.getClients();
    },
  },
};
</script>