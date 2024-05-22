<template>
    <div class="modal custom-modal fade" id="validate_tarification" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Valider tarification</h3>
              <p>Ëtes-vous sur de valider la tarification?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <input type="hidden" v-model="entreprisetoedit.id_entreprise" />
                <input type="hidden" v-model="entreprisetoedit.nom" />
                <input type="hidden" v-model="entreprisetoedit.contact" />
                <input type="hidden" v-model="entreprisetoedit.adresse" />
                <input type="hidden" v-model="entreprisetoedit.email" />
                <div class="col-6">
                  <a
                    href="javascript:void(0);"
                    data-bs-dismiss="modal"
                    class="btn btn-primary continue-btn"
                    @click="tarificationEntreprise"
                    >Valider</a
                  >
                </div>
                <div class="col-6">
                  <a
                    href="javascript:void(0);"
                    data-bs-dismiss="modal"
                    class="btn btn-primary cancel-btn"
                    >Annuler</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  import { createToaster } from "@meforma/vue-toaster";
  // import $ from "jquery";
  const toaster = createToaster({
    /* options */
  });
  export default {
    props: ["entreprisetoedit"],
    methods: {
      async tarificationEntreprise() {
        try {
          const base_url = import.meta.env.VITE_API_BASE_URL;
          const apiUrl = `${base_url}/api/auth/tarificationentreprise`;
  
          const response = await axios.patch(apiUrl, {
            entreprise: this.entreprisetoedit.id_entreprise,
            nom: this.entreprisetoedit.nom,
            contact: this.entreprisetoedit.contact,
            email: this.entreprisetoedit.email,
            adresse: this.entreprisetoedit.adresse,
          });
  
          if (response.status === 200) {
            // this.fetchData(); // Assuming fetchData() updates enterprise data after editing
            toaster.success("Nouvelle tarification enregistrée", {
              position: "top-right",
            });
          }
  
          console.log(response.data); // Log the response data if needed
        } catch (error) {
          console.error("Error updating entreprise:", error);
          // Optionally, show a user-friendly error message or handle the error
        }
      },
    },
  };
  </script>