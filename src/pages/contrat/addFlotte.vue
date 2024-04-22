<template>
  <div id="add_flotte" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une flotte</h5>
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
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                    <div class="card-body">
                        <h3 class="card-title">
                            
                            <a href="/src/assets/BDapporteur.xlsx" download class="edit-icon"><i class="fas fa-download"
                                    title="Télécharger le model"></i>
                            </a>
                        </h3>

                        <!-- <div v-if="error" class="error-message">
                            {{ error }}
                        </div> -->

                        <div class="form-group">
                            <label>Téléverser fichier</label>
                            <input class="form-control" type="file" ref="fileInput" @change="handleFileChange" accept=".csv"
                                required />
                        </div>
                        <div class="submit-section">
                            <button v-if="!loading" @click="uploadFile" :disabled="loading"
                                class="btn btn-primary submit-btn">
                                Importer la base de donnée
                            </button>

                            <!-- Afficher l'indicateur de chargement si le fichier est en cours d'envoi -->
                            <!-- <div v-if="loading" class="loading-container">
                                <div class="loading-progress" :style="{ transform: 'rotate(' + (progress * 3.6) + 'deg)' }">
                                </div>
                            </div> -->
                        </div>

                    </div>
                </div>
              </div>
            </div>
          </div>

      
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Multiselect from "@vueform/multiselect";
import AppStorage from "../../db/AppStorage";
import { v4 as uuidv4 } from "uuid";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {};
</script>