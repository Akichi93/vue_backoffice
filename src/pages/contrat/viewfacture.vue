<template>
  <div id="view_facture" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Voir la facture</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="page-header">
            <div class="row align-items-center">
              <div class="col-auto float-end ms-auto">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-white">CSV</button>
                  <button class="btn btn-white" @click="downloadPDF()">PDF</button>
                  <button class="btn btn-white" @click="print">
                    <i class="fa fa-print fa-lg"></i> Imprimer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row" id="printMe">
            <div class="invoice">
              <div class="row">
                <br /><br /><br />
                <br /><br /><br />
                <br /><br /><br />
                <div class="col-7">
                  <img src="" class="logo" />
                </div>
                <div class="col-5">
                  <br /><br /><br /><br /><br /><br /><br /><br />
                  <p class="addressDriver">
                    <strong> {{ facturetoedit.nom_client }}</strong><br />
                    <strong>{{ facturetoedit.postal_client }}</strong> <br />
                    <strong> {{ facturetoedit.adresse_client }}</strong><br />

                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-7">
                  <br /><br /><br />
                  <p class="addressDriver">
                    N client &emsp;&emsp;: <strong>{{ facturetoedit.numero_client }}</strong><br />
                    Contrat &emsp;&emsp;: <strong>{{ facturetoedit.numero_police }}</strong><br />
                    Compagnie &ensp;: <strong>{{ facturetoedit.nom_compagnie }}</strong><br />
                    Categorie &ensp;&ensp;: <strong>{{ facturetoedit.nom_branche }}</strong>
                  </p>
                </div>
                <div class="col-5">
                  <br /><br /><br />

                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <center>
                <strong>
                  <h2> PRIME N°{{ facturetoedit.code_avenant }} </h2>

                </strong><br />
              </center>
              <br />


              <p v-if="facturetoedit.type === 'Terme' || facturetoedit.type === 'Complememtaire'"
                style="text-align: justify; font-size:20px">

                la somme de {{ facturetoedit.payer }} F CFA au titre de la prime
                émise pour la période du {{ facturetoedit.date_debut }} au
                {{ facturetoedit.date_fin }} selon de décompte ci après :

              </p>



              <p v-if="facturetoedit.type === 'Ristourne'" style="text-align: justify; font-size:20px">

                Nous avons le plaisir de vous remettre deux exemplaires de l avenant à la police citée en objet portant
                sur la
                période du {{ facturetoedit.date_debut }} au {{ facturetoedit.date_fin }} .
                Si comme nous le pensons ce document retient votre agrément, nous vous serions reconnaissants de bien
                vouloir nous en retourner un exemplaire dûment signé.
                Dès réception de ces pièces, nous vous règlerons ou porterons au crédit de votre compte la somme de
                {{ facturetoedit.payer }} FCFA.
              </p>



              <br />
              <br />
              <br />
              <br />
              <br />

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Prime nette</th>
                    <th>Accessoires</th>
                    <th>Taxes</th>
                    <th>A payer</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td v-text="facturetoedit.prime_nette"></td>
                    <td v-text="facturetoedit.accessoires"></td>
                    <td v-text="facturetoedit.taxes_totales"></td>
                    <td v-text="facturetoedit.payer"></td>
                  </tr>
                </tbody>
              </table>

              <br />
              <br />

              <p style="text-align: justify; font-size:20px" class="conditions"
                v-if="facturetoedit.type === 'Terme' || facturetoedit.type === 'Complememtaire'">
                Par application de l'article 13 du code CIMA, la prise d'effet des garanties est subordonnée au paiement
                intégral de la

                <br />
                prime par l'assuré.
                <br /><br />

                <br />

                <br />
                Nous vous remercions par avance de votre rêglement et vous prions d'agréer, Monsieurs, l'expression de nos
                sentiments
                <br />
                distingués
              </p>

              <br />
              <br />
              <br />
              <br />

              <p class="bottom-page text-left" style="display: flex;justify-content: end;">
                POUR LA COMPAGNIE<br />

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ["facturetoedit"],
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    },
  }
}
</script>