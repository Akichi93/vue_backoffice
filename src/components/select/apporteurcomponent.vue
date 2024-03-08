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
import AppStorage from '../../db/AppStorage.js';

export default {
  name: "clientcomponent",
  props: ["apporteur", "placeholder"],
  data() {
    return {
      apporteurs: [],
    };
  },
  created() {
    this.getApporteur();
  },

  methods: {
    getApporteur() {
     AppStorage.getApporteurs().then((result) => {
        this.apporteurs = result;
      });
    },
    
  },
  components: { Multiselect },
};
</script>
        
  <style src="@vueform/multiselect/themes/default.css"></style>