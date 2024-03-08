<template>
  <Multiselect :value="company" :options="compagnies" :custom-label="({ uuidCompagnie, nom_compagnie }) =>
    `${uuidCompagnie} - [${nom_compagnie}]`
    " valueProp="uuidCompagnie" :placeholder="placeholder" label="nom_compagnie" track-by="nom_compagnie"
    :searchable="true">
  </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import AppStorage from '../../db/AppStorage.js';

export default {
  name: "compagniecomponent",
  props: ["company", "placeholder"],
  data() {
    return {
      compagnies: [],
    };
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
  components: { Multiselect },
};
</script>
        
<style src="@vueform/multiselect/themes/default.css"></style>