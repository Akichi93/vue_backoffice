<template>
    <div id="import_file" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter une classe</h5>
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
              <div class="col-md-12">
                <div class="section">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Classe</label>
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                    
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Activité</label>
                  <input
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Pourcentage</label>
                  <input
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0"
                    max="1000"
                   
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Compagnie</label>
                  <compagniecomponent
                    :placeholder="'selectionnez la compagnie'"
                   
                  ></compagniecomponent>
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
  import Multiselect from "@vueform/multiselect";
  import AppStorage from "../../db/AppStorage";
  import { v4 as uuidv4 } from "uuid";
  
  import { createToaster } from "@meforma/vue-toaster";
  const toaster = createToaster({
    /* options */
  });
  export default {};
  </script>