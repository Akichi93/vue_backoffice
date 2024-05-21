<template>
    <Multiselect :value="typeavenant" :options="modes" placeholder="Choisir un type" :searchable="true"
        class="form-control" />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "typeavenantcomponent",
    props: ["typeavenant", "placeholder"],
    data() {
        return {
            modes: ["Terme", "Ristourne", "Complementaire"],
        };
    },
    components: { Multiselect },
};
</script>
      
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
    