<template>
    <select :value="modelValue" class="form-select mb-3" name="type" id="type">
        <option v-for="branche in branches" :value="branche" :key="branche.id_branche">
            {{ branche.nom_branche }}
        </option>
    </select>
</template>
<script>
import { getBrancheList } from "../../services/formService";

export default {
    name: "branchecomponent",
    props: ["modelValue", "placeholder"],
    data() {
        return {
            branches: [],
        };
    },
    created() {
        this.getBranche();
    },

    methods: {
        getBranche: function () {
            getBrancheList().then((result) => {
                this.branches = result;
            });
        },
    },
};
</script>