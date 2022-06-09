<template>
  <input v-model="input" :placeholder="placeholder" />
</template>

<script>
export default {
  data() {
    return {
      inputValue: this.value,
    };
  },

  props: {
    value: String,
    placeholder: String,
  },

  computed: {
    input: {
      get() {
        return this.inputValue;
      },
      set(val) {
        this.inputValue = val;
        this.$emit("input", val);
      },
    },
  },

  watch: {
    value() {
      this.inputValue = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./input.scss";
</style>