<template>
  <section class="task">
    <div class="task-wrapper">
      <CardHeader>
        <template v-slot:title>Задачи</template>
        <template v-slot:btn>
          <Button class="btn-primary">
            <router-link v-bind:to="addtTask">Добавить задачу</router-link>
          </Button>
        </template>
      </CardHeader>

      <Card>
        <Sorting />
        <CardBoard>
          <TaskItem
            v-for="task in tasks.data"
            :key="task.id"
            :taskValue="task"
          />
        </CardBoard>
        <Paging
          :limit="tasks.limit"
          :total="tasks.total"
          :page="tasks.page"
          @updatePage="updateNewPage"
        />
      </Card>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      addtTask: {
        name: "AddTask",
      },
    };
  },

  computed: {
    ...mapGetters("tasks", ["tasks", "filter"]),
  },

  methods: {
    ...mapActions("tasks", ["fetchTasks", "setFilter"]),
    ...mapActions("users", ["fetchUsers"]),

    updateNewPage(newPage) {
      this.setFilter({
        filter: this.filter.filter,
        page: newPage,
        limit: 10,
      });
    },
  },

  mounted() {
    this.setFilter({
      filter: {},
      page: 0,
      limit: 10,
    });
    this.fetchUsers();
  },
};
</script>

<style>
@import "./tasklist.scss";
</style>