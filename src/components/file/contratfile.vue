<template>
    <div class="tab-pane fade" id="contrats_tab">
        <div class="row">
            <div class="col-md-12 d-flex">
                <div class="card profile-box flex-fill">
                    <div class="card-body">
                        <h3 class="card-title">
                            Contrats
                            <a href="BDcontrat.xlsx" download class="edit-icon"><i class="fas fa-download"
                                    title="Télécharger le model"></i>
                            </a>
                        </h3>

                        <!-- Section pour afficher les messages d'erreur -->
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
                                Importer la base de donnée
                            </button>

                            <!-- Afficher l'indicateur de chargement si le fichier est en cours d'envoi -->
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
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
    /* options */
});

export default {
    data() {
        return {
            selectedFile: null,
            loading: false, // Ajout de la variable pour l'indicateur de chargement
            progress: 0, // Ajout de la variable pour le progrès de l'envoi
            error: null, // Ajout de la variable d'erreur
        };
    },
    methods: {
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        uploadFile() {
            if (!this.selectedFile) {
                // alert('Veuillez sélectionner un fichier CSV.');
                toaster.error("Veuillez sélectionner un fichier CSV.", {
                    position: "top-right",
                });
                return;
            }

            this.loading = true; // Activer l'indicateur de chargement

            const formData = new FormData();
            formData.append('import_client', this.selectedFile);

            const token = localStorage.getItem("token");

            const headers = {
                Authorization: "Bearer " + token,
                "x-access-token": token,
            };

            axios.post('/api/auth/importclient', formData, {
                headers,
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.lengthComputable) {
                        this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    } else {
                        this.progress = 0; // Fallback to 0 if total size is not computable
                    }
                },

            })
                .then(response => {
                    console.log(response.data);
                    this.selectedFile = ""; // Réinitialiser le champ de fichier après l'envoi réussi
                    toaster.success("Fichier importé avec succès.", {
                        position: "top-right",
                    });
                    // alert('Fichier importé avec succès.');
                    // Traitez les erreurs ici si nécessaire
                    if (response.data.error) {
                        // Affichez ou traitez les erreurs côté client
                        console.error(response.data.error);
                    }

                    // Traitez les données réussies ici si nécessaire
                    if (response.data.success) {
                        // Affichez un message de réussite ou effectuez d'autres actions
                        console.log(response.data.success);
                    }

                    // Traitez les lignes invalides ici si nécessaire
                    if (response.data.details && response.data.details.invalid_rows) {
                        // Affichez ou traitez les lignes invalides côté client
                        console.error(response.data.details.invalid_rows);
                    }

                    // Traitez les doublons ici si nécessaire
                    if (response.data.details && response.data.details.duplicate_rows) {
                        // Affichez ou traitez les doublons côté client
                        console.error(response.data.details.duplicate_rows);
                    }
                })
                .catch(error => {
                    console.error(error);
                    toaster.error("Une erreur s\'est produite lors de l\'envoi du fichier.", {
                        position: "top-right",
                    });
                    // alert('Une erreur s\'est produite lors de l\'envoi du fichier.');
                })
                .finally(() => {
                    this.loading = false; // Désactiver l'indicateur de chargement, peu importe le résultat
                    this.progress = 0; // Réinitialiser le progrès une fois terminé
                });
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
