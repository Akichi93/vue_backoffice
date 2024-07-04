import { defineStore } from 'pinia';
import { createToaster } from "@meforma/vue-toaster";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator if needed

export const useProspectFileStore = defineStore('prospectfile', {
  state: () => ({
    selectedFile: null,
    loading: false,
    progress: 0,
    error: null,
  }),
  actions: {
    initToaster() {
      // Initialize toaster instance
      this.toaster = createToaster({
        /* options */
      });
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
    async uploadFile(axios) {
      // Initialize toaster if not done already
      if (!this.toaster) {
        this.initToaster();
      }

      // Set the loading flag to true
      this.loading = true;

      // Create FormData and append the file
      const formData = new FormData();
      formData.append('import_prospect', this.selectedFile);

      // Access the token from your authentication system
      const token = localStorage.getItem("token");

      // Set headers
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };

      try {
        // Check if mode is Local
        const currentMode = localStorage.getItem('mode');
        if (currentMode === "Local") {
          const reader = new FileReader();

          reader.onload = (e) => {
            const csvData = e.target.result;
            const rows = csvData.split('\n');
            const headers = rows[0].split(',').map(header => header.trim().replace('\r', ''));

            const expectedHeaders = [
              "civilite",
              "nom_prospect",
              "postal_prospect",
              "adresse_prospect",
              "tel_prospect",
              "profession_prospect",
              "fax_prospect",
              "email_prospect",
            ];

            if (!this.validateCsvHeaders(headers, expectedHeaders)) {
              this.toaster.error("Les entêtes du fichier CSV sont incorrectes.", { position: "top-right" });
              this.loading = false;
              return;
            }

            let data = this.csvToArray(csvData);

            const expectedTypes = {
              civilite : 'string',
              nom_prospect : 'string',
              postal_prospect : 'string',
              adresse_prospect : 'string',
              tel_prospect : 'string',
              profession_prospect : 'string',
              fax_prospect : 'string',
              email_prospect : 'email',
            };

            if (!this.validateCsvDataTypes(data, expectedTypes)) {
              this.toaster.error("Les types de données du fichier CSV sont incorrects. Consultez la console pour plus de détails.", { position: "top-right" });
              this.loading = false;
              return;
            }

            data = data.map(record => ({
              ...record,
              uuidProspect: uuidv4() // Générer un UUID pour chaque ligne
            }));

            AppStorage.storeDataInIndexedDB("prospects", data);

            this.toaster.success("Données importées localement avec succès.", { position: "top-right" });

          };

          reader.onerror = () => {
            this.toaster.error("Erreur lors de la lecture du fichier.", { position: "top-right" });
          };

          reader.readAsText(this.selectedFile);
        } else {
          // Get the base URL from the environment variables
          const base_url = import.meta.env.VITE_API_BASE_URL;
          // Make the API request
          const updatedProspects = await axios.post(`${base_url}/api/auth/importprospect`, formData, {
            headers,
            onUploadProgress: (progressEvent) => {
              if (progressEvent.lengthComputable) {
                // Update the progress state
                this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              } else {
                // Fallback to 0 if total size is not computable
                this.progress = 0;
              }
            },
          });

          // Reset state on successful upload
          this.selectedFile = null;
          this.progress = 0;

          // Display success message using toaster
          this.toaster.success("Base prospect importée avec succès.", {
            position: "top-right",
          });

          return updatedProspects;
        }
      } catch (error) {
        // Display error message using toaster
        this.toaster.error("Une erreur s'est produite lors de l'envoi du fichier.", {
          position: "top-right",
        });
        console.error(error);
      } finally {
        // Reset loading state
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
