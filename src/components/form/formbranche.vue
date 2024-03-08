<template>
  <div class="row">
    <div class="col-md-6" v-for="branche in branches" :key="branche.id_branche">
      <div class="form-group">
        <label>{{ branche.nom_branche }}</label>
        <input
          type="number"
          class="form-control"
          :placeholder="placeholder"
          :key="branche.id_branche"
          v-model="branche.value"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getBrancheList } from "../../services/formService";

export default {
  name: "formbranche",
  rops: ["modelValue", "placeholder"],
  data() {
    return {
        branches: [],
    };
  },
  created() {
    this.getBranche();
  },

  methods: {
    getBranche: function () {
        getBrancheList().then((result) => {
        this.branches = result;
        console.log(result)
      });
    },
  },
};
</script>