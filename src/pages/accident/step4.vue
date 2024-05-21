<template>
  <div>
    <h4 v-if="currentMontant">
      Frais médicaux et pharmaceutiques "{{ currentMontant.montant }}"
    </h4>
    <div class="row">
      <div
        class="col-md-6"
        v-for="activite in activites"
        :key="activite.uuidActivite"
      >
        <div class="form-group">
          <label>{{ activite.activite }}</label>
          <input
            type="number"
            class="form-control"
            placeholder="Entrez le taux"
            :key="activite.uuidActivite"
            step="0.01"
            min="0"
            max="1000"
            v-model="activite.value"
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary" v-if="currentPage > 1" @click="previousPage">
      Page précédente
    </button>
   
    <button class="btn btn-primary" v-if="currentPage < totalPages" @click="nextPage">
      Page suivante
    </button>
    <button class="btn btn-primary" v-else @click="submitForm">Soumettre</button>
  </div>
</template>

<script>
import AppStorage from "../../db/AppStorage";
export default {
  data() {
    return {
      montants: [], // Montants des frais médicaux
      currentPage: 1, // Numéro de page actuel
      itemsPerPage: 1, // Nombre d'éléments par page
      currentMontant: null, // Montant actuellement affiché
    };
  },
  async mounted() {
    await this.getMontant();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.montants.length / this.itemsPerPage);
    },
  },
  created() {
    this.getActivite();
  },
  methods: {
    async getActivite() {
      AppStorage.getActivites().then((result) => {
        this.activites = result;
      });
    },
    async getMontant() {
      try {
        const result = await AppStorage.getFraisMedicals(); // Récupérer les frais médicaux
        this.montants = result; // Assigner les montants
        this.displayCurrentMontant();
      } catch (error) {
        console.error("Erreur lors de la récupération des montants :", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.displayCurrentMontant();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.displayCurrentMontant();
      }
    },
    submitForm() {
      // Logique pour soumettre le formulaire
      console.log("Formulaire soumis !");
    },
    displayCurrentMontant() {
      const index = (this.currentPage - 1) * this.itemsPerPage;
      this.currentMontant = this.montants[index];
    },
  },
};
</script>

<style>
/* Ajoutez votre CSS ici */
</style>
