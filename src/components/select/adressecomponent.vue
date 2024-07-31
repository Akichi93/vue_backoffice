<template>
  <Multiselect
    :value="modelValues"
    :options="localisations"
    :custom-label="
      ({ id_localisation, nom_ville }) => `${id_localisation} - [${nom_ville}]`
    "
    valueProp="nom_ville"
    :placeholder="placeholder"
    label="nom_ville"
    track-by="nom_ville"
    :searchable="true"
  >
  </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import switchService from "../../services/switchService";

export default {
  name: "adressecomponent",
  props: ["modelValues", "placeholder"],
  data() {
    return {
      localisations: [],
    };
  },
  created() {
    this.getAdresse();
  },

  methods: {
    async getAdresse() {
      this.localisations = await switchService.getAdresse();
    },
  },
  components: { Multiselect },
};
</script>
  