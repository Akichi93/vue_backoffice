// fileUtils.js
import { createToaster } from "@meforma/vue-toaster";
import { v4 as uuidv4 } from 'uuid';

export const fileUtils = {
  initToaster() {
    return createToaster({
      /* options */
    });
  },

  handleFileChange(event) {
    return event.target.files[0];
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

  async uploadFile({ axios, file, expectedHeaders, expectedTypes, storeName, endpoint }) {
    const toaster = this.initToaster();

    if (!file) {
      toaster.error("Veuillez sélectionner un fichier à télécharger.", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append('import_' + storeName, file);

    const token = localStorage.getItem("token");
    if (!token) {
      toaster.error("Utilisateur non authentifié. Veuillez vous reconnecter.", { position: "top-right" });
      return;
    }

    const headers = {
      Authorization: "Bearer " + token,
      "x-access-token": token,
    };

    try {
      const currentMode = localStorage.getItem('mode');
      if (currentMode === "Local") {
        const reader = new FileReader();

        reader.onload = (e) => {
          const csvData = e.target.result;
          const rows = csvData.split('\n');
          const headers = rows[0].split(',').map(header => header.trim().replace('\r', ''));

          if (!this.validateCsvHeaders(headers, expectedHeaders)) {
            toaster.error("Les entêtes du fichier CSV sont incorrectes.", { position: "top-right" });
            return;
          }

          let data = this.csvToArray(csvData);

          if (!this.validateCsvDataTypes(data, expectedTypes)) {
            toaster.error("Les types de données du fichier CSV sont incorrects. Consultez la console pour plus de détails.", { position: "top-right" });
            return;
          }

          data = data.map(record => ({
            ...record,
            uuid: uuidv4() // Générer un UUID pour chaque ligne
          }));

          AppStorage.storeDataInIndexedDB(storeName, data);

          toaster.success("Données importées localement avec succès.", { position: "top-right" });
        };

        reader.onerror = () => {
          toaster.error("Erreur lors de la lecture du fichier.", { position: "top-right" });
        };

        reader.readAsText(file);
      } else {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        const updatedData = await axios.post(`${base_url}${endpoint}`, formData, {
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
        toaster.success(`Base ${storeName} importée avec succès.`, { position: "top-right" });

        return updatedData;
      }
    } catch (error) {
      toaster.error("Une erreur s'est produite lors de l'envoi du fichier.", { position: "top-right" });
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
