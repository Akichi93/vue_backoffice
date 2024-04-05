<template>
  <div class="account-page">
    <div class="main-wrapper">
      <div class="account-content">
        <div class="container">
          <div class="account-logo">
            <a href=""><img src="" alt="Courtage" /></a>
          </div>

          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Demande de compte</h3>
              <form @submit.prevent="register">
                <div class="form-group">
                  <label
                    >Nom de l'entreprise<span class="mandatory">*</span></label
                  >
                  <input class="form-control" type="text" v-model="form.name" />
                  <span class="error" v-if="errors.name">{{
                    errors.name
                  }}</span>
                </div>
                <div class="form-group">
                  <label
                    >Email de l'entreprise<span class="mandatory"
                      >*</span
                    ></label
                  >
                  <input
                    class="form-control"
                    type="text"
                    v-model="form.email"
                  />
                  <span class="error" v-if="errors.email">{{
                    errors.email
                  }}</span>
                </div>
                <div class="form-group">
                  <label
                    >Contact de l'entreprise<span class="mandatory"
                      >*</span
                    ></label
                  >
                  <input
                    class="form-control"
                    type="text"
                    v-model="form.contact"
                  />
                  <span class="error" v-if="errors.contact">{{
                    errors.contact
                  }}</span>
                </div>
                <div class="form-group">
                  <label
                    >Situation géographique<span class="mandatory"
                      >*</span
                    ></label
                  >
                  <input
                    class="form-control"
                    type="text"
                    id="adresse"
                    v-model="form.adresse"
                  />
                  <span class="error" v-if="errors.adresse">{{
                    errors.adresse
                  }}</span>
                </div>
                <div class="input-block mb-4 text-center">
                  <button class="btn btn-primary account-btn" type="submit">
                    Demande
                  </button>
                </div>
              </form>
              <div class="account-footer">
                <p>
                  J'ai déja un compte?
                  <router-link to="/"> Se connecter</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { validateForm } from "../../utils/helpers/formValidation";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        contact: "",
        adresse: "",
      },
      errors: {},
    };
  },
  methods: {
    register() {
      this.errors = validateForm(this.form);

      // Ajoutez d'autres validations selon vos besoins pour les autres champs du formulaire

      const base_url = import.meta.env.VITE_API_BASE_URL;

      // Si aucun message d'erreur n'est présent, le formulaire est valide
      if (Object.keys(this.errors).length === 0) {
        // Soumettre le formulaire ou effectuer toute autre action requise
        axios
          .post(`${base_url}/api/post-registration`, this.form)
          .then((res) => {
            toaster.success(
              `Entreprise ajouté avec succès. Votre dossier est en traitemaent`,
              {
                position: "top-right",
              }
            );
          })
          .catch((error) => {
            // console.log(error.response.headers);

            // if (error.response.status === 422) {
            //   this.errors = error.response.data.errors;
            //   // console.log(error.response.data.errors);
            //   toaster.error(`Veuillez `, {
            //     position: "top-right",
            //   });

            //   // console.log("Message non enregisté")
            // }

            // if (error.response.status === 423) {
            //   this.errors = error.response.data.errors;
            //   // console.log(error.response.data.errors);
            //   toaster.error(`Entreprise existante`, {
            //     position: "top-right",
            //   });

            //   // console.log("Message non enregisté")
            // }

            // else if (error.request) {
            //     // The request was made but no response was received
            //     console.log(error.request);
            // } else {
            //     // Something happened in setting up the request that triggered an Error
            //     console.log("Error", error.message);
            // }
          });
        console.log("Formulaire soumis avec succès !");
      } else {
        console.log("Le formulaire contient des erreurs.");
      }
    },
    isValidEmail(email) {
      // Logique pour vérifier si l'email est valide
      // Vous pouvez utiliser une expression régulière ou toute autre méthode de validation
      return /\S+@\S+\.\S+/.test(email);
    },
  },
};
</script>
<style>
.form-group label {
  float: left;
}

.error {
  float: left;
  color: red;
}
</style>
