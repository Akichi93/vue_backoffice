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