<template>
  <section class="user">
    <div class="user-wrapper">
      <CardHeader>
        <template v-slot:title>Пользователи</template>
      </CardHeader>

      <Card>
        <CardBoard>
          <UserItem
            v-for="user in users.data"
            :key="user.id"
            :userValue="user"
          />
        </CardBoard>
        <Paging />
      </Card>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.fetchUsersFilter({
      filter: {},
      page: 0,
      limit: 0,
    });
  },
  computed: {
    ...mapGetters("users", ["users"]),
  },
  methods: {
    ...mapActions("users", ["fetchUsersFilter"]),
  },
};
</script>

<style>
@import "./userlist.scss";
</style>