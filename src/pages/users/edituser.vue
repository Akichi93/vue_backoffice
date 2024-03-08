<template>
    <div id="edit_department" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier utilisateur</h5>
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
            <form>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Nom</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="userstoedit.name"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="userstoedit.email"
                    />
                  </div>
                </div>
              </div>
  
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Contact</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="userstoedit.contact"
                    />
                  </div>
                </div>
              </div>
              <div class="submit-section">
                <button
                  class="btn btn-primary cancel-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Annuler
                </button>
                <button
                  class="btn btn-primary submit-btn"
                  type="button"
                  data-bs-dismiss="modal"
                  @click="editUser"
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default{
  props:['userstoedit'],
}
</script>


<!-- editUser() {
    axios
      .patch("/utilisateurs/" + this.userstoedit.id, {
        name: this.userstoedit.name,
        email: this.userstoedit.email,
        contact: this.userstoedit.contact,
      })
      .then((response) => {
        this.fetchData();
        if (response.status === 200) {
          toaster.success(`Utilisateur modifié avec succès`, {
            position: "top-right",
          });
        }
      })
      .catch((error) => console.log(error));
  }, -->