<template>
  <div id="edit_apporteur" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier apporteur</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <input type="hidden" class="form-control" v-model="apporteurtoedit.id_apporteur" />
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Nom complet de l'apporteur</label>
                <input type="text" class="form-control" v-model="apporteurtoedit.nom_apporteur" />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model="apporteurtoedit.email_apporteur" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Contact</label>
                <input type="text" class="form-control" v-model="apporteurtoedit.contact_apporteur" />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Ville</label>
                <adressecomponent :placeholder="'selectionnez l\'adresse'" v-model="apporteurtoedit.adresse_apporteur">
                </adressecomponent>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Code postal</label>
                <input type="text" class="form-control" v-model="apporteurtoedit.code_postal" />
              </div>
            </div>
          </div>
          <div class="submit-section">
            <button class="btn btn-primary cancel-btn" type="button" data-bs-dismiss="modal" aria-label="Close">
              Annuler
            </button>
            <button class="btn btn-primary submit-btn" type="button" @click.prevent="apporteurUpdate"
              data-bs-dismiss="modal">
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../../db/AppStorage.js";
import adressecomponent from "../../components/select/adressecomponent.vue";
import { createToaster } from "@meforma/vue-toaster";
import switchService from "../../services/switchService";
const toaster = createToaster({
  /* options */
});
export default {
  props: ["apporteurtoedit"],
  name: "editapporteur",
  components: {
    adressecomponent,
  },
  data() {
    return {
      branches: {},
    };
  },
  methods: {
    async apporteurUpdate() {
      const uuidApporteurToUpdate = this.apporteurtoedit.uuidApporteur;
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
      try {

        const updatedApporteurs = await switchService.updateApporteur(
          this.apporteurtoedit,
          uuidApporteurToUpdate,
          entrepriseId
        );

        console.log(updatedApporteurs);

        // Émettre un événement avec les compagnues mis à jour
        this.$emit("apporteur-updated", updatedApporteurs);

        toaster.success(`Apporteur modifié avec succès`, {
          position: "top-right",
        });
      } catch (error) {
        // Gérer d'autres erreurs ici, par exemple les erreurs réseau ou les erreurs inattendues
        console.error("Une erreur s'est produite :", error);
        toaster.error(
          `Une erreur s'est produite lors de la mise à jour du client`,
          {
            position: "top-right",
            duration: 4000,
          }
        );
      }
    },
  },
};
</script>
