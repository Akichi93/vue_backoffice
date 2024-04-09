<template></template>
<script>
import AppStorage from "../../db/AppStorage.js";
import syncservice from "../../services/syncService.js";
export default {
  data() {
    return {
      errors: {},
      isConnected: false,
    };
  },
  created() {
    AppStorage.clear();
    AppStorage.deleteIndexedDB();
    this.$router.push({ name: "welcome" });
    this.logout();
  },
  methods: {
    async logout() {
      const apiUrl = import.meta.env.VUE_APP_API_BASE_URL;

      // Then use it in your fetch request
      const response = await fetch(`${apiUrl}/api/check-internet-connection`);

      const data = await response.json();
      this.isConnected = data.connected;
      if (this.isConnected) {
        await syncservice.checkAndSyncData();

        AppStorage.clear();
        AppStorage.deleteIndexedDB();
        this.$router.push({ name: "welcome" });
      } else {
        console.log("Veuillez vous connectez à internet");
      }
    },
  },
};
</script>
<style scoped></style>