<template>
    <div
      id="edit_tarification"
      class="modal custom-modal fade"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier tarification</h5>
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
            <div class="section">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Nombre de mois min</label>
                    
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Nombre de mois max</label>
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Pourcentage</label>
                   
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Compagnie</label>
                  
                  </div>
                </div>
              </div>
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
                class="btn btn-primary submit-btn"
                @click="updateAssurance"
                data-bs-dismiss="modal"
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
  import InputNumber from "../../components/input/inputNumber.vue";
  import compagniecomponent from "../../components/select/compagniecomponent.vue";
  import { createToaster } from "@meforma/vue-toaster";
  import AppStorage from "../../db/AppStorage";
  const toaster = createToaster({
    /* options */
  });
  
  export default {
    props: ["assurancetoedit"],
    components: {
      compagniecomponent,
      InputNumber,
    },
  
    methods: {
     
    },
  };
  </script>
        