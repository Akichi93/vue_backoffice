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
            <div class="col-md-12 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <ul class="personal-info">
                    <li>
                      <div class="title">Proposant</div>
                      <div class="text">{{ facturetoedit.nom_complet }}</div>
                    </li>
                    <li>
                      <div class="title">Activité</div>
                      <div class="text">{{ facturetoedit.activite }}</div>
                    </li>
                    <li>
                      <div class="title">Effectif</div>
                      <div class="text">{{ facturetoedit.effectif }}</div>
                    </li>
                    <li>
                      <div class="title">Durée (jours)</div>
                      <div class="text">{{ facturetoedit.duree }}</div>
                    </li>
                    <li>
                      <div class="title">Décès</div>
                      <div class="text">{{ facturetoedit.deces }}</div>
                    </li>
                    <li>
                      <div class="title">IPT</div>
                      <div class="text">{{ facturetoedit.ipt }}</div>
                    </li>
                    <li>
                      <div class="title">Frais médicaux</div>
                      <div class="text">{{ facturetoedit.frais_medicaux }}</div>
                    </li>
                    <li>
                      <div class="title">Prime nette brute / personne</div>
                      <div class="text">{{ facturetoedit.prime_nette_brute }}</div>
                    </li>
                    <li>
                      <div class="title">Taux de réduction (en pourcentage)</div>
                      <div class="text">{{ facturetoedit.taux_reduction_effectif }}</div>
                    </li>
                    <li>
                      <div class="title">Prime nette reduite / personne</div>
                      <div class="text">{{ facturetoedit.prime_nette_brute }}</div>
                    </li>

                    <li>
                      <div class="title">Prime nette annuelle</div>
                      <div class="text">{{ facturetoedit.prime_nette_annuelle }}</div>
                    </li>
                    <li>
                      <div class="title">Accessoires</div>
                      <div class="text">{{ facturetoedit.accessoire_annuel }}</div>
                    </li>
                    <li>
                      <div class="title">Taxes</div>
                      <div class="text">{{ facturetoedit.taxe_annuelle }}</div>
                    </li>
                    <li>
                      <div class="title">Primes TTC</div>
                      <div class="text">{{ facturetoedit.prime_ttc_annuelle }}</div>
                    </li>
                    <li>
                      <div class="title">Prime nette courte durée</div>
                      <div class="text">{{ facturetoedit.prime_nette_courte }}</div>
                    </li>
                    <li>
                      <div class="title">Accessoires</div>
                      <div class="text">{{ facturetoedit.accesoire_courte }}</div>
                    </li>
                    <li>
                      <div class="title">Taxes</div>
                      <div class="text">{{ facturetoedit.taxe_courte }}</div>
                    </li>
                    <li>
                      <div class="title">Primes TTC</div>
                      <div class="text">{{ facturetoedit.prime_ttc_courte }}</div>
                    </li>
                  </ul>
                </div>
              </div>
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
  