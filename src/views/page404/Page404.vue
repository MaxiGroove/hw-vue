<template>
  <div class="not-found">
    <span> Page not found error 404 </span>
    <Button class="btn-default">
      <router-link v-bind:to="mainPage">Назад</router-link>
    </Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainPage: {
        name: "Login",
      },
    };
  },
};
</script>

<style>
@import "./page404.scss";
</style>