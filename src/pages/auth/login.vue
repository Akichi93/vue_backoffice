<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="container">
                    <div class="account-logo">
                        <a href=""><img src="" alt="COURTAGE" style="width: 30%;"></a>
                    </div>

                    <div class="account-box">
                        <div class="account-wrapper">
                            <h3 class="account-title">Connexion</h3>
                            <p class="account-subtitle">Accès au tableau de bord</p>

                            <form @submit.prevent="login">
                                <div class="form-group text-right">
                                    <label>Adresse email</label>
                                    <input class="form-control" type="email" v-model="form.email">
                                </div>
                                <div class="form-group text-right"> <!-- Ajout de la classe text-right -->
                                    <div class="row">
                                        <div class="col">
                                            <label>Mot de passe</label> <!-- Ajout du style float: left -->
                                        </div>
                                        <div class="col-auto">
                                            <router-link class="text-muted" to="">
                                                Mot de passe oublié?
                                            </router-link>
                                        </div>
                                    </div>
                                    <input class="form-control" type="password" v-model="form.password">
                                </div>
                                <div class="form-group text-center">
                                    <button class="btn btn-primary account-btn" type="submit">Connexion</button>
                                </div>
                                <div class="account-footer">
                                    <p>Vous n'avez pas encore de compte ? <router-link to="/register">Demande de
                                            compte</router-link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import User from "../../db/User";
import { apiUrl } from "../../utils/constants/apiUrl";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});
export default {

    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errors: []
        }
    },
    methods: {
        login() {
            axios.post(apiUrl.authentification, this.form)
                .then(res => {
                    User.responseAfterLogin(res)
                    this.$router.push({ name: 'localstorage' })
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                    // console.log(error.response.data.errors);
                    toaster.error(`Une erreur`, {
                        position: "top-right",
                    });
                });
        }
    }


}
</script>
<style>
.form-group label {
    float: left;
}
</style>
