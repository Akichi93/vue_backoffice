<template>
  <Multiselect
    :value="company"
    :options="compagnies"
    :custom-label="
      ({ uuidCompagnie, nom_compagnie }) =>
        `${uuidCompagnie} - [${nom_compagnie}]`
    "
    valueProp="uuidCompagnie"
    :placeholder="placeholder"
    label="nom_compagnie"
    track-by="nom_compagnie"
    :searchable="true"
  >
  </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import switchService from "../../services/switchService";

export default {
  name: "compagniecomponent",
  props: ["company", "placeholder"],
  data() {
    return {
      compagnies: [],
    };
  },
  
  mounted() {
    this.getCompagnie();
  },
  created() {
    this.getCompagnie();
  },

  methods: {
    async getCompagnie() {
      this.compagnies = await switchService.getCompagnies();
    },
  },
  components: { Multiselect },
};
</script>
        
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->