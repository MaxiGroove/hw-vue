<template>
  <div class="sorting">
    <form class="sorting-form" v-on:submit="handleFiltred">
      <div class="sort-item">
        <Dropdown
          v-model="filterForm.type"
          v-bind:list="listType"
          v-bind:name="'Тип'"
          v-bind:widthComp="'type'"
        />
      </div>

      <Input
        type="text"
        class="input-primary filter-input"
        placeholder="Название задачи"
        v-model="filterForm.query"
      />

      <div class="sort-item">
        <Dropdown
          v-model="filterForm.assignedUsers"
          v-bind:list="usersList"
          v-bind:name="'Пользователь'"
          v-bind:widthComp="'assignedUsers'"
        />
      </div>

      <div class="sort-item">
        <Dropdown
          v-model="filterForm.status"
          v-bind:list="listStatus"
          v-bind:name="'Статус'"
          v-bind:widthComp="'status'"
        />
      </div>

      <div class="sort-item">
        <Dropdown
          v-model="filterForm.rank"
          v-bind:list="listRank"
          v-bind:name="'Приоритет'"
          v-bind:widthComp="'rank'"
        />
      </div>

      <div class="sort-item">
        <Button class="btn-primary" type="submit">Применить</Button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      filterForm: {
        type: [],
        query: "",
        assignedUsers: [],
        status: [],
        rank: [],
      },
      listType: {
        task: "Задача",
        bug: "Ошибка",
      },
      listStatus: {
        opened: "Открыто",
        inProgress: "В работе",
        testing: "Тестируется",
        complete: "Сделано",
      },
      listRank: {
        low: "Низкий",
        medium: "Средний",
        high: "Высокий",
      },
    };
  },
  computed: {
    ...mapGetters("users", ["usersList"]),
  },
  methods: {
    ...mapActions("tasks", ["setFilter"]),
    handleFiltred(e) {
      e.preventDefault();
      this.setFilter({
        filter: this.filterForm,
        page: 0,
        limit: 10,
      });
    },
  },
};
</script>

<style>
@import "./sorting.scss";
</style>