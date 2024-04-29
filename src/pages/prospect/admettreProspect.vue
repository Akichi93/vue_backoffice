<template>
  <div class="modal custom-modal fade" id="delete_project" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Admettre comme client</h3>
            <p>Vous êtes sur le point d'admettre le prospect comme client?</p>
          </div>
          <div class="modal-btn delete-action">
            <input type="hidden" class="form-control" v-model="prospectoedit.id_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.nom_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.civilite" />
            <input type="hidden" class="form-control" v-model="prospectoedit.postal_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.adresse_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.tel_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.profession_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.email_prospect" />
            <input type="hidden" class="form-control" v-model="prospectoedit.fax_prospect" />
            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary continue-btn">Annuler</a>
              </div>
              <div class="col-6">
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn"
                  @click="ChangeProspect">Admettre</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../../db/AppStorage.js";
import { createToaster } from "@meforma/vue-toaster";
import { v4 as uuidv4 } from 'uuid';
import switchService from '../../services/switchService.js';
const toaster = createToaster({
  /* options */
});
export default {
  props: ["prospectoedit"],
  name: "admettreProspect",
  methods: {
    async ChangeProspect() {
     
      // UUID du prospect que vous souhaitez mettre à jour
      const uuidProspectToUpdate = this.prospectoedit.uuidProspect;
      // console.log(uuidProspectToUpdate);

      // Nouvel état du prospect
      const newState = 1;
      const newSyncState = 0;


      try {
        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);
        const numeroClient = this.generateNumeroClient();
        // Appeler la fonction pour mettre à jour les données dans IndexedDB
        const updatedProspects = await switchService.changeProspect(uuidProspectToUpdate, newState, newSyncState,this.prospectoedit,entrepriseId,userId,numeroClient);


         // Émettre un événement avec les prospects mis à jour
        this.$emit("prospect-admettre", updatedProspects);

        toaster.success(`Nouveau client enregistré`, {
          position: "top-right",
        });

      } catch (error) {
        console.error('Erreur lors de la mise à jour du prospect :', error.message);
      }
    },

    generateNumeroClient() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const dateDuJour = year + month + day;

      const nom = this.prospectoedit.nom_prospect;
      const deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase();

      return `CL-${deuxPremiersCaracteres}-${dateDuJour}`;
    },
  },
};
</script>


<!-- -->