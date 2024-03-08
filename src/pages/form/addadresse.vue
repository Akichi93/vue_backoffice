<template>
  <div id="addProspect" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter adresse</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom de la zone</label>
                  <input type="text" id="client_nameName-field" class="form-control"
                    placeholder="Entrez une nouvelle adresse" v-model="ajout_adresse" />
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button type="button" class="btn btn-primary submit-btn" @click="storeAdresse" data-bs-dismiss="modal">
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
import AppStorage from '../../db/AppStorage';
import { v4 as uuidv4 } from 'uuid';
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  methods: {
    data() {
      return {
        ajout_adresse: ''
      }
    },
    
    async storeAdresse() {
      
        const uuid = uuidv4();

        const newLocalisationData = [{
          uuidLocalisation: uuid,
          nom_ville: this.ajout_adresse,
          sync: 0,
        }];

        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("localisations", newLocalisationData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedLocalisations = await AppStorage.getLocalisations();

        // Émettre un événement avec les prospects mis à jour
        this.$emit("adresse-add", updatedLocalisations);

        toaster.success(`Adresse ajouté avec succès`, {
          position: "top-right",
        });

        // Réinitialiser le formulaire après l'affichage du toaster success
        this.ajout_adresse = '';
        // axios
        //   .post("/api/auth/postLocalisations", {
        //     ajout_adresse: this.ajout_adresse,
        //   })
        //   .then((response) => {
        //     this.$emit('adresse-add', response.data)

        //     if (response.status === 200) {
        //       toaster.success(`Adresse ajouté avec succès`, {
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