<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />

    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Paramètre</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/home">Tableau de bord</router-link>
                </li>
                <li class="breadcrumb-item">Paramètre</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <!-- Content Starts -->
        <div class="card">
          <div class="card-body">
            <ul class="nav nav-tabs nav-tabs-solid nav-justified">
              <li class="nav-item">
                <router-link class="nav-link active" to="/settings"
                  >Utilisateurs</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/synchronisation"
                  >Synchronisation</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="">Thème</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card card-table">
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h3 class="card-title mb-0">Synchronisation</h3>
                <a
                  @click="storeSync"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  style="width: auto"
                >
                  <i class="fa fa-spinner me-2"></i>Synchroniser
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- /Content End -->
      </div>
      <!-- /Page Content -->
    </div>
    <!-- /Page Wrapper -->
    <Modal :visible="showModal" :message="modalMessage" @close="showModal = false" />
  </div>
</template>

<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import Modal from "../../components/modal/modalcomponent.vue";
import loadingcomponent from "../../components/loading/spinnercomponent.vue";
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
import syncservice from "../../services/syncService.js";

const toaster = createToaster();

export default {
  components: {
    Header,
    Sidebar,
    Modal,
    loadingcomponent,
  },
  data() {
    return {
      users: {},
      isLoading: true,
      apiUrl: import.meta.env.VITE_API_BASE_URL,
      showModal: false,
      modalMessage: '',
    };
  },
  methods: {
    async checkInternetConnection() {
      try {
        const apiUrl = this.apiUrl;
        const response = await axios.get(
          `${apiUrl}/api/check-internet-connection`
        );
        return response.data.connected;
      } catch (error) {
        toaster.error(
          "Erreur lors de la vérification de la connexion Internet.",
          {
            position: "top-right",
          }
        );
        console.error(
          "Erreur lors de la vérification de la connexion Internet :",
          error
        );
        return false;
      }
    },

    async storeSync() {
      try {
        this.isLoading = true; // Start loading
        const apiUrl = this.apiUrl;
        const response = await axios.get(
          `${apiUrl}/api/check-internet-connection`
        );

        if (response.status !== 200) {
          // Si le statut HTTP n'est pas 200, lance une erreur
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        this.isConnected = data.connected;

        if (this.isConnected) {
          const verif = await syncservice.validateAndRefreshToken();
          

          if (!verif) {
            // Show modal if verif is false
            this.modalMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
            this.showModal = true;
          }else{
            
            syncservice.checkAndSyncData()
          }
        } else {
          console.log("Pas de connexion internet");
        }
      } catch (error) {
        toaster.error("Erreur lors de la synchronisation.", {
          position: "top-right",
        });
        console.error("Erreur lors de la synchronisation :", error);
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
  },
};
</script>
