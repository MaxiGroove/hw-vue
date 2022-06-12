<template>
  <section class="main__header">
    <header class="header-wrap">
      <div class="header-logo">
        <img
          src="@/assets/images/logo.png"
          alt="Final Task"
          class="header-logo-img"
        />
      </div>

      <div class="header-group-link link-disabled" v-show="!showOnLogin">
        <router-link
          v-bind:to="taskList"
          class="header-lnk"
          active-class="header-lnk-active"
          >Задачи</router-link
        >
        <router-link
          v-bind:to="userList"
          class="header-lnk"
          active-class="header-lnk-active"
          >Сотрудники</router-link
        >
      </div>

      <div class="header-profile link-disabled" v-show="!showOnLogin">
        <span class="header-profile-name">{{ myData.username }}</span>
        <div class="header-profile-photo">
          <img
            :src="myData.photoUrl"
            alt="UserAvatar"
            class="header-profile-avatar"
          />
        </div>

        <div class="header-profile-menu">
          <router-link v-bind:to="myProfile" class="header-profile-view"
            >Посмотреть профиль</router-link
          >
          <button class="header-profile-logout" @click="logout">
            Выйти из системы
          </button>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      taskList: {
        name: "TaskList",
      },
      userList: {
        name: "UserList",
      },
      myProfile: {
        name: "User",
        params: {
          id: localStorage.getItem("id"),
        },
      },
    };
  },

  computed: {
    showOnLogin() {
      return this.$route.name === "Login";
    },
    ...mapGetters("users", ["myData"]),
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    ...mapActions("users", ["getMyData"]),
  },

  mounted() {
    this.getMyData(localStorage.getItem("id"));
  },
};
</script>

<style>
@import "./header.scss";
</style>