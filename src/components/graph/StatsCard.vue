<template>
    <div class="card flex-fill tickets-card">
      <div class="card-header">
        <div class="text-center w-100 p-3">
          <h3 class="bl-text mb-1">{{ title }}</h3>
          <h2>{{ value }}</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: ""
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici pour personnaliser la carte */
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
  
  h2 {
    font-size: 24px; /* Taille de police pour la valeur */
    margin-top: 10px; /* Espacement vers le haut de la valeur */
  }
  </style>
  