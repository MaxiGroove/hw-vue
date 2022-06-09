<template>
  <div class="select" v-on:click="active" v-click-outside="hide">
    <div class="select-wrap" :class="{ 'select-wrap-active': isActive }">
      <div class="select-text">{{ placeholder }}</div>

      <img
        class="select-arrow"
        src="@/assets/images/arrow-up.svg"
        v-if="isActive"
      />
      <img class="select-arrow" src="@/assets/images/arrow-down.svg" v-else />
    </div>

    <div class="select-list" v-show="isActive">
      <div class="select-item" v-for="item in Object.keys(list)" :key="item">
        <input
          class="select-input"
          type="radio"
          v-bind:id="item"
          v-bind:value="item"
          v-model="selectedInput"
        />
        <label class="select-label" v-bind:for="item">{{ list[item] }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      isActive: false,
      selected: this.select,
    };
  },
  props: {
    list: Object,
    placeholder: String,
    select: String,
  },

  computed: {
    selectedInput: {
      get() {
        return this.select;
      },
      set(val) {
        this.selected = val;
        this.$emit("change", val);
      },
    },
  },

  model: {
    prop: "select",
    event: "change",
  },

  methods: {
    active() {
      this.isActive = !this.isActive;
    },
    hide() {
      this.isActive = false;
    },
  },

  watch: {
    select() {
      this.selectedInput = this.select;
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
@import "./select.scss";
</style>