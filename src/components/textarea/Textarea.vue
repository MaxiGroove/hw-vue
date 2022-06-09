<template>
  <textarea v-model="textarea" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
  data() {
    return {
      textareaValue: this.value,
    };
  },

  props: {
    value: String,
    placeholder: String,
  },

  computed: {
    textarea: {
      get() {
        return this.textareaValue;
      },

      set(val) {
        this.textareaValue = val;
        this.$emit("input", val);
      },
    },
  },

  watch: {
    value() {
      this.textareaValue = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./textarea.scss";
</style>