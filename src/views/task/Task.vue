<template>
  <section class="task">
    <div class="task-wrapper">
      <CardHeader>
        <template v-slot:title>{{ currentTask.title }}</template>
        <template v-slot:status>
          <div class="sts" :class="currentTask.status">{{ statusTask }}</div>
        </template>
        <template v-slot:btn>
          <Button
            class="btn-default mr-left"
            v-show="showInProgress"
            v-on:click="changeStatus('inProgress')"
          >
            Взять в работу
          </Button>
          <Button
            class="btn-default mr-left"
            v-show="showTesting"
            @click="changeStatus('testing')"
          >
            На тестрование
          </Button>
          <Button
            class="btn-default mr-left"
            v-show="showOpened"
            @click="changeStatus('opened')"
          >
            Переоткрыть
          </Button>
          <Button
            class="btn-default mr-left"
            v-show="showComplete"
            @click="changeStatus('complete')"
          >
            Сделано
          </Button>

          <Button class="btn-primary mr-left">
            <router-link v-bind:to="editTask">Редактировать</router-link>
          </Button>
          <Button class="btn-error mr-left" @click="deleteTask">Удалить</Button>
        </template>
      </CardHeader>

      <Card>
        <div class="card">
          <div class="card-column">
            <div class="card-info">
              <div class="card-info-user">
                <div class="card-user">
                  <div class="card-user-title">Исполнитель</div>
                  <div class="card-user-name">
                    {{ usersList[currentTask.assignedId] }}
                  </div>
                </div>
                <div class="card-user">
                  <div class="card-user-title">Автор задачи</div>
                  <div class="card-user-name">
                    {{ usersList[currentTask.userId] }}
                  </div>
                </div>
                <div class="card-user">
                  <div class="card-user-title">Приоритет</div>
                  <div class="card-user-name">{{ rankTask }}</div>
                </div>
                <div class="card-user">
                  <div class="card-user-title">Дата создания</div>
                  <div class="card-user-name">
                    {{ moment(currentTask.dateOfCreation) }}
                  </div>
                </div>
                <div class="card-user">
                  <div class="card-user-title">Дата изменения</div>
                  <div class="card-user-name">
                    {{ moment(currentTask.dateOfUpdate) }}
                  </div>
                </div>
                <div class="card-user">
                  <div class="card-user-title">Затрачено времени</div>
                  <div class="card-user-name">
                    {{ getAllTime }}
                  </div>
                </div>
              </div>
              <Button class="btn-primary" @click="active"
                >Сделать запись о работе</Button
              >
            </div>
          </div>
          <div class="card-column">
            <div class="card-description">
              <div class="card-description-title">Описание</div>
              <p class="card-description-text">{{ currentTask.description }}</p>
            </div>
          </div>
          <div class="card-column">
            <div class="card-comments">
              <form class="card-form">
                <fieldset class="card-field">
                  <label htmlFor="comment" class="card-label"
                    >Комментарии ({{ comments.length }})</label
                  >
                  <Textarea
                    type="text"
                    placeholder="Текст комментария"
                    name="comment"
                    class="textarea textarea-primary card-textarea"
                    v-model="commentForm.text"
                  />
                </fieldset>
                <Button class="btn-success" @click="addComment"
                  >Добавить комментарий</Button
                >

                <div class="card-comment">
                  <div class="card-nocomment" v-show="noComments">
                    Комментарии отсутствуют
                  </div>

                  <div
                    class="card-comment-item"
                    v-for="comment in comments"
                    :key="comment.id"
                  >
                    <div class="card-comment-header">
                      <div class="card-comment-name">
                        {{ usersList[comment.userId] }} ({{
                          moment(comment.dateOfCreation)
                        }})
                      </div>

                      <button
                        class="card-comment-delete"
                        @click="deleteComment(comment.id)"
                        v-show="noDeleteComments === comment.userId"
                      >
                        Удалить
                      </button>
                    </div>
                    <div class="card-comment-text">{{ comment.text }}</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal v-show="isActive">
          <form class="modal-form modal-info" @submit="editWorkTime">
            <div class="modal-title">Запись о работе</div>

            <div class="modal-cmp">
              <div class="modal-cmp-item">
                <label class="modal-cmp-title">Затраченное время</label>
                <Input
                  required
                  name="username"
                  type="text"
                  class="input-primary"
                  v-model="timeForm.timeInMinutes"
                />
              </div>

              <div class="modal-cmp-item">
                <label class="modal-cmp-title">Единица измерения</label>
                <Select :list="timeList" v-model="timeForm.timeType" />
              </div>

              <div class="modal-cmp-item">
                <label class="modal-cmp-title">Комментарий</label>
                <Textarea
                  name="about"
                  type="text"
                  class="textarea textarea-primary"
                  v-model="timeForm.comment"
                ></Textarea>
              </div>
            </div>

            <div class="modal-btn">
              <Button type="submit" class="btn-primary">Сохранить</Button>
              <Button class="btn-default" @click="active">Отмена</Button>
            </div>
          </form>
        </Modal>
      </Card>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import "moment/locale/ru";
import api from "../../api";
import Modal from "../../components/modal/Modal.vue";
export default {
  data() {
    return {
      commentForm: {
        taskId: this.id,
        userId: localStorage.getItem("id"),
        text: "",
      },
      isActive: false,
      editTask: {
        name: "EditTask",
        params: {
          id: this.id,
        },
      },
      timeList: {
        1: "Минута",
        60: "Час",
        1440: "День",
      },
      timeForm: {
        timeInMinutes: "0",
        timeType: "1",
        comment: "",
        currentUser: localStorage.getItem("id"),
      },
    };
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters("tasks", ["currentTask", "comments"]),
    ...mapGetters("users", ["usersList"]),
    noComments() {
      return this.comments.length === 0;
    },
    noDeleteComments() {
      return localStorage.getItem("id");
    },
    statusTask() {
      return this.currentTask.status === "opened"
        ? "Открыто"
        : this.currentTask.status === "inProgress"
        ? "В работе"
        : this.currentTask.status === "testing"
        ? "Тестирование"
        : "Сделано";
    },
    showInProgress() {
      return this.currentTask.status === "opened";
    },
    showTesting() {
      return this.currentTask.status === "inProgress";
    },
    showOpened() {
      return (
        this.currentTask.status === "inProgress" ||
        this.currentTask.status === "testing" ||
        this.currentTask.status === "complete"
      );
    },
    showComplete() {
      return (
        this.currentTask.status === "opened" ||
        this.currentTask.status === "inProgress" ||
        this.currentTask.status === "testing"
      );
    },
    rankTask() {
      return this.currentTask.rank === "low"
        ? "Низкий"
        : this.currentTask.rank === "medium"
        ? "Средний"
        : "Высокий";
    },

    spentInDays() {
      return Math.floor(this.currentTask.timeInMinutes / 1440);
    },
    spentInHours() {
      return Math.floor((this.currentTask.timeInMinutes % 1440) / 60);
    },
    spentInMinutes() {
      return Math.floor(this.currentTask.timeInMinutes % 60);
    },

    spentDays() {
      return this.spentInDays === 1
        ? " день"
        : this.spentInDays > 1 && this.spentInDays < 5
        ? " дня"
        : this.spentInDays === 0 || this.spentInDays >= 5
        ? " дней"
        : "";
    },
    spentHours() {
      return this.spentInHours === 1
        ? " час"
        : this.spentInHours > 1 && this.spentInHours < 5
        ? " часа"
        : this.spentInHours === 0 || this.spentInHours >= 5
        ? " часов"
        : "";
    },
    spentMinutes() {
      return this.spentInMinutes === 1
        ? " минута"
        : this.spentInMinutes > 1 && this.spentInMinutes < 5
        ? " минуты"
        : this.spentInMinutes === 0 || this.spentInMinutes >= 5
        ? " минут"
        : "";
    },
    getAllTime() {
      return `${this.spentInDays} ${this.spentDays} ${this.spentInHours} ${this.spentHours} ${this.spentInMinutes} ${this.spentMinutes}`;
    },
  },
  methods: {
    ...mapActions("tasks", ["getTask", "fetchComments"]),
    ...mapActions("users", ["fetchUsers"]),
    active() {
      this.isActive = !this.isActive;
    },
    moment(data) {
      return moment(data).format("DD.MM.YYYY H:mm");
    },
    deleteComment(id) {
      api.Events.deleteComment(id).then(() => this.fetchComments(this.id));
    },
    addComment(e) {
      e.preventDefault();
      api.Events.addComment(this.commentForm).then(() =>
        this.fetchComments(this.id)
      );
    },
    deleteTask(e) {
      e.preventDefault();
      api.Events.deleteTask(this.currentTask.id).then(() =>
        this.$router.push({ name: "TaskList" })
      );
    },
    changeStatus(value) {
      api.Events.changeStatus(this.currentTask.id, value).then(() =>
        this.getTask(this.id)
      );
    },
    editWorkTime(e) {
      e.preventDefault();
      api.Events.addWorkTime(this.id, {
        timeInMinutes: this.timeForm.timeInMinutes * this.timeForm.timeType,
        comment: this.timeForm.comment,
        currentUser: localStorage.getItem("id"),
      }).then(() => {
        this.getTask(this.id);
        this.fetchComments(this.id);
        this.isActive = false;
      });
    },
  },
  mounted() {
    this.getTask(this.id);
    this.fetchUsers();
    this.fetchComments(this.id);
  },
  components: { Modal },
};
</script>

<style>
@import "./task.scss";
@import "@/components/taskitem/taskitem.scss";
</style>