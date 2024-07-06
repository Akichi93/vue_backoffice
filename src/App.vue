<template>
  <router-view />
  <modalComponent></modalComponent>
</template>
<script>
import modalComponent from './components/modal/modalcomponent.vue'
export default {
  components: {
    modalComponent,
  },
};
</script>

<style scoped></style>
