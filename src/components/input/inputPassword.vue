<template>
    <input
      type="password"
      class="form-control"
      :value="numberValue"
      :placeholder="placeholder"
      @input="$emit('update:numberValue', $event.target.value)"
    />
  </template>
  <script>
  export default {
    name: "inputPassword",
    props: ["numberValue", "placeholder"],
  };
  </script>