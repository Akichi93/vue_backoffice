<template>
    <Multiselect :value="habitationValue" :options="couvertures" placeholder="Choisir un type" :searchable="true"
        class="form-control" />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "adressecomponent",
    props: ["habitationValue", "placeholder"],
    data() {
        return {
            couvertures: [
                "COURVERT",
                "EXCLU",
            ],
        };
    },
    components: { Multiselect },
};
</script>