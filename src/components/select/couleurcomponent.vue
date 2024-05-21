<template>
    <Multiselect :value="modelValue" :options="localisations" :custom-label="({ id_couleur, couleur }) =>
        `${id_couleur} - [${couleur}]`
        " valueProp="couleur" :placeholder="placeholder" label="couleur"
        track-by="couleur" :searchable="true">
    </Multiselect>
  
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { getCouleursList } from "../../services/formService";

export default {
    name: "couleurcomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            couleurs: [],
        };
    },
    created() {
        this.getCouleur();
    },

    methods: {
        getCouleur: function () {
            getCouleursList().then((result) => {
                this.couleurs = result;
            });
        },
    },
    components: { Multiselect },
};
</script>
      
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
    