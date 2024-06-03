<template>
  <Multiselect
    :value="apporteur"
    :options="apporteurs"
    :custom-label="
      ({ uuidApporteur, nom_apporteur }) =>
        `${uuidApporteur} - [${nom_apporteur}]`
    "
    valueProp="uuidApporteur"
    :placeholder="placeholder"
    label="nom_apporteur"
    track-by="nom_apporteur"
    :searchable="true"
  >
  </Multiselect>
</template>
  <script>
import Multiselect from "@vueform/multiselect";
import switchService from "../../services/switchService";

export default {
  name: "clientcomponent",
  props: ["apporteur", "placeholder"],
  data() {
    return {
      apporteurs: [],
    };
  },
  mounted() {
    this.getApporteur();
  },
  created() {
    this.getApporteur();
  },

  methods: {
    async getApporteur() {
      this.apporteurs = await switchService.getApporteurs();
    },
  },
  components: { Multiselect },
};
</script>
        
  <!-- <style src="@vueform/multiselect/themes/default.css"></style> -->