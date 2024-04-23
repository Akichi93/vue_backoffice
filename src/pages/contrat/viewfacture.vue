<template>
  <div id="view_facture" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Voir la facture</h5>
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
          <div class="page-header">
            <div class="row align-items-center">
              <div class="col-auto float-end ms-auto">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-white" @click="exportToPDF()">
                    PDF
                  </button>
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
                    <strong> {{ facturetoedit.nom_client }}</strong
                    ><br />
                    <strong>{{ facturetoedit.postal_client }}</strong> <br />
                    <strong> {{ facturetoedit.adresse_client }}</strong
                    ><br />
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-7">
                  <br /><br /><br />
                  <p class="addressDriver">
                    N client &emsp;&emsp;:
                    <strong>{{ facturetoedit.numero_client }}</strong
                    ><br />
                    Contrat &emsp;&emsp;:
                    <strong>{{ facturetoedit.numero_police }}</strong
                    ><br />
                    Compagnie &ensp;:
                    <strong>{{ facturetoedit.nom_compagnie }}</strong
                    ><br />
                    Categorie &ensp;&ensp;:
                    <strong>{{ facturetoedit.nom_branche }}</strong>
                  </p>
                </div>
                <div class="col-5"><br /><br /><br /></div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <center>
                <strong>
                  <h2>PRIME N°{{ facturetoedit.code_avenant }}</h2> </strong
                ><br />
              </center>
              <br />

              <p
                v-if="
                  facturetoedit.type == 'Terme' ||
                  facturetoedit.type == 'Complememtaire'
                "
                style="text-align: justify; font-size: 20px"
              >
                la somme de {{ facturetoedit.payer }} F CFA au titre de la prime
                émise pour la période du {{ facturetoedit.date_debut }} au
                {{ facturetoedit.date_fin }} selon de décompte ci après :
              </p>

              <p
                v-if="facturetoedit.type === 'Ristourne'"
                style="text-align: justify; font-size: 20px"
              >
                Nous avons le plaisir de vous remettre deux exemplaires de l
                avenant à la police citée en objet portant sur la période du
                {{ facturetoedit.date_debut }} au {{ facturetoedit.date_fin }} .
                Si comme nous le pensons ce document retient votre agrément,
                nous vous serions reconnaissants de bien vouloir nous en
                retourner un exemplaire dûment signé. Dès réception de ces
                pièces, nous vous règlerons ou porterons au crédit de votre
                compte la somme de {{ facturetoedit.payer }} FCFA.
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

              <p
                style="text-align: justify; font-size: 20px"
                class="conditions"
                v-if="
                  facturetoedit.type === 'Terme' ||
                  facturetoedit.type === 'Complememtaire'
                "
              >
                Par application de l'article 13 du code CIMA, la prise d'effet
                des garanties est subordonnée au paiement intégral de la

                <br />
                prime par l'assuré.
                <br /><br />

                <br />

                <br />
                Nous vous remercions par avance de votre rêglement et vous
                prions d'agréer, Monsieurs, l'expression de nos sentiments
                <br />
                distingués
              </p>

              <br />
              <br />
              <br />
              <br />

              <p
                class="bottom-page text-left"
                style="display: flex; justify-content: end"
              >
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
import html2pdf from "html2pdf.js";
export default {
  props: ["facturetoedit"],
  methods: {
    formatMontant(montant) {
      return formatNumberWithThousandsSeparator(montant);
    },
    exportToPDF() {
      const element = document.getElementById("printMe"); // Récupérer l'élément à convertir en PDF

      // Configuration des options pour html2pdf
      const options = {
        margin: [10, 10, 10, 10], // Marges en pixels (haut, droite, bas, gauche)
        filename: "facture.pdf", // Nom du fichier PDF à télécharger
        image: { type: "jpeg", quality: 0.98 }, // Format d'image et qualité (optionnel)
        // jsPDF: { unit: "px", format: "a4", orientation: "portrait" }, // Taille de la page PDF (A4 en mode portrait)
        html2canvas: { scale: 2 }, // Facteur d'échelle pour améliorer la résolution (optionnel)
      };

      // Convertir et télécharger en PDF avec les options configurées
      html2pdf()
        .set(options)
        .from(element)
        .then(() => {
          // Appliquer des styles spécifiques au PDF généré
          const pdf = document.querySelector(".html2pdf__page");
          if (pdf) {
            pdf.style.fontSize = "10px"; // Définir la taille de police pour le PDF
            // Vous pouvez également appliquer d'autres styles CSS nécessaires ici
          }
        })
        .save();
    },
    print() {
      // Pass the element id here

      this.$htmlToPaper("printMe");
    },
  },
};
</script>
<style scoped>
@media print {
  /* Masquer certains éléments lors de l'impression */
  .modal-header {
    display: none; /* Masquer l'en-tête de la modale */
  }
  .btn-group {
    display: none; /* Masquer les boutons d'actions */
  }
  .bottom-page {
    display: none; /* Masquer la signature en bas de page */
  }
  .invoice {
    padding: 20px; /* Ajouter un espace de marge intérieur à l'impression */
  }
  .invoice img.logo {
    max-width: 100px; /* Définir la largeur maximale de l'image */
  }
}
</style>
