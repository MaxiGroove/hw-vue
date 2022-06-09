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

      <div class="header-group-link link-disabled">
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

      <div class="header-profile link-disabled">
        <span class="header-profile-name">Username</span>
        <div class="header-profile-photo">
          <img src="" alt="UserAvatar" class="header-profile-avatar" />
        </div>

        <div class="header-profile-menu">
          <router-link v-bind:to="taskList" class="header-profile-view"
            >Посмотреть профиль</router-link
          >
          <button class="header-profile-logout">Выйти из системы</button>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  data() {
    return {
      taskList: {
        name: "TaskList",
      },
      userList: {
        name: "UserList",
      },
    };
  },
};
</script>

<style>
@import "./header.scss";
</style>