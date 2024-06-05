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
                      <a
                        href="/src/assets/BDAutomobile.xlsx"
                        download
                        class="edit-icon"
                        ><i
                          class="fas fa-download"
                          title="Télécharger le model"
                        ></i>
                      </a>
                    </h3>

                    <!-- <div v-if="error" class="error-message">
                            {{ error }}
                        </div> -->

                    <div class="form-group">
                      <label>Téléverser fichier</label>
                      <input
                        class="form-control"
                        type="file"
                        ref="fileInput"
                        @change="handleFileChange"
                        accept=".csv"
                        required
                      />
                    </div>
                    <div class="submit-section">
                      <button
                        v-if="!loading"
                        @click="uploadFile"
                        :disabled="loading"
                        class="btn btn-primary submit-btn"
                      >
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
import axios from "axios";
import { useAutomobileFileStore } from "../../store/automobilefile";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

export default {
  methods: {
    handleFileChange(event) {
      this.automobileFileStore.handleFileChange(event);
    },
    async uploadFile() {
      const uuidContrat = this.$route.params.uuidContrat;
      try {
        const updatedAuto = await this.automobileFileStore.uploadFile(
          axios,
          uuidContrat
        );
        this.$emit("auto-add", updatedAuto);
        toaster.success("Fichier téléversé avec succès!");
      } catch (error) {
        toaster.error("Erreur lors du téléversement du fichier.");
      }
    },
  },
  computed: {
    automobileFileStore() {
      return useAutomobileFileStore();
    },
    selectedFile() {
      return this.automobileFileStore.selectedFile;
    },
    loading() {
      return this.automobileFileStore.loading;
    },
    progress() {
      return this.automobileFileStore.progress;
    },
    error() {
      return this.automobileFileStore.error;
    },
  },
};
</script>
  

<style scoped>
.loading-container {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #e0e0e0;
  margin: 20px auto;
  animation: rotation 1s linear infinite;
}

.loading-progress {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 4px solid #4caf50;
  border-top: 4px solid transparent;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}

.loading-container p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: #000;
}
</style>