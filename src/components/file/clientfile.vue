<!-- YourComponent.vue -->
<template>
    <div id="client_tab" class="pro-overview tab-pane fade show active">
        <div class="row">
            <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                    <div class="card-body">
                        <h3 class="card-title">
                            Clients
                            <a href="/src/assets/BDclient.xlsx" download class="edit-icon">
                                <i class="fas fa-download" title="Télécharger le modèle"></i>
                            </a>
                        </h3>

                        <!-- Section to display error messages -->
                        <div v-if="error" class="error-message">
                            {{ error }}
                        </div>

                        <div class="form-group">
                            <label>Téléverser fichier</label>
                            <input class="form-control" type="file" ref="fileInput" @change="handleFileChange" accept=".csv"
                                required />
                        </div>
                        <div class="submit-section">
                            <button v-if="!loading" @click="uploadFile" :disabled="loading"
                                class="btn btn-primary submit-btn">
                                Importer la base de données
                            </button>

                            <!-- Display the loading indicator if the file is being uploaded -->
                            <div v-if="loading" class="loading-container">
                                <div class="loading-progress" :style="{ transform: 'rotate(' + (progress * 3.6) + 'deg)' }">
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
import axios from 'axios';
import { useClientFileStore } from '../../store/clientfile';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    /* options */
});

export default {

    methods: {
        handleFileChange(event) {
            this.clientFileStore.handleFileChange(event);
        },
        async uploadFile() {
            await this.clientFileStore.uploadFile(axios);
        },
    },
    computed: {
        clientFileStore() {
            return useClientFileStore();
        },
        selectedFile() {
            return this.clientFileStore.selectedFile;
        },
        loading() {
            return this.clientFileStore.loading;
        },
        progress() {
            return this.clientFileStore.progress;
        },
        error() {
            return this.clientFileStore.error;
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
}</style>