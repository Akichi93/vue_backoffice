<template>
  <Multiselect
    :value="habitationValue"
    :options="habitations"
    placeholder="Choisir un type d'habitation"
    :searchable="true"
    class="form-control"
  />
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { habitations } from "../../utils/constants/mooks/data";

export default {
  name: "adressecomponent",
  props: ["habitationValue", "placeholder"],
  data() {
    return {
      habitations: habitations,
    };
  },
  components: { Multiselect },
};
</script>