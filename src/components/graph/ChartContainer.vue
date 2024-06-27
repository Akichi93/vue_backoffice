<template>
    <div class="col-md-6">
      <div class="card flex-fill tickets-card">
        <div class="card-header">
          <div class="text-center w-100 p-3">
            <h3 class="bl-text mb-1">{{ chartTitle }}</h3>
          </div>
        </div>
        <div class="card-body">
          <Bar :data="chartData" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Bar } from "vue-chartjs";
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartTitle: {
        type: String,
        required: true
      }
    },
    components: {
      Bar
    }
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques pour le conteneur de graphique */
  .card {
    background-color: #ffffff; /* Couleur de fond de la carte */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px; /* Espacement entre les cartes */
  }
  
  .card-header {
    background-color: #f0f2f5; /* Couleur de fond de l'en-tête de la carte */
    border-bottom: 1px solid #dee2e6; /* Bordure inférieure de l'en-tête */
    border-radius: 8px 8px 0 0; /* Coins arrondis seulement en haut */
  }
  
  .text-center {
    text-align: center; /* Centrer le texte dans la carte */
  }
  
  .bl-text {
    color: #123e6b; /* Couleur du texte du titre */
  }
  </style>
  