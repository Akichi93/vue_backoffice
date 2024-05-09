<template>
  <input
    type="number"
    class="form-control"
    :value="numberValue"
    :placeholder="placeholder"
    step="0.01" min="0" max="1000"
    @input="updateNumberValue($event.target.value)"
  />
</template>

<script>
export default {
  name: "inputNumber",
  props: ["numberValue", "placeholder"],
  methods: {
    updateNumberValue(value) {
      // Émettre un événement pour mettre à jour la valeur dans le composant parent
      this.$emit('update:numberValue', value);
    }
  }
};
</script>