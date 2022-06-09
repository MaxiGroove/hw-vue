<template>
  <router-link :to="user" class="user-item">
    <div class="user-name">{{ userValue.username }}</div>
    <!-- <div class="user-delete" @click="deleteCurrentUser">Удалить</div> -->
  </router-link>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        name: "User",
        params: {
          id: this.userValue.id,
        },
      },
    };
  },
  props: {
    userValue: Object,
  },
  computed: {
    ...mapGetters("users", ["usersFilter"]),
  },

  methods: {
    ...mapActions("users", ["fetchUsers"]),
    deleteCurrentUser() {
      api.Events.deleteUser(this.userValue.id).then(() => {
        this.fetchUsers(this.usersFilter);
      });
    },
  },
};
</script>

<style>
@import "./useritem.scss";
</style>