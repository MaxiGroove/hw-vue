<template>
  <div class="task-header">
    <div class="task-header-wrap">
      <div class="task-header-left">
        <div class="task-header-title"><slot name="title"></slot></div>
        <div class="status"><slot name="status"></slot></div>
      </div>
      <div class="task-header-right">
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
};
</script>

<style>
@import "./cardheader.scss";
</style>