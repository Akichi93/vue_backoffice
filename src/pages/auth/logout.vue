<template>
    
</template>
<script>
import AppStorage from "../../db/AppStorage.js";
export default {
    created() {
        AppStorage.clear()
        AppStorage.deleteIndexedDB()
        this.$router.push({ name: 'welcome' })
    },

   
}
</script>
<style scoped></style>