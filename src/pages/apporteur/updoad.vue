<template>
    <div id="add_file" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter preuve de paiement</h5>
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
                <div class="col-md-12">
                  <!-- Titre de la pièce -->
                  <div class="form-group">
                    <label for="titre">Titre de la pièce</label>
                    <input
                      id="titre"
                      v-model="titre"
                      type="text"
                      class="form-control"
                      placeholder="Titre de la pièce"
                      required
                    />
                  </div>
  
                  <!-- Pièce (fichier) -->
                  <div class="form-group">
                    <label for="piece">Pièce</label>
                    <input
                      type="file"
                      id="piece"
                      name="file"
                      class="form-control-file"
                      accept="image/*,.pdf"
                      @change="handleFile"
                      required
                    />
                  </div>
                </div>
              </div>
  
              <!-- Boutons Ajouter et Annuler -->
              <div class="form-group mt-3">
                <button
                  data-bs-dismiss="modal"
                  type="button"
                  class="btn btn-primary m-3"
                  @click="submitForm"
                >
                  Ajouter
                </button>
                <button type="reset" class="btn btn-danger ml-3">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AppStorage from "../../db/AppStorage";
  import syncservice from "../../services/syncService.js";
  import { apiUrl } from "../../utils/constants/apiUrl";
  import axios from "axios";
  import { createToaster } from "@meforma/vue-toaster";
  const toaster = createToaster({
    /* options */
  });
  export default {
    props: ["avenantoedit"],
    data() {
      return {
        form: {
          titre: "", // Initialisez le titre du formulaire ici
          file: null, // Initialisez le fichier à null
        },
      };
    },
    methods: {
      async handleFile(event) {
        this.file = event.target.files[0]; // Stocker le fichier sélectionné dans form.file
      },
      async submitForm() {
        try {
          const isConnected = await this.checkInternetConnection();
          if (!isConnected) {
            toaster.error(
              `Veuillez vous connecter à Internet pour effectuer cette action.`,
              {
                position: "top-right",
              }
            );
            // console.log(
            //   "Veuillez vous connecter à Internet pour effectuer cette action."
            // );
            return;
          }
  
          await syncservice.checkAndSyncData();
  
          const formData = new FormData();
          formData.append("titre", this.titre);
          formData.append("image", this.file);
          formData.append("uuidAvenant", this.avenantoedit.uuidAvenant);
          formData.append("identreprise", AppStorage.getEntreprise());
  
          // Send formData to server using axios
          const response = await axios.post(apiUrl.postfileavenant, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${token}`,
            },
          });
  
          console.log("Réponse du serveur:", response.data);
  
          // Réinitialiser les champs du formulaire après l'envoi réussi
          this.titre = "";
          this.file = null;
  
          // Fermer le modal après l'envoi réussi
          // Par exemple, si vous utilisez Bootstrap, vous pouvez appeler une fonction pour fermer le modal ici
          // this.$refs.modal.close();
        } catch (error) {
          console.error("Erreur lors de l'envoi du formulaire:", error);
          // Gérer les erreurs ici, par exemple, afficher un message à l'utilisateur
        }
      },
  
      async checkInternetConnection() {
        try {
          const apiUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(
            `${apiUrl}/api/check-internet-connection`
          );
          return response.data.connected;
        } catch (error) {
          console.error(
            "Erreur lors de la vérification de la connexion Internet :",
            error
          );
          return false;
        }
      },
    },
  };
  </script>