<template>
  <div id="edit_compagnie" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier compagnie</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom complet de la compagnie</label>
                  <input type="text" class="form-control" v-model="compagnietoedit.nom_compagnie" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control" v-model="compagnietoedit.email_compagnie" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Contact</label>
                  <input type="text" class="form-control" v-model="compagnietoedit.contact_compagnie" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Adresse</label>
                  <adressecomponent :placeholder="'selectionnez l\'adresse'" v-model="compagnietoedit.adresse_compagnie">
                  </adressecomponent>
                </div>
              </div>
            </div>
            <div class="submit-section">
              <button class="btn btn-primary cancel-btn" type="button" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button class="btn btn-primary submit-btn" type="button" data-bs-dismiss="modal"
                @click.prevent="compagnieUpdate">
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from '../../db/AppStorage.js';
import adressecomponent from "../../components/select/adressecomponent.vue";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  props: ['compagnietoedit'],
  name: "editcompagnie",
  components: {
    adressecomponent,
  },
  methods: {
    async compagnieUpdate() {
      const uuidCompagnieToUpdate = this.compagnietoedit.uuidCompagnie;

      const nouvellesInfos = {
        nom_compagnie: this.compagnietoedit.nom_compagnie,
        adresse_compagnie: this.compagnietoedit.adresse_compagnie,
        email_compagnie: this.compagnietoedit.email_compagnie,
        postal_compagnie: this.compagnietoedit.postal_compagnie,
        contact_compagnie: this.compagnietoedit.contact_compagnie,
        postal_compagnie: this.compagnietoedit.postal_compagnie,
        sync: 0,
      };



      await AppStorage.updateCompagnie(uuidCompagnieToUpdate, nouvellesInfos);

      const updatedCompagnies = await AppStorage.getCompagnies();

      // Émettre un événement avec les compagnues mis à jour
      this.$emit("compagnie-updated", updatedCompagnies);

      toaster.success(`Compagnie modifié avec succès`, {
          position: "top-right",
        });

      // axios.patch("/api/auth/updateCompagnie/" + this.compagnietoedit.id_compagnie, {
      //   nom_compagnie: this.compagnietoedit.nom_compagnie,
      //   email_compagnie: this.compagnietoedit.email_compagnie,
      //   contact_compagnie: this.compagnietoedit.contact_compagnie,
      //   adresse_compagnie: this.compagnietoedit.adresse_compagnie,
      //   id_entreprise: entrepriseId,
      // })
      //   .then((response) => {
      //     this.$emit('compagnie-updated', response)
      //     toaster.success(`Compagnie modifié avec succès`, {
      //       position: "top-right",
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   });
    }
  },
}
</script>


