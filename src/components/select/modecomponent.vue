<template>
    <Multiselect :value="modelValue" :options="modes" placeholder="Choisir un mode" :searchable="true"
        class="form-control" />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "typecomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            modes: ["Espèces", "Carte", "Chèques"],
        };
    },
    components: { Multiselect },
};
</script>
      
<style src="@vueform/multiselect/themes/default.css"></style>
    