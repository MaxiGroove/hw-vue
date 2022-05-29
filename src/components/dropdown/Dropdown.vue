<template>
  <div class="dropdown dropdown-active">
    <div class="dropdown-type dropdown-type-rank dropdown-type-active">
      <div class="dropdown-type-text">ранк</div>
      <img class="dropdown-arrow" src="@/assets/images/arrow-up.svg"/>
      <!-- <img class="dropdown-arrow" src="./images/arrow-down.svg" alt="" /> -->
    </div>
    <div class="dropdown-wrap-active dropdown-wrap"></div>
    <div class="dropdown-list-active">
      <Checkbox />
    </div>
  </div>
</template>

<script>
import Checkbox from "../checkbox/Checkbox";

export default {
  components: {
    Checkbox,
  },
};
</script>

<style lang="scss" scoped>
@import "./dropdown.scss";
</style>