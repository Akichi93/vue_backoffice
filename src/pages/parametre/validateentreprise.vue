<template>
  <div class="modal custom-modal fade" id="edit_department" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Valider l'entreprise</h3>
            <p>Ëtes-vous sur de valider l'entreprise?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <input type="hidden" v-model="entreprisetoedit.id_entreprise" />
              <input type="hidden" v-model="entreprisetoedit.nom" />
              <input type="hidden" v-model="entreprisetoedit.contact" />
              <input type="hidden" v-model="entreprisetoedit.adresse" />
              <input type="hidden" v-model="entreprisetoedit.email" />
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  class="btn btn-primary continue-btn"
                  @click="editEntreprise"
                  >Valider</a
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
<script>
export default {
  props: ["entreprisetoedit"],
  methods: {
    editEntreprise() {
      axios
        .patch("/api/auth/entreprises/" + this.entreprisetoedit.id_entreprise, {
          nom: this.entreprisetoedit.nom,
          contact: this.entreprisetoedit.contact,
          email: this.entreprisetoedit.email,
          adresse: this.entreprisetoedit.adresse,
        })
        .then((response) => {
          this.fetchData();
          if (response.status === 200) {
            toaster.success(`Nouvelle entreprise enregistré`, {
              position: "top-right",
            });
          }
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>