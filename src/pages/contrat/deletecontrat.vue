<template>
  <div class="modal custom-modal fade" id="delete_contrat" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer contrat</h3>
            <p>Voulez vous supprimer le contrat?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-primary continue-btn" data-bs-dismiss="modal"
                  @click="deleteContrat">supprimer</a>
              </div>
              <div class="col-6">
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Annuler</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['contrattoedit'],
  methods: {
    deleteContrat() {
      axios
        .patch("/api/auth/deleteContrat/" + this.contrattoedit.id_contrat)
        .then((response) => {
          this.listcontrat();
          if (response.status === 200) {
            toaster.success(`Contrat supprimé avec succes`, {
              position: "top-right",
            });
          }
        })
        .catch((error) => console.log(error));
    },
  }
}
</script>

