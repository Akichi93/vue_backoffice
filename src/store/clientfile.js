import { defineStore } from 'pinia';
import { createToaster } from "@meforma/vue-toaster";
import { apiUrl } from '../utils/constants/apiUrl';
import AxiosService from '../services/AxiosService';
import AppStorage from '../db/AppStorage';
import { v4 as uuidv4 } from 'uuid';

export const useClientFileStore = defineStore('clientfile', {
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
    validateCsvDataTypes(data, expectedTypes) {
      const typeValidators = {
        string: value => typeof value === 'string',
        email: value => value === '' || /\S+@\S+\.\S+/.test(value), // Allow empty string or valid email
        // Add other type validators as needed
      };

      const invalidRows = [];

      const isValid = data.every((row, rowIndex) => {
        const invalidFields = Object.entries(expectedTypes).filter(([key, type]) => {
          if (!typeValidators[type]) {
            return false; // No validator for this type
          }
          return !typeValidators[type](row[key]);
        });

        if (invalidFields.length > 0) {
          invalidRows.push({
            row: rowIndex + 2, // Adjust for header row and 0-based index
            invalidFields: invalidFields.map(([key]) => key),
          });
          return false;
        }

        return true;
      });

      if (!isValid) {
        console.log("Invalid rows:", invalidRows);
      }

      return isValid;
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
      formData.append('import_client', this.selectedFile);
      // formData.append('uuidContrat', uuidContrat);

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
        this.currentMode = localStorage.getItem('mode');
        if (this.currentMode === "Local") {
          const reader = new FileReader();

          reader.onload = (e) => {
            const csvData = e.target.result;
            const rows = csvData.split('\n');
            const headers = rows[0].split(',').map(header => header.trim().replace('\r', ''));

            const expectedHeaders = [
              "civilite",
              "nom_client",
              "postal_client",
              "adresse_client",
              "tel_client",
              "profession_client",
              "fax_client",
              "email_client",
              "numero_client"
            ];

            if (!this.validateCsvHeaders(headers, expectedHeaders)) {
              this.toaster.error("Les entêtes du fichier CSV sont incorrectes.", { position: "top-right" });
              this.loading = false;
              return;
            }

            let data = this.csvToArray(csvData);

            const expectedTypes = {
              civilite: 'string',
              nom_client: 'string',
              postal_client: 'string',
              adresse_client: 'string',
              tel_client: 'string',
              profession_client: 'string',
              fax_client: 'string',
              email_client: 'email',
              numero_client: 'string',
            };

            if (!this.validateCsvDataTypes(data, expectedTypes)) {
              this.toaster.error("Les types de données du fichier CSV sont incorrects. Consultez la console pour plus de détails.", { position: "top-right" });
              this.loading = false;
              return;
            }

            data = data.map(record => ({
              ...record,
              uuidClient: uuidv4() // Générer un UUID pour chaque ligne
            }));

            const updatedClients = AppStorage.storeDataInIndexedDB("clients", data);

            this.toaster.success("Données importées localement avec succès.", { position: "top-right" });

            return updatedClients;
          };

          reader.onerror = () => {
            this.toaster.error("Erreur lors de la lecture du fichier.", { position: "top-right" });
          };

          reader.readAsText(this.selectedFile);
        } else {
          const updatedClients = await AxiosService.post(apiUrl.importclient, formData, {
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
          this.toaster.success("Base client importée avec succès.", { position: "top-right" });

          return updatedClients;
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
