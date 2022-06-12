<template>
  <section class="login">
    <form class="login__form">
      <h2 class="login__title">Авторизация</h2>

      <div class="login__name">
        <label class="login__label" for="login">Логин</label>
        <Input
          class="input-primary"
          id="login"
          type="text"
          placeholder="Login"
          name="login"
          v-model="loginForm.login"
        />
      </div>

      <div class="login__name">
        <label class="login__label" for="password">Пароль</label>
        <Input
          class="input-primary"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          v-model="loginForm.password"
        />
      </div>

      <Button class="btn-success btn-login" type="submit" @click="handleSubmit"
        >Вход</Button
      >
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        login: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters("users", ["userData"]),
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.login(this.loginForm).then(() => {
        this.$router.push({ name: "TaskList" });
      });
    },
    ...mapActions("users", ["login"]),
  },
};
</script>

<style>
@import "./login.scss";
</style>