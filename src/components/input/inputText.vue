<template>
  <input
    type="text"
    class="form-control"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  name: "inputText",
  props: ["modelValue", "placeholder"],
};
</script>