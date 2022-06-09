<template>
  <div class="dropdown-checkbox checkbox">
    <div class="">
      <input
        type="checkbox"
        class="checkbox-input"
        v-bind:id="item"
        v-bind:value="item"
        v-on="$listeners"
      />
      <label class="checkbox-label" v-bind:for="item"><slot></slot></label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: String,
  },
  model: {
    event: "changed",
  },
};
</script>

<style lang="scss" scoped>
@import "./checkbox.scss";
</style>