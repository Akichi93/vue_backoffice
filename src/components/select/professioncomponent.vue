<template>
  <Multiselect
    :value="civilite"
    :options="professions"
    :custom-label="
      ({ id_profession, profession }) => `${id_profession} - [${profession}]`
    "
    valueProp="profession"
    :placeholder="placeholder"
    label="profession"
    track-by="profession"
    :searchable="true"
  >
  </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import AppStorage from "../../db/AppStorage.js";
import switchService from "../../services/switchService";

export default {
  name: "professioncomponent",
  props: ["civilite", "placeholder"],
  data() {
    return {
      professions: [],
    };
  },
  created() {
    this.getProfession();
  },

  methods: {
    async getProfession() {
      this.professions = await switchService.getProfession();

      // AppStorage.getProfessions().then((result) => {
      //     this.professions = result;
      // });
    },
  },
  components: { Multiselect },
};
</script>
      
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
    