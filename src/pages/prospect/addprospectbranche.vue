<template>
  <div id="add_prospect" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Branches</label>
                <Multiselect v-model="branche_id" :options="branches" :custom-label="({ id_branche, nom_branche }) =>
                    `${id_branche} - [${nom_branche}]`
                  " valueProp="id_branche" placeholder="Selectionnez une branche" label="nom_branche"
                  track-by="nom_branche" :searchable="true" class="form-control">
                </Multiselect>
              </div>
            </div>

            <div class="col-sm-12">
              <div class="form-group">
                <label>Commentaires</label>
                <textarea class="form-control" v-model="description" id="" cols="30" rows="5"></textarea>
              </div>
            </div>
          </div>
          <div class="submit-section">
            <button class="btn btn-primary cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              Annuler
            </button>
            <button class="btn btn-primary submit-btn" type="button" @click="addBranche" data-bs-dismiss="modal">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import { apiUrl } from "../../utils/constants/apiUrl";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  data() {
    return {
      branches: {},
    };
  },
  components: { Multiselect },
  created() {
    this.getbranche();
  },
  methods: {
    getbranche() {
      const token = localStorage.getItem("token");

      // Configurez les en-têtes de la requête
      const headers = {
        Authorization: "Bearer " + token,
        "x-access-token": token,
      };
      axios
        .get(`/api/auth/getBrancheDiffProspect/${this.$route.params.id_prospect}`, { headers })
        .then((response) => {
          this.branches = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message || error.message;
        });
    },

    addBranche() {
      axios
        .post(apiUrl.postbrancheprospect, {
          id: this.$route.params.id_prospect,
          id_branche: this.branche_id,
          description: this.description,
        })
        .then((response) => {
          this.$emit('prospectbranche-add', response)
          // if (response.status === 200) {
          toaster.success(`Branche ajouté avec succès`, {
            position: "top-right",
          });
        })
        .catch((error) => {

          // if (error.response.status === 422) {
          //   this.errors = error.response.data.errors;
          //   // console.log(error.response.data.errors);
          //   toaster.error(`Veuillez remplir tous les champs`, {
          //     position: "top-right",
          //   });

          //   // console.log("Message non enregisté")
          // } else if (error.request) {
          //   // The request was made but no response was received
          //   console.log(error.request);
          // } else {
          //   // Something happened in setting up the request that triggered an Error
          //   console.log("Error", error.message);
          // }
        });
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>