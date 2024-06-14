<template>
  <div id="add_avenant" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une emission</h5>
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
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Type</label>
                <typeavenantcomponent
                  v-model="type"
                  :placeholder="'selectionnez un type'"
                ></typeavenantcomponent>
                <!-- <Multiselect v-model="type" :options="modes" placeholder="Choisir le mode" :searchable="true" /> -->
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Prime nette</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Entrez la prime nette"
                  v-model="prime_nette"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Accessoires</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Entrez ..."
                  v-model="accessoires"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Frais courtier</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Frais courtier"
                  v-model="frais_courtier"
                />
              </div>
            </div>

            <div class="col-sm-12">
              <div class="form-group">
                <label>Taxes totales</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Taxes totales"
                  v-model="taxes_totales"
                />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Prime ttc</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Entrez la prime ttc"
                  v-model="prime_ttc"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Date de debut</label>
            <input
              class="form-control"
              placeholder="Date de debut"
              type="date"
              v-model="date_debut"
            />
          </div>
          <div class="form-group">
            <label>Date de fin</label>
            <input
              class="form-control"
              placeholder="Date de fin"
              type="date"
              v-model="date_fin"
            />
          </div>
          <div class="submit-section">
            <button
              type="button"
              class="btn btn-primary cancel-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Annuler
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-primary submit-btn"
              @click="addAvenant"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import typeavenantcomponent from "../../components/select/typeavenantcomponent.vue";
import { v4 as uuidv4 } from "uuid";
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from "../../db/AppStorage";
import switchService from '../../services/switchService';
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  components: { typeavenantcomponent },
  data() {
    return {
      type: "",
      prime_ttc: "",
      prime_nette: "",
      ristourne: "",
      retrocession: "",
      commission: "",
      prise_charge: "",
      date_emission: "",
      taxes_totales: "",
      frais_courtier: "",
      accessoires: "",
      date_debut: "",
      date_fin: "",
    };
  },
  methods: {
    components: {
      Multiselect,
    },

    getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return year + month + day;
    },

    async addAvenant() {
      try {
        const uuidContrat = this.$route.params.uuidContrat;
        const uuidAvenant = uuidv4();
        const infocontrat = await AppStorage.getContratByUuid(uuidContrat);
        const uuidBranche = infocontrat.uuidBranche;
        const uuidCompagnie = infocontrat.uuidCompagnie;
        const uuidApporteur = infocontrat.uuidApporteur;
        const tauxcomp = await AppStorage.getTauxwithCompagnieAndBranche(
          uuidBranche,
          uuidCompagnie
        );
        const taux = await AppStorage.getTauxwithApporteurAndBranche(
          uuidBranche,
          uuidApporteur
        );

        const codeAvenant = this.generateCodevenant();

        const calculateCommission = () => {
          return this.prime_nette * taux * 0.01 * tauxcomp * 0.01;
        };

        const calculateCommissionCourtier = () => {
          return this.prime_nette * tauxcomp * 0.01;
        };

        const userId = parseInt(AppStorage.getId(), 10);
        const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

        // Appeler la fonction storeAvenant avec les paramètres nécessaires
        const updatedAvenants = await switchService.storeAvenant(
          this.form,
          userId,
          entrepriseId,
          uuidContrat,
          uuidAvenant,
          infocontrat,
          codeAvenant,
          calculateCommission,
          calculateCommissionCourtier
        );

        // Émettre un événement avec les avenants mis à jour
        this.$emit("avenant-add", updatedAvenants);

        toaster.success(`Avenant ajouté`, {
          position: "top-right",
        });
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'avenant:", error);
        toaster.error("Erreur lors de l'ajout de l'avenant", {
          position: "top-right",
        });
      }
    },

    generateCodevenant() {
      let dateDuJour = this.getFormattedDate();
      return "AV-" + dateDuJour;
    },

    // async getTauxCompagnie(uuidBranche, uuidCompagnie) {

    //   const infocontrat = await AppStorage.getContratByUuid(uuidContrat)

    //   // let uuidBranche = infocontrat.uuidBranche;
    //   // let uuidCompagnie = infocontrat.uuidCompagnie;
    //   // Appel à votre méthode pour récupérer les taux
    //   const taux = await AppStorage.getTauxwithCompagnieAndBranche(uuidBranche, uuidCompagnie);

    //   console.log(taux)
    //   return taux;
    // },
  },
};
</script>