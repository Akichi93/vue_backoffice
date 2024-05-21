<template>
    <Multiselect :value="value" :options="valeurs" placeholder="Choisir une civilité" :searchable="true" class="form-control" />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "adressecomponent",
    props: ["value", "placeholder"],
    data() {
        return {
            valeurs: [
                "Monsieur",
                "Madame",
                "Mademoiselle",
                "Dr",
                "Pr",
                "Maitre",
                "Societe",
            ],
        };
    },
    components: { Multiselect },
};
</script>
      
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
    