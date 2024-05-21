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
                <!-- <div class="card-body"> -->
                <div class="container">
                  <h1 class="title-header text-center">
                    PROPOSITION DE COUVERTURE INDIVIDUELLE ACCIDENTS
                  </h1>

                  <div class="info-section row">
                    <div class="col-sm-3"><h5>Proposant :</h5></div>
                    <div class="col-sm-9"><p>{{ facturetoedit.prospect.nom_prospect }}</p></div>
                  </div>

                  <div class="info-section row">
                    <div class="col-sm-3"><h5>Activités :</h5></div>
                    <div class="col-sm-9"><p>{{ facturetoedit.activite.activite }}</p></div>
                  </div>          

                  <div class="info-section row">
                    <div class="col-sm-3"><h5>Effectif :</h5></div>
                    <div class="col-sm-9"><p>{{ facturetoedit.effectif }}</p></div>
                  </div>

                  <div class="info-section row">
                    <div class="col-sm-3"><h5>Durée (mois) :</h5></div>
                    <div class="col-sm-9"><p>{{ facturetoedit.duree }}</p></div>
                  </div>

                  <div class="info-section row">
                    <div class="col-sm-3"><h5>Capitaux assurés :</h5></div>
                    <div class="col-sm-9"><p></p></div>
                  </div>

                  <table class="table table-bordered tarif-table">
                    <tr>
                      <th>Décès</th>
                      <td>{{ facturetoedit.deces }} FCFA</td>
                    </tr>
                    <tr>
                      <th>IPT</th>
                      <td>{{ facturetoedit.ipt }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Frais Médicaux*</th>
                      <td>100 000 FCFA</td>
                    </tr>
                  </table>

                  <table class="table table-bordered tarif-table">
                    <tr>
                      <th>Prime nette brute / Personne</th>
                      <td>{{ facturetoedit.prime_nette_brute }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Taux de réduction</th>
                      <td>{{ facturetoedit.taux_reduction_effectif }} %</td>
                    </tr>
                    <tr>
                      <th>Prime nette réduite / Personne</th>
                      <td>{{ facturetoedit.prime_nette_reduite }} FCFA</td>
                    </tr>
                  </table>

                  <table class="table table-bordered tarif-table">
                    <tr>
                      <th>Prime nette annuelle</th>
                      <td>{{ facturetoedit.prime_nette_annuelle}} FCFA</td>
                    </tr>
                    <tr>
                      <th>Accessoires</th>
                      <td>{{ facturetoedit.accessoire_annuel }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Taxes</th>
                      <td>{{ facturetoedit.accesoire_courte }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Primes TTC</th>
                      <td>{{ facturetoedit.prime_ttc_annuelle }} FCFA</td>
                    </tr>
                  </table>

                  <table class="table table-bordered tarif-table">
                    <tr>
                      <th>Prime nette courte durée</th>
                      <td>{{ facturetoedit.prime_nette_courte }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Accessoires</th>
                      <td>{{ facturetoedit.accesoire_courte }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Taxes</th>
                      <td>{{ facturetoedit.taxe_courte }} FCFA</td>
                    </tr>
                    <tr>
                      <th>Primes TTC</th>
                      <td>{{ facturetoedit.prime_ttc_courte }} FCFA</td>
                    </tr>
                  </table>

                  <div class="info-section row">
                    <div class="col-sm-3">
                      <h5>Clause limitation d’Indemnité :</h5>
                    </div>
                    <div class="col-sm-9">
                      <p>
                        « L’engagement de l’assureur est limité à 750.000.000
                        FCFA par événement, quel que soit le nombre de victimes.
                        »
                      </p>
                    </div>
                  </div>

                  <div class="info-section row">
                    <div class="col-sm-3"><h5>Clause Age :</h5></div>
                    <div class="col-sm-9">
                      <p>
                        « Sont exclues de la garantie, les personnes âgées de
                        moins de 16 ans et de plus de 60 ans à la souscription.
                        Les assurés âgés de 65 ans au cours du contrat cessent
                        de plein droit d’être garantis à l’expiration de l’année
                        d’assurance pendant laquelle ils atteignent cet âge. »
                      </p>
                    </div>
                  </div>
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
      const element = document.getElementById("printMe");

      const options = {
        margin: [10, 10, 10, 10],
        filename: "facture.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
      };

      html2pdf()
        .set(options)
        .from(element)
        .then(() => {
          const pdf = document.querySelector(".html2pdf__page");
          if (pdf) {
            pdf.style.fontSize = "10px"; // Réduire la taille de la police
          }
        })
        .save();
    },
    print() {
      this.$htmlToPaper("printMe");
    },
  },
};
</script>

<style scoped>
/* Réduire la taille de la police pour tout le contenu */
* {
  font-size: 15px !important;
}

/* Réduire les marges pour maximiser l'espace */
.tarif-table {
  margin-top: 15px;
}
.section-title {
  margin-top: 20px;
}
.note {
  font-style: italic;
  margin-top: 10px;
}
.info-section {
  margin-top: 5px;
}
.info-section h5 {
  font-weight: bold;
}
.title-header {
  border: 2px solid black;
  background-color: rgb(0, 195, 255);
  color: white;
  padding: 10px;
  margin-top: 20px;
}
.info-section h5,
.tarif-table th {
  font-size: 1rem;
}
.tarif-table th {
  width: 400px; /* Réduire la largeur des cellules de tableau */
}

.tarif-table {
  margin-top: 5px; /* Réduire la marge supérieure */
  margin-bottom: 5px; /* Réduire la marge inférieure */
}

.tarif-table th,
.tarif-table td {
  padding: 5px; /* Réduire le rembourrage */
  font-size: 10px; /* Réduire la taille de la police */
}
@media print {
  .modal-header,
  .btn-group {
    display: none;
  }
  .modal-content {
    border: none;
    box-shadow: none;
  }
  .modal-body {
    padding: 0;
  }
  .card {
    box-shadow: none;
    border: none;
  }
  .col-md-12 {
    max-width: 100%;
  }
  .btn {
    display: none;
  }
}
</style>