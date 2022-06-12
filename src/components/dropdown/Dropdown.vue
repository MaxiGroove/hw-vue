<template>
  <div class="dropdown">
    <div class="dropdown-type" :class="widthComp" v-on:click="active">
      <div class="dropdown-type-text">{{ name }}</div>

      <img
        class="dropdown-arrow"
        src="@/assets/images/arrow-up.svg"
        v-if="isActive"
      />
      <img class="dropdown-arrow" src="@/assets/images/arrow-down.svg" v-else />
    </div>
    <div class="dropdown-list" v-if="isActive">
      <Checkbox
        :class="widthComp"
        v-for="item in Object.keys(list)"
        :key="item"
        v-bind:item="item"
        v-model="filterForm"
        @change="handleFiltred"
        >{{ list[item] }}</Checkbox
      >
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      isActive: false,
      filterForm: [],
    };
  },
  props: {
    list: Object,
    name: String,
    widthComp: String,
  },
  watch: {
    filterForm(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    active() {
      this.isActive = !this.isActive;
    },
    hide() {
      this.isActive = false;
    },

    handleFiltred(e) {
      e.target.checked
        ? this.filterForm.push(e.target.value)
        : (this.filterForm = this.filterForm.filter(
            (item) => item != e.target.value
          ));
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
@import "./dropdown.scss";
</style>