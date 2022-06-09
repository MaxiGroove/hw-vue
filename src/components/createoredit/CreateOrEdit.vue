<template>
  <section class="task">
    <div class="task-wrapper">
      <CardHeader>
        <template v-slot:title>{{
          id ? "Редактирование" : "Создание"
        }}</template>
        <template v-slot:btn>
          <Button class="btn-primary" v-on:click="handleSubmit"
            >Сохранить</Button
          >
          <Button class="btn-default mr-left">Отмена</Button>
        </template>
      </CardHeader>

      <Card>
        <form class="form-taskedit">
          <div class="taskedit">
            <div class="taskedit-column">
              <div class="taskedit-status">
                <div class="taskedit-status-item">
                  <label class="taskedit-label">Исполнитель</label>
                  <Select
                    name="assignedId"
                    :list="usersList"
                    placeholder="Исполнитель"
                    v-model="taskForm.assignedId"
                  />
                </div>

                <div class="taskedit-status-item">
                  <label class="taskedit-label">Тип запроса</label>
                  <Select
                    name="type"
                    :list="listType"
                    placeholder="Тип"
                    v-model="taskForm.type"
                  />
                </div>

                <div class="taskedit-status-item">
                  <label class="taskedit-label">Приоритет</label>
                  <Select
                    name="rank"
                    :list="listRank"
                    placeholder="Приоритет"
                    v-model="taskForm.rank"
                  />
                </div>
              </div>
            </div>

            <div class="taskedit-column">
              <div class="taskedit-info">
                <div class="taskedit-info-item">
                  <label class="taskedit-label">Название</label>
                  <Input
                    required
                    type="text"
                    class="taskedit-input input-primary"
                    name="title"
                    v-model="taskForm.title"
                  />
                </div>
                <div class="taskedit-info-item">
                  <label class="taskedit-label">Описание</label>
                  <Textarea
                    required
                    type="text"
                    class="taskedit-textarea textarea textarea-primary"
                    name="description"
                    v-model="taskForm.description"
                  ></Textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import api from "@/api";

export default {
  data() {
    return {
      taskForm: {
        userId: "6273dcd2d09b551dca87629e",
        assignedId: "",
        title: "",
        description: "",
        type: "",
        rank: "",
      },

      listType: {
        task: "Задача",
        bug: "Ошибка",
      },

      listRank: {
        low: "Низкий",
        medium: "Средний",
        high: "Высокий",
      },
    };
  },

  props: {
    id: String,
    assignedId: String,
  },

  mounted() {
    if (this.id) {
      this.getTask(this.id);
    }
    
    if (this.assignedId) {
      this.taskForm.assignedId = this.assignedId;
    }
  },

  computed: {
    ...mapGetters("tasks", ["currentTask"]),
    ...mapGetters("users", ["usersList"]),
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      api.Events.addOrEditTask(this.taskForm).then(() =>
        this.$router.push("/task-list")
      );
    },

    ...mapActions("tasks", ["getTask"]),
  },

  watch: {
    currentTask() {
      this.taskForm = this.currentTask;
    },
  },
};
</script>

<style>
@import "./createoredit.scss";
</style>