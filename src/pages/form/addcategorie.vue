<template>
  <div id="addCategorie" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter catégorie</h5>
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
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom de la categorie</label>
                  <input
                    type="text"
                    id="client_nameName-field"
                    class="form-control"
                    placeholder="Entrez une nouvelle categorie"
                    v-model="ajout_cat"
                  />
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
                @click="storeCategorie"
                data-bs-dismiss="modal"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  methods: {
    data() {
      return {
        ajout_cat: "",
      };
    },
    validateForm() {
      if (!this.ajout_cat) {
        toaster.error(`Veuillez entrer une catégorie`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },
    async storeCategorie() {
      if (this.validateForm()) {
        const categorie = this.ajout_cat;
        const updatedLocalisations = await switchService.storeCategorie(categorie);
        // Émettre un événement avec les prospects mis à jour
        this.$emit("categorie-add", updatedLocalisations);

        // Réinitialiser le formulaire après l'affichage du toaster success
        this.ajout_cat = "";

        toaster.success(`Energie ajouté avec succès`, {
          position: "top-right",
        });
      }

      // axios
      //   .post("/api/auth/postCategories", {
      //     ajout_cat: this.ajout_cat,
      //   })
      //   .then((response) => {
      //     this.$emit("categorie-add", response.data);
      //     if (response.status === 200) {
      //       toaster.success(`Categorie ajouté avec succès`, {
      //         position: "top-right",
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     // console.log(error.response.headers);
      //     // if (error.response.status === 422) {
      //     //   this.errors = error.response.data.errors;
      //     //   // console.log("Message non enregisté")
      //     // } else if (error.request) {
      //     //   // The request was made but no response was received
      //     //   console.log(error.request);
      //     // } else {
      //     //   // Something happened in setting up the request that triggered an Error
      //     //   console.log("Error", error.message);
      //     // }
      //   });
    },
  },
};
</script>