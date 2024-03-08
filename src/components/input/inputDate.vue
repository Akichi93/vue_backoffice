<template>
    <input
      type="date"
      class="form-control"
      :value="numberValue"
      :placeholder="placeholder"
      @input="$emit('update:numberValue', $event.target.value)"
    />
  </template>
  <script>
  export default {
    name: "inputDate",
    props: ["numberValue", "placeholder"],
  };
  </script>