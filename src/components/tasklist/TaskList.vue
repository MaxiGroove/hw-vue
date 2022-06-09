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
        <Paging />
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
    ...mapGetters("tasks", ["tasks"]),
  },

  methods: {
    ...mapActions("tasks", ["setFilter"]),
    ...mapActions("users", ["fetchUsers"]),
  },

  mounted() {
    this.setFilter({
      filter: {},
      page: 0,
      limit: 0,
    });
    this.fetchUsers();
  },

  watch: {},
};
</script>

<style>
@import "./tasklist.scss";
</style>