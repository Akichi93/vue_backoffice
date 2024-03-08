<template>
  <div id="add_user" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter utilisateur</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Nom complet de l'utilisateur</label>
                  <input type="text" class="form-control" placeholder="Entrez le nom de l'utilisateur" v-model="user.name"
                    required />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Telephone</label>
                  <input type="text" class="form-control" placeholder="Numéro de téléphone" v-model="user.contact"
                    required />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Adresse</label>
                  <adressecomponent :placeholder="'selectionnez l\'adresse'" v-model="user.adresse">
                  </adressecomponent>

                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control" placeholder="Email de l'utilisateur" v-model="user.email" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Rôle</label>
                  <rolecomponent :placeholder="'selectionnez le role'" v-model="user.poste"></rolecomponent>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input type="text" class="form-control" v-model="user.password" />
            </div>
            <div class="submit-section">
              <button class="btn btn-primary cancel-btn" type="button" data-bs-dismiss="modal" aria-label="Close">
                Annuler
              </button>
              <button class="btn btn-primary submit-btn" type="button" data-bs-dismiss="modal" @click="storeUser">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { postUser } from "../../services/userservice";
import adressecomponent from "../../components/select/adressecomponent.vue";
import rolecomponent from '../../components/select/rolecomponent.vue';
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        contact: "",
        adresse: "",
        poste: ""
      },

    };
  },
  methods: {
    storeUser: function () {
      postUser(this.user)
        .then((response) => {
          this.$emit("user-add", response);
          toaster.success(`Nouvel utilisateur enregistré`, {
            position: "top-right",
          });

        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },

  components: { Multiselect, adressecomponent, rolecomponent },
}

</script>
<style src="@vueform/multiselect/themes/default.css"></style>