<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-left slimscroll">
      <div
        class="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <router-link
          v-if="isAdmin || isSuperadmin || isCourtier || isCommercial"
          class="nav-link menu"
          to="/home"
          title="Accueil"
          role="tab"
          aria-controls="v-pills-dashboard"
          aria-selected="false"
          :class="{ active: $route.path === '/home' }"
        >
          <span class="material-icons-outlined"> home </span>
        </router-link>

        <router-link
          v-if="isAdmin || isSuperadmin || isCourtier || isCommercial"
          to="/courtage"
          class="nav-link menu"
          title="Courtage"
          role="tab"
          aria-controls="v-pills-apps"
          aria-selected="false"
          :class="{ active: $route.path === '/courtage' }"
          :replace="true"
        >
          <span class="material-icons-outlined"> dashboard </span>
        </router-link>

        <router-link
          v-if="isAdmin || isSuperadmin || isRh"
          to="/rh"
          class="nav-link menu"
          title="RH"
          role="tab"
          aria-controls="v-pills-apps"
          aria-selected="false"
          :class="{ active: $route.path === '/rh' }"
          :replace="true"
        >
          <span class="material-icons-outlined"> people </span>
        </router-link>

        <router-link
          to="/statistique"
          class="nav-link menu"
          title="Statistiques"
          role="tab"
          aria-controls="v-pills-apps"
          aria-selected="false"
          :class="{ active: $route.path === '/statistique' }"
          :replace="true"
        >
          <span class="material-icons-outlined"> leaderboard </span>
        </router-link>

        <router-link
          to="/tarification"
          class="nav-link menu"
          id="module"
          title="Tarifications"
          role="tab"
          aria-controls="v-pills-apps"
          aria-selected="false"
          :class="{ active: $route.path === '/tarification' }"
          :replace="true"
        >
          <span class="material-icons-outlined"> attach_money </span>
        </router-link>

        <router-link
          v-if="isSuperadmin"
          to="entreprise"
          class="nav-link menu"
          title="Settings"
          id="enterprise"
          role="tab"
          aria-selected="false"
          :class="{ active: $route.path === '/entreprise' }"
          :replace="true"
        >
          <span class="material-icons-outlined"> settings </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import AppStorage from "../db/AppStorage.js";
import syncservice from "../services/syncService";
import { timeSynchronise } from "../utils/constants/technicalConstant";
export default {
  data() {
    return {
      isHovered: false,
      roleactif: AppStorage.getRole(),
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
  mounted() {
    this.intervalId = setInterval(this.checkConnection, timeSynchronise);
    // setInterval(this.checkConnection, timeSynchronise);
  },
  beforeDestroy() {
    // Nettoyez l'intervalle lors de la destruction du composant
    clearInterval(this.intervalId);
  },
  methods: {
    async checkConnection() {
      try {
        const apiUrl = import.meta.env.VUE_APP_API_BASE_URL;

        // Then use it in your fetch request
        const response = await fetch(`${apiUrl}/api/check-internet-connection`);
        // Make an API request to your endpoint
        // const response = await fetch(
        //   "https://fl4ir.loca.lt/api/check-internet-connection"
        // );

        const data = await response.json();

        this.isConnected = data.connected;

        // Check if the response status is okay (e.g., 200)
        if (this.isConnected) {
          // Execute checkAndSyncData service
          await syncservice.checkAndSyncData(); // Assuming syncservice is an async function that returns a promise
        } else {
          console.log("Pas de connexion internet ");
        }
      } catch (error) {
        // Handle errors, e.g., network issues or server errors
        console.error("Error checking connection:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Improved styles for the hovered class and animation */
.material-icons-outlined {
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

.material-icons-outlined.hovered {
  transform: scale(1.1);
  color: #007bff;
  /* Change to your preferred color */
}
</style>