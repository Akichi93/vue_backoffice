import { defineStore } from 'pinia';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});


export const useProgressStore = defineStore({
  id: 'progress',
  state: () => ({
    totalCalls: 0,
    callsCompleted: 0,
  }),
  actions: {
    // Action pour initialiser le nombre total d'appels
    initTotalCalls(total) {
      this.totalCalls = total;
    },
    // Action pour mettre à jour la progression
    updateProgress() {
      this.callsCompleted++;
      // Calculer la progression en pourcentage
      const progressPercentage = (this.callsCompleted / this.totalCalls) * 100;
      // Envoyer une notification toaster au dashboard
      this.sendNotificationToDashboard(progressPercentage);
    },
    // Méthode pour envoyer une notification toaster au dashboard
    sendNotificationToDashboard(progressPercentage) {
      // Utilisez votre propre logique de notification toaster

      toaster.error(`Progression de chargement : ${progressPercentage.toFixed(2)}%`, {
        position: "top-right",
        duration: 3000,
      });
     
    },
  },
});

// Exportez votre store pour pouvoir l'utiliser dans votre application
export default useProgressStore;
