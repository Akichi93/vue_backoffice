// clientfileStore.js
import { defineStore } from 'pinia';
import { createToaster } from "@meforma/vue-toaster";
import { apiUrl } from '../utils/constants/apiUrl';
import AxiosService from '../services/AxiosService';
import AppStorage from '../db/AppStorage';

export const useAutomobileFileStore = defineStore('automobilefile', {
    state: () => ({
        selectedFile: null,
        loading: false,
        progress: 0,
        error: null,
    }),
    actions: {
        initToaster() {
            this.toaster = createToaster();
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        csvToArray(str, delimiter = ',') {
            const rows = str.split('\n');
            const headers = rows[0].split(delimiter).map(header => header.trim().replace('\r', ''));
            const data = rows.slice(1).map(row => {
                const values = row.split(delimiter).map(value => value.trim().replace('\r', ''));
                const obj = headers.reduce((acc, header, i) => {
                    acc[header] = values[i];
                    return acc;
                }, {});
                return obj;
            });
            return data;
        },
        validateCsvHeaders(headers, expectedHeaders) {
            const cleanedHeaders = headers.map(header => header.trim().replace('\r', ''));
            return expectedHeaders.every(header => cleanedHeaders.includes(header));
        },
        async uploadFile(axios, uuidContrat) {
            if (!this.toaster) {
                this.initToaster();
            }

            if (!this.selectedFile) {
                this.toaster.error("Veuillez sélectionner un fichier à télécharger.", { position: "top-right" });
                return;
            }

            this.loading = true;

            const formData = new FormData();
            formData.append('import_auto', this.selectedFile);
            formData.append('uuidContrat', uuidContrat);

            const token = localStorage.getItem("token");
            if (!token) {
                this.toaster.error("Utilisateur non authentifié. Veuillez vous reconnecter.", { position: "top-right" });
                this.loading = false;
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                "x-access-token": token,
            };

            try {
                // Vérifier le mode
                this.currentMode = localStorage.getItem('mode');
                if (this.currentMode === "Local") {
                    // Lecture du fichier et traitement local
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const csvData = e.target.result;
                        const rows = csvData.split('\n');
                        const headers = rows[0].split(',').map(header => header.trim().replace('\r', ''));

                        const expectedHeaders = [
                            "numero_immatriculation",
                            "identification_proprietaire",
                            "date_circulation",
                            "adresse_proprietaire",
                            "categorie",
                            "marque",
                            "genre",
                            "type",
                            "carosserie",
                            "couleur",
                            "energie",
                            "place",
                            "puissance",
                            "charge",
                            "valeur_neuf",
                            "valeur_venale",
                            "categorie_socio_professionelle",
                            "permis"
                        ];

                        if (!this.validateCsvHeaders(headers, expectedHeaders)) {
                            this.toaster.error("Les entêtes du fichier CSV sont incorrectes.", { position: "top-right" });
                            this.loading = false;
                            return;
                        }

                        let data = this.csvToArray(csvData);

                        // Ajouter uuidContrat à chaque objet de données
                        data = data.map(record => ({
                            ...record,
                            uuidContrat
                        }));


                        AppStorage.storeDataInIndexedDB("automobiles", data);

                        const updatedAutomobiles = AppStorage.getAutomobileByUuidContrat(uuidContrat);

                        this.toaster.success("Données importées localement avec succès.", { position: "top-right" });

                        return updatedAutomobiles;
                    };

                    reader.onerror = () => {
                        this.toaster.error("Erreur lors de la lecture du fichier.", { position: "top-right" });
                    };

                    reader.readAsText(this.selectedFile);
                } else {
                    const updatedAutomobiles = await AxiosService.post(apiUrl.importautomobile, formData, {
                        headers,
                        onUploadProgress: (progressEvent) => {
                            if (progressEvent.lengthComputable) {
                                this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                            } else {
                                this.progress = 0;
                            }
                        },
                    });

                  
                    this.selectedFile = null;
                    this.progress = 0;
                    this.toaster.success("Base flotte importée avec succès.", { position: "top-right" });

                    return updatedAutomobiles;

                }
            } catch (error) {
                this.toaster.error("Une erreur s'est produite lors de l'envoi du fichier.", { position: "top-right" });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        isLoadingFile() {
            return this.loading;
        },
    },
});
