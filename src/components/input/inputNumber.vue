<template>
    <input
      type="number"
      class="form-control"
      :value="numberValue"
      :placeholder="placeholder"
      step="0.01" min="0" max="1000"
      @input="$emit('update:numberValue', $event.target.value)"
    />
  </template>
  <script>
  export default {
    name: "inputNumber",
    props: ["numberValue", "placeholder"],
  };
  </script>