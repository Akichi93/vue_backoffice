<template>
    <Multiselect :value="modelValue" :options="energies" :custom-label="({ id_energie, energie }) =>
        `${id_energie} - [${energie}]`
        " valueProp="energie" :placeholder="placeholder" label="energie"
        track-by="energie" :searchable="true">
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
            energies: [],
        };
    },
    created() {
        this.getEnergie();
    },

    methods: {
        getEnergie: function () {
            getCouleursList().then((result) => {
                this.energies = result;
            });
        },
    },
    components: { Multiselect },
};
</script>
      
<style src="@vueform/multiselect/themes/default.css"></style>
    