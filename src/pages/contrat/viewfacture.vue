<template>
  <div id="view_facture" class="modal custom-modal fade" tabindex="-1" role="dialog">
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
                <div id="printMe" class="invoice">
                  <div class="invoice-header">
                    <p class="header-left">Abidjan, le 13 Mars 2024</p>
                    <div class="header-line">
                      <p class="text-left">DOIT :</p>
                      <p class="ml-3">{{ facturetoedit.nom_client }}</p>
                    </div>
                    <p class="header-right">{{ facturetoedit.postal_client }}</p>
                  </div>
                  <div class="invoice-body">
                    <p>
                      <span class="invoice-designation">Désignation</span>: <strong>Police d’assurance {{ facturetoedit.numero_police }}</strong><br />
                      <span class="branche"><strong>« {{ facturetoedit.nom_branche }} »</strong></span>
                    </p>
                    <div class="invoice-number-wrapper">
                      <p class="invoice-number">FACTURE N° {{ facturetoedit.code_avenant }}</p>
                    </div>
                    <p>
                      La somme de <strong>{{ facturetoedit.payer }} F CFA</strong>  au titre de la prime émise pour la période du <strong>{{ facturetoedit.date_debut }}</strong> au <strong>{{ facturetoedit.date_fin }}</strong> selon le décompte ci-après :
                    </p>
                    <ul class="invoice-list">
                      <li>
                        <span class="invoice-item">Prime nette </span>
                        <span class="invoice-value">{{ facturetoedit.prime_nette }}</span>
                        <span class="invoice-unit"> FCFA</span>
                      </li>
                      <li>
                        <span class="invoice-item">Coût de police </span>
                        <span class="invoice-value">{{ facturetoedit.fga }}</span>
                        <span class="invoice-unit"> FCFA</span>
                      </li>
                      <li>
                        <span class="invoice-item">Taxes:</span>
                        <span class="invoice-value">{{ facturetoedit.taxes_totales }}</span>
                        <span class="invoice-unit"> FCFA</span>
                      </li>
                      <li class="invoice-total">
                        <span class="invoice-item" style="font-weight: bold;">Prime TTC à payer </span>
                        <span class="invoice-value">{{ facturetoedit.payer }}</span>
                        <span class="invoice-unit"> FCFA</span>
                      </li>
                    </ul>
                    <p>
                      <strong>
                        Par application de l’article 13 nouveau du code CIMA la prise d’effet des garanties est subordonnée au paiement intégral de la prime par l’assuré.
                      </strong>
                      
                    </p>
                    <p>
                      Arrêté la présente facture à la somme de :<br> <strong>{{ numberToWords(facturetoedit.payer) }} CFA,</strong>  <br> payable par chèque à l’ordre de <strong>« GNA GESTION COTE D’IVOIRE »</strong> 
                    </p>
                  </div>
                  <div class="invoice-footer invoice-bar">
                    <p>POUR LA COMPAGNIE</p>
                  </div>
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
import { numberToWords } from '../../utils/helpers/numberToWordHelpers';

export default {
  props: ["facturetoedit"],
  components: {
    printcomponent,
  },
  methods: {
    numberToWords,
    formatMontant(montant) {
      return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    print() {
      const printContents = document.getElementById("printMe").innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.invoice {
  width: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.invoice-header,
.invoice-body,
.invoice-footer {
  margin-bottom: 20px;
}

.branche{
  margin-left: 80px;
}

.invoice-footer {
  margin-top: 100px; /* Add margin-top for spacing */
}

.invoice-designation {
  text-decoration: underline;
}

.invoice-header p,
.invoice-footer p {
  text-align: right;
}

.invoice-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px; /* Add margin-bottom for spacing after the ul */
}

.invoice-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  line-height: 1.6; /* Add line-height to increase spacing between lines */
  position: relative; /* Add relative positioning for pseudo-elements */
}

.invoice-item {
  flex: 2;
  margin-left: 100px; /* Add margin-left to create space between item labels and values */
  position: relative; /* Add relative positioning for pseudo-elements */
}

.invoice-item::after {
  content: ":";
  position: absolute;
  right: -10px; /* Adjust this value as needed for proper alignment */
}

.invoice-value {
  font-weight: bold;
  text-align: right;
  flex: 1;
}

.invoice-unit {
  margin-left: 10px;
  text-align: left;
  flex: 1;
}

.invoice-total {
  padding-top: 10px;
  position: relative;
}

.invoice-total::before {
  content: "";
  display: block;
  width: 30%; /* Adjust the width as needed */
  height: 1px;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 420px;
  
}

.invoice-bar {
  padding-top: 10px;
  position: relative;
}

.invoice-bar::before {
  content: "";
  display: block;
  width: 22%; /* Adjust the width as needed */
  height: 1px;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 515px;
  
}

.invoice-number-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.invoice-number {
  font-weight: bold;
  border: 2px solid black;
  padding: 10px;
}

.header-left {
  margin-right: 40px;
  margin-top: 50px; /* Adjust this value to move the date further down */
}

.header-right {
  margin-right: 100px;
}

.header-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header-line p {
  margin: 0;
}

.text-left {
  text-align: left;
  flex: 1;
}

.ml-3 {
  margin-left: 0.75rem;
}

p {
  margin-bottom: 20px; /* Add margin-bottom for spacing between paragraphs */
  line-height: 1.8; /* Add line-height to increase spacing between lines */
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .modal-header,
  .modal-footer {
    display: none;
  }

  .invoice {
    padding: 10px;
    max-width: 100%;
    font-size: 12px;
    width: 210mm;
    height: 297mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
