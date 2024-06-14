<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/home" class="logo">
        <img src="" width="100" height="80" alt="" />
      </router-link>
    </div>

    <div class="header-center">
      <h1>Courtage</h1>
    </div>
    <a id="toggle_btn" href="javascript:void(0);">
      <span class="bar-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </a>

    <ul class="header-new-menu">
      <li v-if="isAdmin || isSuperadmin || isCourtier || isCommercial">
        <a
          href="#"
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Courtages
        </a>
        <div class="dropdown-menu">
          <template v-if="isAdmin || isSuperadmin || isCourtier">
            <router-link class="dropdown-item" to="/listcontrat"
              >Contrats</router-link
            >
            <router-link class="dropdown-item" to="/listsinistre"
              >Sinistres</router-link
            >
            <router-link class="dropdown-item" to="/listrelance"
              >Relances</router-link
            >
          </template>

          <template v-if="roleactif == 'ADMIN' || roleactif == 'SUPERADMIN'">
            <router-link class="dropdown-item" to="/listcompagnie"
              >Compagnie</router-link
            >
            <router-link class="dropdown-item" to="/listbranche"
              >Branches</router-link
            >
            <router-link class="dropdown-item" to="/listapporteur"
              >Apporteurs</router-link
            >
          </template>

          <template v-if="roleactif == 'ADMIN' || roleactif == 'COURTIER'">
            <router-link class="dropdown-item" to="/listprospect"
              >Prospects</router-link
            >
            <router-link class="dropdown-item" to="/listclient"
              >Clients</router-link
            >
            <router-link class="dropdown-item" to="/upload"
              >Upload des bases</router-link
            >
          </template>
        </div>
      </li>
      <li v-if="isAdmin || isSuperadmin || isRh || isCommercial">
        <a
          href="#"
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          RH
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/listuser"
            >Utilisateurs</router-link
          >
          <router-link class="dropdown-item" to="">Salaires</router-link>
          <router-link class="dropdown-item" to="">Dépenses</router-link>
          <router-link class="dropdown-item" to=""
            >Catégories dépenses</router-link
          >
          <router-link class="dropdown-item" to=""
            >Catégories types</router-link
          >
          <router-link class="dropdown-item" to=""
            >Catégories types</router-link
          >
          <router-link class="dropdown-item" to=""
            >Types de depenses</router-link
          >
        </div>
      </li>
      <li>
        <a
          href="#"
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Statistiques
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/statcontrat"
            >Statistiques courtage</router-link
          >
          <router-link class="dropdown-item" to="/statsinistre"
            >Statistiques rh</router-link
          >
          <router-link class="dropdown-item" to="/statsupprime"
            >Supprimes</router-link
          >
        </div>
      </li>
    </ul>

    <a id="mobile_btn" class="mobile_btn" href="#sidebar"
      ><i class="fa fa-bars"></i
    ></a>

    <ul class="nav user-menu">
      <li>
        <a href="#" class="report-btn" @click="toggleModal">
          <span class="material-icons-outlined"> settings </span>
        </a>
      </li>

      <li class="nav-item dropdown has-arrow main-drop">
        <a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
          <span class="user-img"
            ><i class="fa fa-user" aria-hidden="true"></i
          ></span>
          <span>{{ name }}</span>
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/profil"
            >Mon profile</router-link
          >
          <a class="dropdown-item" href="#" @click="logout">Se déconnecter</a>
        </div>
      </li>
    </ul>

    <div class="dropdown mobile-user-menu">
      <a
        href="#"
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa fa-ellipsis-v"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="">Mon profile</a>
        <a class="dropdown-item" href="#" @click="logout">Se déconnecter</a>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Paramètre</h5>
            <button
              type="button"
              class="btn-close"
              @click="toggleModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="bg-white">
              <div class="card-body">
                <div class="row">
                  <div class="col-3">
                    <ul class="nav nav-tabs flex-column nav-tabs-solid">
                      <li class="nav-item mb-2">
                        <a
                          class="nav-link active"
                          href="#solid-justified-tab1"
                          data-bs-toggle="tab"
                          >Synchronisation</a
                        >
                      </li>
                      <li class="nav-item mb-2">
                        <a
                          class="nav-link"
                          href="#solid-justified-tab2"
                          data-bs-toggle="tab"
                          >Logo</a
                        >
                      </li>
                      <li class="nav-item mb-2">
                        <a
                          class="nav-link"
                          href="#solid-justified-tab3"
                          data-bs-toggle="tab"
                          >Messages</a
                        >
                      </li>
                      <li class="nav-item mb-2">
                        <a
                          class="nav-link"
                          href="#solid-justified-tab4"
                          data-bs-toggle="tab"
                          >Thème</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="col-9">
                    <div class="tab-content">
                      <div
                        class="tab-pane show active"
                        id="solid-justified-tab1"
                      >
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="storeSync"
                          :disabled="isLoading"
                        >
                          Synchroniser
                        </button>
                      </div>
                      <div class="tab-pane" id="solid-justified-tab2">
                        Tab content 2
                      </div>
                      <div class="tab-pane" id="solid-justified-tab3">
                        Tab content 3
                      </div>
                      <div class="tab-pane" id="solid-justified-tab4">
                        Tab content 4
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleModal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="loader"></div>

  </div>
</template>

<script>
import AppStorage from "../db/AppStorage.js";
import syncservice from "../services/syncService.js";
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export default {
  data() {
    return {
      isLoading: false,
      isModalVisible: false,
      roleactif: "",
      isConnected: false,
    };
  },
  computed: {
    isAdmin() {
      return this.roleactif === "ADMIN";
    },
    isSuperadmin() {
      return this.roleactif === "SUPERADMIN";
    },
    isRh() {
      return this.roleactif === "RH";
    },
    isCommercial() {
      return this.roleactif === "COMMERCIAL";
    },
    isCourtier() {
      return this.roleactif === "COURTIER";
    },
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    async logout() {
      try {
        const isConnected = await this.checkInternetConnection();
        if (!isConnected) {
          toaster.error(`Veuillez vous connecter à Internet pour effectuer cette action.`, {
            position: "top-right",
          });
          return;
        }

        const dbName = "fl4ir";
        const objectStoreName = "apiData";

        const dbExists = await this.checkIndexedDB(dbName);
        if (!dbExists) {
          console.log("IndexedDB n'existe pas ou n'est pas pris en charge.");
          this.performLogoutCleanup();
          return;
        }

        const objectStoreExists = await this.checkObjectStore(dbName, objectStoreName);
        if (!objectStoreExists) {
          console.log(`Le magasin d'objets ${objectStoreName} n'existe pas.`);
          this.performLogoutCleanup();
          return;
        }

        await syncservice.checkAndSyncData();
        await this.logoutUser();
        this.$router.push({ name: "welcome" });
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    },
    async checkInternetConnection() {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/check-internet-connection`);
        return response.data.connected;
      } catch (error) {
        console.error("Erreur lors de la vérification de la connexion Internet :", error);
        return false;
      }
    },
    async checkIndexedDB(dbName) {
      return new Promise((resolve) => {
        const request = window.indexedDB.open(dbName);
        request.onsuccess = () => {
          request.result.close();
          resolve(true);
        };
        request.onerror = () => {
          resolve(false);
        };
      });
    },
    async checkObjectStore(dbName, objectStoreName) {
      return new Promise((resolve) => {
        const request = window.indexedDB.open(dbName);

        request.onerror = () => {
          console.error(`Erreur lors de l'ouverture de la base de données ${dbName}`);
          resolve(false);
        };

        request.onsuccess = (event) => {
          const db = event.target.result;

          if (db.objectStoreNames.contains(objectStoreName)) {
            resolve(true);
          } else {
            const version = db.version + 1;

            db.close();

            const upgradeRequest = window.indexedDB.open(dbName, version);

            upgradeRequest.onupgradeneeded = (event) => {
              const upgradeDb = event.target.result;

              for (const storeName of upgradeDb.objectStoreNames) {
                upgradeDb.deleteObjectStore(storeName);
              }
            };

            upgradeRequest.onsuccess = () => {
              upgradeRequest.result.close();
              resolve(false);
            };

            upgradeRequest.onerror = () => {
              console.error(`Erreur lors de la suppression des magasins d'objets de la base de données ${dbName}`);
              resolve(false);
            };
          }
        };
      });
    },
    async logoutUser() {
      AppStorage.clear();
    },
    async storeSync() {
      try {
        this.isLoading = true; // Start loading
        const response = await axios.get(apiUrl.getinternetconnection);

        if (response.status !== 200) {
          // Si le statut HTTP n'est pas 200, lance une erreur
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        this.isConnected = data.connected;

        if (this.isConnected) {
          // Exécutez le service validateAndRefreshToken
          await syncservice.validateAndRefreshToken();
        } else {
          console.log("Pas de connexion internet");
        }
      } catch (error) {
        console.error("Erreur lors de la synchronisation :", error);
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
    refreshPage() {
      window.location.reload(true);
    },
    performLogoutCleanup() {
      localStorage.clear();
      this.refreshPage();
    },
  },
  name: "Header",
};
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, .1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
  animation: spin89345 1s linear infinite;
  margin: auto; /* center loader */
}

@keyframes spin89345 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
