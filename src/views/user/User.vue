<template>
  <section class="user">
    <div class="user-wrapper">
      <CardHeader>
        <template v-slot:title>{{ userData.username }}</template>
        <template v-slot:btn>
          <Button class="btn-default">
            <router-link v-bind:to="addtTask">Добавить задачу</router-link>
          </Button>
          <Button class="btn-primary mr-left" @click="active" v-show="show"
            >Редактировать</Button
          >
        </template>
      </CardHeader>

      <Card>
        <div class="user-card">
          <div class="user-column">
            <div class="user-info">
              <div class="user-photo">
                <img
                  :src="userData.photoUrl"
                  alt=""
                  class="user-photo-avatar"
                />
              </div>
              <div class="user-about">
                <div class="user-about-title">О себе</div>
                <p class="user-about-text">{{ userData.about }}</p>
              </div>
            </div>
          </div>
          <div class="user-column">
            <div class="user-tasks">
              <CardBoard>
                <TaskItem
                  v-for="task in tasks.data"
                  :key="task.id"
                  :taskValue="task"
                  :show="false"
                />
              </CardBoard>
              <Paging
                :limit="tasks.limit"
                :total="tasks.total"
                :page="tasks.page"
                @updatePage="updateNewPage"
              />
            </div>
          </div>
        </div>
      </Card>

      <Modal v-if="isActive">
        <form class="modal-form modal-info" @submit="editUserData">
          <div class="modal-title">Редактирование пользователя</div>

          <div class="modal-cmp">
            <div class="modal-cmp-item">
              <label class="modal-cmp-title">Имя пользователя</label>
              <Input
                required
                name="username"
                type="text"
                class="input-primary"
                v-model="userForm.username"
              />
            </div>

            <!-- <div class="modal-cmp-item">
            <label class="modal-cmp-title">Пароль</label>
            <Input name="password" type="password" class="input-primary" />
          </div> -->

            <div class="modal-cmp-item">
              <label class="modal-cmp-title">URL фотографии</label>
              <Input
                name="photoUrl"
                type="url"
                class="input-primary"
                placeholder="Введите URL"
                v-model="userForm.photoUrl"
              />
            </div>

            <div class="modal-cmp-item">
              <label class="modal-cmp-title">О себе</label>
              <Textarea
                name="about"
                type="text"
                class="textarea textarea-primary"
                v-model="userForm.about"
              ></Textarea>
            </div>
          </div>

          <div class="modal-btn">
            <Button type="submit" class="btn-primary">Сохранить</Button>
            <Button class="btn-default" @click="active">Отмена</Button>
          </div>
        </form>
      </Modal>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isActive: false,
      userForm: {
        id: this.id,
        login: "",
        username: "",
        about: "",
        photoUrl: "",
        password: "",
      },
      addtTask: {
        name: "AddTask",
        params: {
          assignedId: this.id,
        },
      },
    };
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters("tasks", ["tasks", "filter"]),
    ...mapGetters("users", ["userData"]),
    show() {
      return localStorage.getItem("id") === this.id;
    },
  },
  mounted() {
    this.setFilter({
      filter: {
        assignedUsers: this.id,
      },
      page: 0,
      limit: 5,
    });
    this.getUserData(this.id);
  },
  methods: {
    ...mapActions("tasks", ["setFilter", "fetchTasks"]),
    ...mapActions("users", ["getUserData", "editUser"]),
    active() {
      this.isActive = !this.isActive;
    },
    editUserData(e) {
      e.preventDefault();
      this.editUser(this.userForm);
      this.active();
    },
    updateNewPage(newPage) {
      this.fetchTasks({
        filter: { assignedUsers: this.id },
        page: newPage,
        limit: 5,
      });
    },
  },
  watch: {
    userData() {
      this.userForm = { ...this.userData };
      this.userForm.password = localStorage.getItem("password");
    },
  },
};
</script>

<style>
@import "./user.scss";
</style>