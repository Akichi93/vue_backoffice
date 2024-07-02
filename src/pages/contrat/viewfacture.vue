<template>
  <div id="view_facture" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Voir la facture</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <printcomponent>
              <template v-slot>
                <div class="invoice">
                  <div class="row">
                    <div class="col-7">
                      <img src="" class="logo" />
                    </div>
                    <div class="col-5">
                      <p class="addressDriver align-right">
                        <strong>{{ facturetoedit.nom_client }}</strong><br />
                        <strong>{{ facturetoedit.postal_client }}</strong><br />
                        <strong>{{ facturetoedit.adresse_client }}</strong><br />
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-7">
                      <p class="addressDriver">
                        N client : <strong>{{ facturetoedit.numero_client }}</strong><br />
                        Contrat : <strong>{{ facturetoedit.numero_police }}</strong><br />
                        Compagnie : <strong>{{ facturetoedit.nom_compagnie }}</strong><br />
                        Catégorie : <strong>{{ facturetoedit.nom_branche }}</strong>
                      </p>
                    </div>
                  </div>

                  <center>
                    <strong><h4>PRIME N°{{ facturetoedit.code_avenant }}</h4></strong>
                  </center>

                  <p v-if="facturetoedit.type === 'Terme' || facturetoedit.type === 'Complememtaire'"
                     style="text-align: justify; font-size: 13px; margin-top: 10px;">
                    La somme de {{ facturetoedit.payer }} F CFA au titre de la prime émise pour la période du
                    {{ facturetoedit.date_debut }} au {{ facturetoedit.date_fin }} selon de décompte ci après :
                  </p>

                  <p v-if="facturetoedit.type === 'Ristourne'"
                     style="text-align: justify; font-size: 13px; margin-top: 10px;">
                    Nous avons le plaisir de vous remettre deux exemplaires de l'avenant à la police citée en objet
                    portant sur la période du {{ facturetoedit.date_debut }} au {{ facturetoedit.date_fin }}. Si comme
                    nous le pensons ce document retient votre agrément, nous vous serions reconnaissants de bien vouloir
                    nous en retourner un exemplaire dûment signé. Dès réception de ces pièces, nous vous règlerons ou
                    porterons au crédit de votre compte la somme de {{ facturetoedit.payer }} FCFA.
                  </p>

                  <table class="table table-striped" style="font-size: 13px; margin-top: 20px;">
                    <thead>
                      <tr>
                        <th>Prime nette</th>
                        <th>Accessoires</th>
                        <th>Taxes</th>
                        <th>FGA</th>
                        <th>A payer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td v-text="facturetoedit.prime_nette"></td>
                        <td v-text="facturetoedit.accessoires"></td>
                        <td v-text="facturetoedit.taxes_totales"></td>
                        <td v-text="facturetoedit.fga"></td>
                        <td v-text="facturetoedit.payer"></td>
                      </tr>
                    </tbody>
                  </table>

                  <p v-if="facturetoedit.type === 'Terme' || facturetoedit.type === 'Complememtaire'"
                     style="text-align: justify; font-size: 13px; margin-top: 20px;">
                    Par application de l'article 13 du code CIMA, la prise d'effet des garanties est subordonnée au
                    paiement intégral de la prime par l'assuré.
                  </p>

                  <p class="bottom-page text-right" style="font-size: 13px;">
                    POUR LA COMPAGNIE<br />
                  </p>
                </div>
              </template>
            </printcomponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import printcomponent from "../../components/print/printcomponent.vue";

export default {
  props: ["facturetoedit"],
  components: {
    printcomponent,
  },
  methods: {
    formatMontant(montant) {
      return formatNumberWithThousandsSeparator(montant);
    },
   
    print() {
      // Pass the element id here

      this.$htmlToPaper("printMe");
    },
  },
};
</script>

<style scoped>
button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.preview {
  transform-origin: top left;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  overflow: auto;
}

.page {
  page-break-after: always;
  margin-bottom: 20px;
}

.text-right {
  text-align: right;
}

.align-right {
  text-align: right;
  margin-left: 50px; /* Ajustez cette valeur selon vos besoins */
}

@media print {
  .modal-header {
    display: none; /* Masquer l'en-tête de la modale lors de l'impression */
  }
  .btn-group {
    display: none; /* Masquer les boutons d'actions */
  }
  .invoice {
    padding: 10px; /* Réduire l'espace intérieur pour l'impression */
    max-width: 100%; /* Assurer que le contenu ne dépasse pas la largeur de la page */
    font-size: 12px; /* Taille de police par défaut */
  }
  .invoice img.logo {
    max-width: 100px; /* Définir la largeur maximale de l'image du logo */
  }
}
</style>
