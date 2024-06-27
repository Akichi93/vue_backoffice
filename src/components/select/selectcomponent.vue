<!-- MultiselectComponent.vue -->
<template>
    <multiselect
      v-model="internalValue"
      :options="options"
      :multiple="true"
      :placeholder="placeholder"
      :label="labelKey"
      :track-by="trackByKey"
      :custom-label="customLabel"
      :close-on-select="closeOnSelect"
      @input="emitInput"
    ></multiselect>
  </template>
  
  <script>
import Multiselect from "@vueform/multiselect";
  
  export default {
    components: {
      Multiselect,
    },
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      options: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'Sélectionnez une ou plusieurs options',
      },
      labelKey: {
        type: String,
        default: 'name',
      },
      trackByKey: {
        type: String,
        default: 'id',
      },
      customLabel: {
        type: Function,
        default: null,
      },
      closeOnSelect: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        internalValue: [...this.value], // utilise une copie de la valeur initiale pour éviter la mutation directe
      };
    },
    watch: {
      value(newValue) {
        this.internalValue = [...newValue]; // mise à jour de la valeur interne lorsque la valeur prop change
      },
    },
    methods: {
      emitInput() {
        this.$emit('input', this.internalValue); // émet l'événement input avec la valeur interne mise à jour
      },
    },
  };
  </script>
  