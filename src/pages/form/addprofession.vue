<template>
    <div id="addMarque" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter profession</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Nom de la profession</label>
                    <input type="text" class="form-control" placeholder="Entrez une nouvelle marque"
                      v-model="ajout_profession" />
                  </div>
                </div>
              </div>
              <div class="submit-section">
                <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
                  Annuler
                </button>
                <button type="button" class="btn btn-primary submit-btn" @click="storeMarque" data-bs-dismiss="modal">
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
  // import $ from "jquery";
  const toaster = createToaster({
    /* options */
  });
  export default {
    methods: {
      data() {
        return {
            ajout_profession: ''
        }
      },
      storeMarque() {
        
        axios
          .post("/api/auth/postProfessions", {
            ajout_profession: this.ajout_profession,
          })
          .then((response) => {
            this.$emit('marque-add', response.data)
  
            if (response.status === 200) {
              toaster.success(`Marque ajouté avec succès`, {
                position: "top-right",
              });
            }
          })
          .catch((error) => {
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
          });
      },
  
    }
  }
  </script>