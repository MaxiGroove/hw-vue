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
        <Paging
          :limit="users.limit"
          :total="users.total"
          :page="users.page"
          @updatePage="updateNewPage"
        />
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
      limit: 10,
    });
  },
  computed: {
    ...mapGetters("users", ["users"]),
  },
  methods: {
    ...mapActions("users", ["fetchUsersFilter"]),

    updateNewPage(newPage) {
      this.fetchUsersFilter({
        filter: {},
        page: newPage,
        limit: 10,
      });
    },
  },
};
</script>

<style>
@import "./userlist.scss";
</style>