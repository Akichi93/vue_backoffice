<template>
    <Multiselect :value="modelValue" :options="types" placeholder="Choisir un type" :searchable="true"
        class="form-control" />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "typecomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            types: ["Technique", "Commercial"],
        };
    },
    components: { Multiselect },
};
</script>
      
<style src="@vueform/multiselect/themes/default.css"></style>
    