<template>
  <div class="col-row">
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: "searchbranche",
  props: ["modelValue", "placeholder"],
};
</script>