<template>
  <div id="add_taux" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter</h5>
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
              <div
                class="col-sm-6"
                v-for="branche in branches"
                :key="branche.id_branche"
              >
                <div class="form-group">
                  <label>{{ branche.nom_branche }}</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Entrez le taux"
                    required=""
                    :key="branche.id_branche"
                    v-model="branche.value"
                  />
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button
                class="btn btn-primary cancel-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Annuler
              </button>
              <button
                class="btn btn-primary submit-btn"
                type="button"
                data-bs-dismiss="modal"
                @click.prevent="addTaux"
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
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  name: "addtauxapporteur",
  props: ['tauxapporteurtoedit'],

  data() {
    return {
      branches: {},
      accidents: [],
      ids: [],
    };
  },
  methods: {
    getbranche() {
      axios
        .get(
          `/api/auth/getBrancheDiffApporteur/${this.$route.params.id_apporteur}`
        )
        .then((response) => {
          this.branches = response.data;
        })
        .catch((error) => {
          // this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },

    addTaux() {
      let test = JSON.parse(JSON.stringify(this.branches));
      let donnees = [];

      for (let i = 0; i < Object.keys(test).length; i++) {
        donnees.push(test[i]["value"]);
      }

      let testing = JSON.parse(JSON.stringify(this.branches));
      let datas = [];

      for (let i = 0; i < Object.keys(testing).length; i++) {
        datas.push(testing[i]["id_branche"]);
      }
      axios
        .post("/api/auth/postTauxApporteur", {
          id: this.$route.params.id_apporteur,
          accidents: donnees,
          ids: datas,
        })
        .then((response) => {
          this.$emit('tauxapporteur-add', response)
          if (response.status === 200) {
            toaster.success("Taux ajouté", {
              position: "top-right",
            });
          }
        });
    },
  },
  created() {
    this.getbranche();
  },
};
</script>
