// clientfileStore.js
import { defineStore } from 'pinia';
import { createToaster } from "@meforma/vue-toaster";

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
        // Make the API request
        await axios.post('/api/auth/importprospect', formData, {
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
        this.toaster.success("Base prospect importé avec succès.", {
          position: "top-right",
        });
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
