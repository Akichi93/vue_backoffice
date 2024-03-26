<template>
  <div id="add_avenant" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une emission</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Type</label>
                <typeavenantcomponent v-model="type" :placeholder="'selectionnez un type'"></typeavenantcomponent>
                <!-- <Multiselect v-model="type" :options="modes" placeholder="Choisir le mode" :searchable="true" /> -->
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Prime nette</label>
                <input type="number" class="form-control" placeholder="Entrez la prime nette" v-model="prime_nette" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Accessoires</label>
                <input type="number" class="form-control" placeholder="Entrez ..." v-model="accessoires" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Frais courtier</label>
                <input type="number" class="form-control" placeholder="Frais courtier" v-model="frais_courtier" />
              </div>
            </div>

            <div class="col-sm-12">
              <div class="form-group">
                <label>Taxes totales</label>
                <input type="number" class="form-control" placeholder="Taxes totales" v-model="taxes_totales" />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Prime ttc</label>
                <input type="number" class="form-control" placeholder="Entrez la prime ttc" v-model="prime_ttc" />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Date de debut</label>
            <input class="form-control" placeholder="Date de debut" type="date" v-model="date_debut" />
          </div>
          <div class="form-group">
            <label>Date de fin</label>
            <input class="form-control" placeholder="Date de fin" type="date" v-model="date_fin" />
          </div>
          <div class="submit-section">
            <button type="button" class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              Annuler
            </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary submit-btn" @click="addAvenant">
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
import typeavenantcomponent from '../../components/select/typeavenantcomponent.vue';
import { v4 as uuidv4 } from 'uuid';
import { createToaster } from "@meforma/vue-toaster";
import AppStorage from '../../db/AppStorage';
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
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return year + month + day;
    },

    async addAvenant() {
      const uuidContrat = this.$route.params.uuidContrat;
      const uuidAvenant = uuidv4();

      const [annee, mois, day] = this.date_debut.split('-');

      const infocontrat = await AppStorage.getContratByUuid(uuidContrat)
      let uuidBranche = infocontrat.uuidBranche;
      let uuidCompagnie = infocontrat.uuidCompagnie;
      let uuidApporteur = infocontrat.uuidApporteur;
      const tauxcomp = await AppStorage.getTauxwithCompagnieAndBranche(uuidBranche, uuidCompagnie);
      const taux = await AppStorage.getTauxwithApporteurAndBranche(uuidBranche, uuidApporteur);


      let codeAvenant = this.generateCodevenant();

      const calculateCommission = () => {
        return this.prime_nette *
          taux *
          0.01 *
          tauxcomp *
          0.01;
      };

      const userId = parseInt(AppStorage.getId(), 10);
      const entrepriseId = parseInt(AppStorage.getEntreprise(), 10);

      const calculateCommissionCourtier = () => {
        return this.prime_nette * tauxcomp * 0.01;
      };

      const newAvenantsData = [{
        id: userId,
        uuidContrat: uuidContrat,
        annee: annee,
        mois: mois,
        type: this.type,
        nom_client: infocontrat.nom_client,
        nom_branche: infocontrat.nom_branche,
        nom_compagnie: infocontrat.nom_compagnie,
        numero_police: infocontrat.numero_police,
        prime_ttc: this.prime_ttc,
        retrocession: 0,
        commission: calculateCommission(),
        commission_courtier: calculateCommissionCourtier(),
        prise_charge: this.prise_charge,
        ristourne: this.ristourne,
        prime_nette: this.prime_nette,
        date_emission: this.date_debut,
        date_debut: this.date_debut,
        date_fin: this.date_fin,
        accessoires: this.accessoires,
        frais_courtier: this.frais_courtier,
        cfga: this.cfga,
        taxes_totales: this.taxes_totales,
        code_avenant: codeAvenant,
        uuidAvenant: uuidAvenant,
        solder: 0,
        reverser: 0,
        sync: 0,
        id_entreprise: entrepriseId,
      }];


      // Enregistré les avenants dans IndexedDB
      await AppStorage.storeDataInIndexedDB("avenants", newAvenantsData);

      // Une fois que la mise à jour est effectuée avec succès, récupérez la liste mise à jour des prospects
      const updatedAvenants = await AppStorage.getAvenantsByUuidContrat(uuidContrat);

      // Émettre un événement avec les prospects mis à jour
      this.$emit("avenant-add", updatedAvenants);

      toaster.success(`Avenant ajouté`, {
        position: "top-right",
      });


      // const token = localStorage.getItem("token");
      // const userId = localStorage.getItem("id");
      // const entrepriseId = localStorage.getItem("entreprise");

      // axios
      //   .post("/api/auth/postAvenant", {
      //     type: this.type,
      //     prime_ttc: this.prime_ttc,
      //     retrocession: this.retrocession,
      //     prime_nette: this.prime_nette,
      //     commission: this.commission,
      //     ristourne: this.ristourne,
      //     accessoires: this.accessoires,
      //     frais_courtier: this.frais_courtier,
      //     prise_charge: this.prise_charge,
      //     date_emission: this.date_emission,
      //     taxes_totales: this.taxes_totales,
      //     date_debut: this.date_debut,
      //     date_fin: this.date_fin,
      //     id_contrat: this.$route.params.id_contrat,
      //     id_entreprise: entrepriseId,
      //     id: userId,
      //   })
      //   .then((response) => {
      //     this.$emit('avenant-add', response)
      //     toaster.success(`Avenant ajouté avec succès`, {
      //       position: "top-right",
      //     });
      //     this.type =
      //       this.prime_ttc = '',
      //       this.accessoires = '',
      //       this.prime_nette = '',
      //       this.commission = '',
      //       this.ristourne =
      //       this.prise_charge =
      //       this.date_emission =
      //       this.date_debut =
      //       this.date_fin =
      //       "";

      //   })
      //   .catch(() => {
      //     this.$toast.error(
      //       "Aveant Impossible, Veuillez renseigner tous les champs",
      //       {
      //         // override the global option
      //         position: "top-right",
      //       }
      //     );
      //   });
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



  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>