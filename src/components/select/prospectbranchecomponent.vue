<template>
    <Multiselect v-model="branche_id" :options="branches" :custom-label="({ id_branche, nom_branche }) =>
            `${id_branche} - [${nom_branche}]`
        " valueProp="id_branche" placeholder="Selectionnez une branche" label="nom_branche"
        track-by="nom_branche" :searchable="true" class="form-control">
    </Multiselect>
</template>
<script>
export default {

}
</script>