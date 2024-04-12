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
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.branche_id"
                  v-text="errors.branche_id"
                ></p>
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
              @click="addBranche"
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
import { v4 as uuidv4 } from "uuid";
import { createToaster } from "@meforma/vue-toaster";
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
      AppStorage.getDifferenceOfBranches().then((result) => {
        this.branches = result;
      });
    },

    async addBranche() {
      this.errors = validateBrancheProspectForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        // Afficher un message d'erreur
        toaster.error(`Veuillez remplir les champs`, {
          position: "top-right",
        });
      }
      if (Object.keys(this.errors).length === 0) {
        const uuid = uuidv4();

        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
        const uuidProspect = this.$route.params.uuidProspect;

        // Si hors ligne, ajoutez la nouvelle donnée directement dans IndexedDB
        const newBrancheProspectData = [
          {
            uuidBrancheProspect: uuid,
            uuidBranche: this.form.branche_id,
            description: this.form.description,
            id_entreprise: entrepriseId,
            id: userId,
            uuidProspect: uuidProspect,
            sync: 0,
          },
        ];

        try {
          await AppStorage.storeDataInIndexedDB(
            "brancheprospects",
            newBrancheProspectData
          );

          // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
          const updatedBrancheProspects = await AppStorage.getBrancheProspectsByuuidProspect(
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
      }
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>