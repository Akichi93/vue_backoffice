<!-- Step1.vue -->
<template>
  <div>
    <div class="row">
      <h4 class="card-title">Choix de la compagnie</h4>
      <div class="col-md-3">
        <div class="form-group">
          <Multiselect
            v-model="formData.compagnie_id"
            :options="compagnies"
            :searchable="true"
            @change="optionCompagnie"
            name="police"
            :custom-label="
              ({ uuidCompagnie, nom_compagnie }) =>
                `${uuidCompagnie} - [${nom_compagnie}]`
            "
            valueProp="uuidCompagnie"
            placeholder="Choisir une compagnie"
            label="nom_compagnie"
            track-by="nom_compagnie"
          ></Multiselect>
        </div>
      </div>

      <div class="col-md-3">
        <button
          type="button"
          class="btn btn-primary w-100"
          @click="$emit('next')"
        >
          <i class="ri-equalizer-fill me-1 align-bottom"></i>
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import AppStorage from "../../db/AppStorage";
import Multiselect from "@vueform/multiselect";
export default {
  data() {
    return {
      formData: {
        compagnie_id: "",
      },

      compagnies: [],
    };
  },
  components: {
    Multiselect,
  },
  created() {
    this.getCompagnie();
  },
  methods: {
    async getCompagnie() {
      AppStorage.getCompagnies().then((result) => {
        this.compagnies = result;
      });
    },
  },
};
</script>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
  