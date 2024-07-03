<template>
      <div class="modal custom-modal fade" id="delete_sinistre" role="dialog">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <div class="form-header">
                  <h3>Supprimer sinistre</h3>
                  <p>Voulez vous supprimer le sinistre?</p>
                </div>
                <div class="modal-btn delete-action">
                  <div class="row">
                    <div class="col-6">
                      <a
                        href="javascript:void(0);"
                        class="btn btn-primary continue-btn"
                        data-bs-dismiss="modal"
                        @click="deleteSinistre"
                        >supprimer</a
                      >
                    </div>
                    <div class="col-6">
                      <a
                        href="javascript:void(0);"
                        data-bs-dismiss="modal"
                        class="btn btn-primary cancel-btn"
                        >Annuler</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script></script>