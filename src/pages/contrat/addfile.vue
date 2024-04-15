<template>
  <div id="add_file" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter pièce</h5>
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
          <form @submit="submit" @keydown="form.onKeydown($event)">
            <div class="row">
              <div class="col-md-12">
                <input
                  v-model="avenantoedit.id_avenant"
                  type="hidden"
                  name="id_avenant"
                />

                <!-- Titre de la pièce -->
                <div class="form-group">
                  <label for="titre">Titre de la pièce</label>
                  <input
                    id="titre"
                    v-model="form.titre"
                    type="text"
                    class="form-control"
                    placeholder="Titre de la pièce"
                    required
                  />
                  <!-- Ajoutez ici un élément pour afficher les erreurs liées au titre si nécessaire -->
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
                  />
                  <!-- Ajoutez ici un élément pour afficher les erreurs liées au fichier si nécessaire -->
                </div>
              </div>
            </div>

            <!-- Boutons Ajouter et Annuler -->
            <div class="form-group mt-3">
              <button type="submit" class="btn btn-primary m-3">Ajouter</button>
              <button type="reset" class="btn btn-danger ml-3">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HasError } from "vform/src/components/bootstrap5";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {
  components: {
    HasError,
  },
  props: ["avenantoedit"],
  data() {
    return {
      avenantoedit: {
        id_avenant: null, // Initialisez l'ID de l'avenant ici
      },
      form: {
        titre: "", // Initialisez le titre du formulaire ici
        file: null, // Initialisez le fichier à null
      },
    };
  },
  methods: {
    handleFileChange(event) {
      this.form.file = event.target.files[0]; // Mettez à jour le fichier dans le formulaire lorsque l'utilisateur sélectionne un fichier
    },
    async submitForm() {
      const formData = new FormData(); // Créez un objet FormData

      formData.append("id_avenant", this.avenantoedit.id_avenant);
      formData.append("titre", this.form.titre);
      formData.append("file", this.form.file); // Ajoutez le fichier au FormData

      try {
        // Effectuez une requête POST vers votre endpoint de backend avec le FormData
        const response = await fetch("URL_DE_VOTRE_ENDPOINT", {
          method: "POST",
          body: formData,
        });

        // Traitez la réponse du backend si nécessaire
        const responseData = await response.json();
        console.log("Réponse du serveur :", responseData);

        // Réinitialisez le formulaire après avoir réussi l'envoi
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire :", error);
        // Gérez les erreurs d'envoi du formulaire
      }
    },
    resetForm() {
      // Réinitialisez les valeurs du formulaire après soumission réussie
      this.form.titre = "";
      this.form.file = null;
    },
  },
};
</script>