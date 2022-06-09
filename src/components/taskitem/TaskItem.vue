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
        {{
          taskValue.status === "opened"
            ? "Открыто"
            : taskValue.status === "inProgress"
            ? "В работе"
            : taskValue.status === "testing"
            ? "Тестирование"
            : "Сделано"
        }}
      </div>
    </div>
    <div class="item-priority">
      <div class="priority" v-bind:class="taskValue.rank">
        {{
          taskValue.rank === "low"
            ? "низкий"
            : taskValue.rank === "medium"
            ? "средний"
            : "высокий"
        }}
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
              v-show="taskValue.status === 'opened'"
              v-on:click="changeStatus('inProgress')"
            >
              Взять в работу
            </button>
            <button
              class="more-link"
              v-show="taskValue.status === 'inProgress'"
              @click="changeStatus('testing')"
            >
              На тестрование
            </button>
            <button
              class="more-link"
              v-show="
                taskValue.status === 'inProgress' ||
                taskValue.status === 'testing' ||
                taskValue.status === 'complete'
              "
              @click="changeStatus('opened')"
            >
              Переоткрыть
            </button>
            <button
              class="more-link"
              v-show="
                taskValue.status === 'opened' ||
                taskValue.status === 'inProgress' ||
                taskValue.status === 'testing'
              "
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