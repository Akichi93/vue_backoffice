<!-- Step3.vue -->
<!-- Step2.vue -->
<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Taux IPT</h3>

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
    </div>
  </div>

  <div class="row">
    <div class="col-md-3">
      <button
        type="button"
        class="btn btn-primary w-100"
        @click="$emit('prev')"
      >
        <i class="ri-equalizer-fill me-1 align-bottom"></i>
        Précédent
      </button>
    </div>
    <div class="col-md-3">
      <button type="button" class="btn btn-primary w-100"  @click="$emit('next')">
        <i class="ri-equalizer-fill me-1 align-bottom"></i>
        Suivant
      </button>
    </div>
  </div>
</template>
    
    <script>
import AppStorage from "../../db/AppStorage";
export default {
  data() {
    return {
      formData: {
        email: "",
      },
      activites: "",
    };
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
  },
};
</script>
    

  