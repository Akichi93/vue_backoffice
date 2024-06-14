<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>{{ errorMessage }}</p>
      <!-- Champs pour l'email et le mot de passe -->
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Mot de passe" />
      <button @click="login">Se connecter</button>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { apiUrl } from "../utils/constants/apiUrl";

export default {
  props: {
    errorMessage: String,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async login() {
      try {
        // Appel à l'API login avec les données d'identification
        const response = await axios.post(apiUrl.authentification, {
          email: this.email,
          password: this.password,
        });

        // Stocker le token dans le localStorage
        const token = response.data.access_token;
        localStorage.setItem("token", token);

        // Gestion de la réponse de l'API
        console.log(response.data); // Faire quelque chose avec la réponse, comme rediriger l'utilisateur, etc.

        // Fermer le modal après la connexion réussie
        this.closeModal();
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        // Afficher un message d'erreur à l'utilisateur, par exemple :
        // this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
      }
    },
  },
};
</script>
  
  <style scoped>
/* Styles CSS pour le modal */
</style>
  