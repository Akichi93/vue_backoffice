<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h5 class="modal-title">Notification</h5>
        <button type="button" class="close" @click="closeModal">
          <span>&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <form @submit.prevent="login">
        <div class="account-box">
          <div class="account-wrapper">
            <!-- Lock User Img -->
            <div class="lock-user">
              <h4>{{ name }}</h4>
            </div>
            <div class="input-block mb-3">
              <label class="col-form-label">Email</label>
              <input class="form-control" type="email" v-model="form.email" />
            </div>
            <div class="input-block mb-3">
              <label class="col-form-label">Mot de passe</label>
              <input
                class="form-control"
                type="password"
                v-model="form.password"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-secondary">Valider</button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="isLoading">
    <syncomponent></syncomponent>
  </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
import { apiUrl } from "../../utils/constants/apiUrl";
import syncservice from "../../services/syncService";
import syncomponent from '../loading/syncomponent.vue';

const toaster = createToaster();

export default {
  components: { syncomponent },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      name: localStorage.getItem("user"),
      form: {
        email: "",
        password: "",
      },
      syncSuccess: false, // Ajout d'un état pour suivre la réussite de la synchronisation
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async login() {
      try {
        this.isLoading = true;
        const response = await axios.post(apiUrl.authentification, this.form);
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        this.$emit("login-success");

        // Attendre la fin de la synchronisation
        await syncservice.checkAndSyncData();
        this.syncSuccess = true; // Indiquer que la synchronisation est terminée avec succès

        // Arrêter l'indicateur de chargement après la synchronisation réussie
        this.isLoading = false;

        // Facultatif : Attendre un court délai avant de fermer le modal
        setTimeout(() => {
          this.closeModal();
        }, 1000); // Fermer le modal après 1 seconde

      } catch (error) {
        toaster.error("Une erreur s'est produite lors de l'authentification", {
          position: "top-right",
        });
        console.error("Erreur d'authentification:", error);
      } finally {
        this.isLoading = false; // Arrêter l'indicateur de chargement en cas d'erreur également
      }
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 10px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
