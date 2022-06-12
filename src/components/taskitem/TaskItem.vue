<template>
  <div class="item">
    <div class="item-type">
      <div class="types" v-bind:class="taskValue.type"></div>
    </div>

    <div class="item-name">
      <router-link v-bind:to="task" class="item-name-text">{{
        taskValue.title
      }}</router-link>
    </div>

    <div class="item-user" v-show="show">
      <div class="item-user-text">{{ usersList[taskValue.assignedId] }}</div>
    </div>

    <div class="item-status">
      <div class="sts" v-bind:class="taskValue.status">
        {{ statusTask }}
      </div>
    </div>
    <div class="item-priority">
      <div class="priority" v-bind:class="taskValue.rank">
        {{ rankTask }}
      </div>
    </div>

    <div class="item-more" v-show="show">
      <div
        class="more"
        v-on:click="active"
        :class="{ 'more-active': isActive }"
      >
        <div class="more-inner" :class="{ 'more-inner-active': isActive }">
          <div class="more-control" v-if="isActive">
            <router-link :to="editTask" class="more-link"
              >Редактировать</router-link
            >
            <button class="more-link more-delete" @click="deleteTask()">
              Удалить
            </button>
            <button
              class="more-link"
              v-show="showInProgress"
              v-on:click="changeStatus('inProgress')"
            >
              Взять в работу
            </button>
            <button
              class="more-link"
              v-show="showTesting"
              @click="changeStatus('testing')"
            >
              На тестрование
            </button>
            <button
              class="more-link"
              v-show="showOpened"
              @click="changeStatus('opened')"
            >
              Переоткрыть
            </button>
            <button
              class="more-link"
              v-show="showComplete"
              @click="changeStatus('complete')"
            >
              Сделано
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import api from "@/api";

export default {
  data() {
    return {
      isActive: false,

      editTask: {
        name: "EditTask",
        params: {
          id: this.taskValue.id,
        },
      },

      task: {
        name: "Task",
        params: {
          id: this.taskValue.id,
        },
      },
    };
  },

  props: {
    show: {
      type: Boolean,
      default: true,
    },
    taskValue: Object,
    user: Object,
  },

  computed: {
    ...mapGetters("tasks", ["filter"]),
    ...mapGetters("users", ["usersList"]),

    rankTask() {
      return this.taskValue.rank === "low"
        ? "низкий"
        : this.taskValue.rank === "medium"
        ? "средний"
        : "высокий";
    },

    statusTask() {
      return this.taskValue.status === "opened"
        ? "Открыто"
        : this.taskValue.status === "inProgress"
        ? "В работе"
        : this.taskValue.status === "testing"
        ? "Тестирование"
        : "Сделано";
    },

    showInProgress() {
      return this.taskValue.status === "opened";
    },

    showTesting() {
      return this.taskValue.status === "inProgress";
    },
    showOpened() {
      return (
        this.taskValue.status === "inProgress" ||
        this.taskValue.status === "testing" ||
        this.taskValue.status === "complete"
      );
    },
    showComplete() {
      return (
        this.taskValue.status === "opened" ||
        this.taskValue.status === "inProgress" ||
        this.taskValue.status === "testing"
      );
    },
  },

  methods: {
    active() {
      this.isActive = !this.isActive;
    },

    changeStatus(value) {
      api.Events.changeStatus(this.taskValue.id, value).then(() =>
        this.fetchTasks(this.filter)
      );
    },

    deleteTask() {
      api.Events.deleteTask(this.taskValue.id).then(() =>
        this.fetchTasks(this.filter)
      );
    },

    ...mapActions("tasks", ["fetchTasks"]),
  },
};
</script>

<style>
@import "./taskitem.scss";
</style>