<template>
  <div id="addGenre" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter genre</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom du genre</label>
                  <input type="text" id="client_nameName-field" class="form-control"
                    placeholder="Entrez une nouveau genre" v-model="ajout_genre" />
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button type="button" class="btn btn-primary submit-btn" @click="storeGenre" data-bs-dismiss="modal">
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
        ajout_genre: ''
      }
    },

    validateForm() {
      if (!this.ajout_genre) {
        toaster.error(`Veuillez entrer un genre`, {
          position: "top-right",
        });
        return false;
      }
      return true;
    },
    async storeGenre() {

      if (this.validateForm()) {
        const uuid = uuidv4();

        const genre = this.ajout_genre.toLocaleUpperCase()

        const newGenreData = [{
          uuidGenre: uuid,
          genre: genre,
          sync: 0,
        }];

        // Réinitialiser le formulaire après l'affichage du toaster success
        this.ajout_genre = '';


        // Enregistré les contrats dans IndexedDB
        await AppStorage.storeDataInIndexedDB("genres", newGenreData);

        // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
        const updatedGenres = await AppStorage.getMarques();

        // Émettre un événement avec les prospects mis à jour
        this.$emit("genre-add", updatedGenres);

        toaster.success(`Genre ajouté avec succès`, {
          position: "top-right",
        });
      }
      // axios
      // .post("/api/auth/postGenres", {
      //   ajout_genre: this.ajout_genre,
      // })
      // .then((response) => {
      //   this.$emit('genre-add', response.data)

      //   if (response.status === 200) {
      //     toaster.success(`Genre ajouté avec succès`, {
      //       position: "top-right",
      //     });

      //   }
      // })
      // .catch((error) => {
      // console.log(error.response.headers);

      //   if (error.response.status === 422) {
      //     this.errors = error.response.data.errors;
      //     // console.log("Message non enregisté")
      //   } else if (error.request) {
      //     // The request was made but no response was received
      //     console.log(error.request);
      //   } else {
      //     // Something happened in setting up the request that triggered an Error
      //     console.log("Error", error.message);
      //   }
      //  });
    },
  }
}
</script>