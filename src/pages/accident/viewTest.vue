<template>
  <div id="view_test" class="modal custom-modal fade" role="dialog">
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

          <div class="row">
            <div class="col-md-12 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="col-md-12">
                        <div class="card">
                          <fieldset>
                            <legend>Patient:</legend>
                            <div class="input-block mb-3 row">
                              <label class="col-lg-3 col-form-label"></label>
                              <div class="col-lg-9">
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="gender"
                                    id="gender_male"
                                    value="option1"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gender_male"
                                  >
                                    Agent
                                  </label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="gender"
                                    id="gender_female"
                                    value="option2"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gender_female"
                                  >
                                    Epoux(se)
                                  </label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="gender"
                                    id="gender_female"
                                    value="option2"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gender_female"
                                  >
                                    Enfant
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="input-block mb-3 row">
                              <label class="col-lg-3 col-form-label"
                                >Nom et prénom</label
                              >
                              <div class="col-lg-9">
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="input-block mb-3 row">
                              <div class="col-md-6">
                                <label class="col-lg-6 col-form-label"
                                  >Age</label
                                >
                                <div class="col-lg-6">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <label class="col-lg-6 col-form-label"
                                  >Matricule</label
                                >
                                <div class="col-lg-6">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div>
                            <div class="input-block mb-3 row">
                              <div class="col-md-6">
                                <label class="col-lg-6 col-form-label"
                                  >Sexe</label
                                >
                                <div class="col-lg-6">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <label class="col-lg-6 col-form-label"
                                  >Assurance n°</label
                                >
                                <div class="col-lg-6">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div>
                            <div class="input-block mb-3 row">
                              <label class="col-lg-3 col-form-label"
                                >cliniques d'orientation</label
                              >
                              <div class="col-lg-9">
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="input-block mb-3 row">
                              <label class="col-lg-3 col-form-label"
                                >Traitement en cours</label
                              >
                              <div class="col-lg-9">
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="card">
                          <fieldset>
                            <legend>Medecin:</legend>

                            <div class="input-block mb-3 row">
                              <label class="col-lg-3 col-form-label"
                                >Cachet</label
                              >
                              <div class="col-lg-9">
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="col-md-6">
                          <div class="card">
                            <fieldset>
                              <legend>A-HEMATOLOGIE:</legend>

                              <div class="input-block mb-3 row">
                                <div class="col-lg-3">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="gender"
                                    id="gender_male"
                                    value="option1"
                                  />
                                </div>
                                <label class="col-lg-9 col-form-label"
                                  >Cytologie/Hematozoaires</label
                                >
                              </div>
                            </fieldset>
                          </div>
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="card">
                        <div class="card-header">
                          <h4 class="card-title mb-0">Address Form</h4>
                        </div>
                        <div class="card-body">
                          <form action="#">
                            <div class="input-block mb-3">
                              <label class="col-form-label"
                                >Address Line 1</label
                              >
                              <input type="text" class="form-control" />
                            </div>
                            <div class="input-block mb-3">
                              <label class="col-form-label"
                                >Address Line 2</label
                              >
                              <input type="text" class="form-control" />
                            </div>
                            <div class="input-block mb-3">
                              <label class="col-form-label">City</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="input-block mb-3">
                              <label class="col-form-label">State</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="input-block mb-3">
                              <label class="col-form-label">Country</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="input-block mb-3">
                              <label class="col-form-label">Postal Code</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="text-end">
                              <button type="submit" class="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </form>
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
    </div>
  </div>
</template>
    <script>
import html2pdf from "html2pdf.js";
export default {
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
    