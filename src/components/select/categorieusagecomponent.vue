<template>
    <Multiselect :value="modelValue" :options="categories" :custom-label="({ id_categorie, categorie }) =>
        `${id_categorie} - [${categorie}]`
        " valueProp="categorie" :placeholder="placeholder" label="categorie"
        track-by="categorie" :searchable="true">
    </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { getCategoriesList } from "../../services/formService";

export default {
    name: "adressecomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            categories: [],
        };
    },
    created() {
        this.getCategorie();
    },

    methods: {
        getCategorie: function () {
            getCategoriesList().then((result) => {
                this.categories = result;
            });
        },
    },
    components: { Multiselect },
};
</script>
      
<style src="@vueform/multiselect/themes/default.css"></style>
    