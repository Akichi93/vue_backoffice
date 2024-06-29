<template>
    <div>
        <Multiselect
            v-model="localValue"
            :options="couvertures"
            :searchable="true"
            :placeholder="placeholder"
            class="form-control"
            @select="updateColor"
        />
    </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
    name: "couverturecomponent",
    props: ["placeholder", "value", "index"],
    data() {
        return {
            couvertures: ["COUVERT", "EXCLU"],
            localValue: this.value // Utiliser une valeur locale pour chaque instance
        };
    },
    watch: {
        value(newValue) {
            this.localValue = newValue; // Synchroniser la valeur locale avec le v-model
        },
        localValue(newValue) {
            this.$emit('input', newValue); // Émettre la nouvelle valeur sélectionnée au parent
        }
    },
    methods: {
        updateColor(value) {
            const color = this.getClass(value);
            this.$emit('update-color', { index: this.index, color });
        },
        getClass(value) {
            if (value === "COUVERT") {
                return "green";
            } else if (value === "EXCLU") {
                return "red";
            }
            return "";
        }
    },
    components: { Multiselect }
};
</script>

<style scoped>
.green .form-control {
    border-color: green;
    color: green;
}
.red .form-control {
    border-color: red;
    color: red;
}
</style>
