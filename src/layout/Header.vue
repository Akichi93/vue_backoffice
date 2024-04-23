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
          >Courtages</a
        >
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
          >RH</a
        >
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
          >Statistiques</a
        >
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
        <a href="#" class="report-btn">
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
          <!-- <router-link to="/logout" class="dropdown-item"
            >Se deconnecter</router-link
          > -->
        </div>
      </li>
    </ul>

    <div class="dropdown mobile-user-menu">
      <a
        href="#"
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        ><i class="fa fa-ellipsis-v"></i
      ></a>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="">Mon profile</a>
        <a class="dropdown-item" href="#" @click="logout">Se déconnecter</a>
        <!-- <router-link to="/logout" class="dropdown-item"
          >Se deconnecter</router-link
        > -->
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../db/AppStorage.js";
import syncservice from "../services/syncService.js";
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
// import $ from "jquery";
const toaster = createToaster({
  /* options */
});
export default {
  data() {
    return {
      loading: true,
      user: AppStorage.getUser(),
      error: null,
      roleactif: AppStorage.getRole(),
    };
  },
  computed: {
    name() {
      return this.user;
    },
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
    async logout() {
      try {
        const isConnected = await this.checkInternetConnection();
        if (!isConnected) {
          toaster.error(`Veuillez vous connecter à Internet pour effectuer cette action.`, {
            position: "top-right",
          });
          // console.log(
          //   "Veuillez vous connecter à Internet pour effectuer cette action."
          // );
          return;
        }

        const dbName = "fl4ir";
        const objectStoreName = "apiData";

        // Vérifier si la base de données IndexedDB existe
        const dbExists = await this.checkIndexedDB(dbName);
        if (!dbExists) {
          console.log("IndexedDB n'existe pas ou n'est pas pris en charge.");
          this.performLogoutCleanup();
          return;
        }

        // Vérifier si le magasin d'objets existe dans IndexedDB
        const objectStoreExists = await this.checkObjectStore(
          dbName,
          objectStoreName
        );
        if (!objectStoreExists) {
          console.log(`Le magasin d'objets ${objectStoreName} n'existe pas.`);
          this.performLogoutCleanup();
          return;
        }
        // toaster.info(`Deconnexion en cours...`, {
        //     position: "top-right",
        //   });
        // console.log("Déconnexion en cours...");
        await syncservice.checkAndSyncData();
        await this.logoutUser();
        // this.refreshPage();
        this.$router.push({ name: "welcome" });
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    },

    async checkInternetConnection() {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${apiUrl}/api/check-internet-connection`
        );
        return response.data.connected;
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de la connexion Internet :",
          error
        );
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
          console.error(
            `Erreur lors de l'ouverture de la base de données ${dbName}`
          );
          resolve(false);
        };

        request.onsuccess = (event) => {
          const db = event.target.result;

          // Vérifiez si le magasin d'objets existe
          if (db.objectStoreNames.contains(objectStoreName)) {
            // Le magasin d'objets existe, retournez true
            resolve(true);
          } else {
            // Le magasin d'objets n'existe pas, supprimez tous les magasins d'objets de la base de données
            const version = db.version + 1; // Incrémentez la version de la base de données pour déclencher une mise à niveau

            db.close(); // Fermez la connexion à la base de données avant la mise à niveau

            const upgradeRequest = window.indexedDB.open(dbName, version);

            upgradeRequest.onupgradeneeded = (event) => {
              const upgradeDb = event.target.result;

              // Supprimez tous les magasins d'objets existants
              for (const storeName of upgradeDb.objectStoreNames) {
                upgradeDb.deleteObjectStore(storeName);
              }
            };

            upgradeRequest.onsuccess = () => {
              upgradeRequest.result.close(); // Fermez la nouvelle connexion à la base de données
              resolve(false); // Le magasin d'objets n'existe toujours pas après la suppression
            };

            upgradeRequest.onerror = () => {
              console.error(
                `Erreur lors de la suppression des magasins d'objets de la base de données ${dbName}`
              );
              resolve(false);
            };
          }
        };
      });
    },

    async logoutUser() {
      // Implémentez votre logique de déconnexion ici
      AppStorage.clear(); // Par exemple, supprimer les informations utilisateur
    },

    refreshPage() {
      window.location.reload(true);
    },

    performLogoutCleanup() {
      localStorage.clear(); // Nettoyage supplémentaire en cas d'échec de la déconnexion
      this.refreshPage();
    },
  },

  name: "Header",
};
</script>



<style scoped></style>