<template>
    <input
      type="email"
      class="form-control"
      :value="numberValue"
      :placeholder="placeholder"
      @input="$emit('update:numberValue', $event.target.value)"
    />
  </template>
  <script>
  export default {
    name: "inputEmail",
    props: ["numberValue", "placeholder"],
  };
  </script>