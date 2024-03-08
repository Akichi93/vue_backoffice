<template>
    <Multiselect :value="modelValue" :options="marques" :custom-label="({ id_marque, marque }) =>
        `${id_marque} - [${marque}]`
        " valueProp="marque" :placeholder="placeholder" label="marque"
        track-by="marque" :searchable="true">
    </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { getMarquesList } from "../../services/formService";

export default {
    name: "marquecomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            marques: [],
        };
    },
    created() {
        this.getMarque();
    },

    methods: {
        getMarque: function () {
            getMarquesList().then((result) => {
                this.marques = result;
            });
        },
    },
    components: { Multiselect },
};
</script>
      
<style src="@vueform/multiselect/themes/default.css"></style>
    