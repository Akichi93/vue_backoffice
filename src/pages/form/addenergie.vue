<template>
  <div id="addEnergie" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter energie</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom de l'energie</label>
                  <input type="text" id="client_nameName-field" class="form-control"
                    placeholder="Entrez une nouvelle energie" v-model="ajout_energie" />
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button type="button" class="btn btn-primary submit-btn" @click="storeEnergie" data-bs-dismiss="modal">
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
import switchService from '../../services/switchService';
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  methods: {
    data() {
      return {
        ajout_energie: ''
      }
    },
    validateForm() {
      if (!this.ajout_energie) {
        toaster.error(`Veuillez entrer une energie`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },
    async storeEnergie() {
      if (this.validateForm()) {

        const energie = this.ajout_energie;
        const updatedEnergies = await switchService.storeEnergie(energie);
        

        // Réinitialiser le formulaire après l'affichage du toaster success
       
        this.$emit("energie-add", updatedEnergies);

        this.ajout_energie = '';

        toaster.success(`Energie ajouté avec succès`, {
          position: "top-right",
        });
      }
      // axios
      //   .post("/api/auth/postEnergies", {
      //     ajout_energie: this.ajout_energie,
      //   })
      //   .then((response) => {
      //     this.$emit("energie-add", response.data);

      //     if (response.status === 200) {
      //       toaster.success(`Energie ajouté avec succès`, {
      //         position: "top-right",
      //       });
      //     }
      //   })
      //   .catch((error) => {
      // console.log(error.response.headers);

      // if (error.response.status === 422) {
      //   this.errors = error.response.data.errors;
      //   // console.log("Message non enregisté")
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log("Error", error.message);
      // }
      // });
    },
  }
}
</script>