<template>
    <Multiselect :value="modelTypeReglement" :options="types" placeholder="Choisir un type" :searchable="true"
        class="form-control" />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "typereglementcomponent",
    props: ["modelTypeReglement", "placeholder"],
    data() {
        return {
            types: ["Client", "Expert", "Garage","Tiers"],
        };
    },
    components: { Multiselect },
};
</script>
      
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
    