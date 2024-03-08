<template>
    <Multiselect :value="modelValue" :options="genres" :custom-label="({ id_genre, genre }) =>
        `${id_genre} - [${genre}]`
        " valueProp="genre" :placeholder="placeholder"  label="genre"
        track-by="genre" :searchable="true">
    </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { getGenresList } from "../../services/formService";

export default {
    name: "genrecomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            genres: [],
        };
    },
    created() {
        this.getGenre();
    },

    methods: {
        getGenre: function () {
            getGenresList().then((result) => {
                this.genres = result;
            });
        },
    },
    components: { Multiselect },
};
</script>
      
<style src="@vueform/multiselect/themes/default.css"></style>
    