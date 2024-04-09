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
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      // Then use it in your fetch request
      const response = await axios.get(`${apiUrl}/api/check-internet-connection`);

      // const data = await response.json();
      const isConnected = response.data.connected;

      if (isConnected) {
        console.log("Déconnexion en cours...");
        await syncservice.checkAndSyncData();

        AppStorage.clear();
        AppStorage.deleteIndexedDB();
        this.$router.push({ name: "welcome" });
      } else {
        console.log("Veuillez vous connectez à internet");
      }
    
      
      {
    
}
    },
  },

  name: "Header",
};
</script>



<style scoped></style>