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
import switchService from '../../services/switchService';
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

        const genre = this.ajout_genre;
        const updatedGenres = await switchService.storeGenre(genre);
       
      

        this.$emit("genre-add", updatedGenres);

        this.ajout_genre = '';

        toaster.success(`Genre ajouté avec succès`, {
          position: "top-right",
        });
      }
    },
  }
}
</script>