<template>
  <div id="add_brancheprospect" class="modal custom-modal fade" role="dialog">
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
            <div class="col-sm-12">
              <div class="form-group">
                <label>Branches</label>
                <Multiselect
                  v-model="form.branche_id"
                  :options="branches"
                  :custom-label="
                    ({ uuidBranche, nom_branche }) =>
                      `${uuidBranche} - [${nom_branche}]`
                  "
                  valueProp="uuidBranche"
                  placeholder="Selectionnez une branche"
                  label="nom_branche"
                  track-by="nom_branche"
                  :searchable="true"
                  class="form-control"
                >
                </Multiselect>
              </div>
            </div>

            <div class="col-sm-12">
              <div class="form-group">
                <label>Commentaires</label>
                <textarea
                  class="form-control"
                  v-model="form.description"
                  cols="30"
                  rows="5"
                ></textarea>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.description"
                  v-text="errors.description"
                ></p>
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
              @click="addProspectBranche"
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
import Multiselect from "@vueform/multiselect";
import { validateBrancheProspectForm } from "../../utils/helpers/formValidation";
import { createToaster } from "@meforma/vue-toaster";
import offlineService from "../../services/offlineService";
import switchService from "../../services/switchService";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  data() {
    return {
      branches: {},
      form: {
        branche_id: "",
        description: "",
      },
      errors: {},
    };
  },
  components: { Multiselect },
  created() {
    this.getbranche();
  },
  methods: {
    async getbranche() {
      const uuidProspect = this.$route.params.uuidProspect;
      this.branches = await switchService.getDifferenceOfBranches(uuidProspect);
      // AppStorage.getDifferenceOfBranches(uuidProspect).then((result) => {
      //   this.branches = result;
      // });
    },

    async addProspectBranche() {
      this.errors = validateBrancheProspectForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }

      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
      const uuidProspect = this.$route.params.uuidProspect;

      try {

        const updatedBrancheProspects = await switchService.addProspectBranche(
          this.form,
          userId,
          entrepriseId,
          uuidProspect
        );

        // Émettre un événement avec les prospects mis à jour
        this.$emit("brancheprospect-add", updatedBrancheProspects);

        toaster.success(`La branche à été ajouté avec succès`, {
          position: "top-right",
        });
      } catch (error) {
        console.error(
          "Erreur lors de l'insertion des données dans IndexedDB:",
          error
        );
      }
    },
  },
};
</script>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->