<template>
  <div class="pagination">
    <div class="pagination-left">
      <ul class="pagination-items">
        <li class="pagination-item">
          <Button
            class="btn-pagination btn-back"
            :class="[page === 0 ? 'btn-disabled' : 'btn-default']"
            :disabled="page === 0"
            @click="prevPage"
            >Назад</Button
          >
        </li>

        <li class="pagination-item" v-for="item in pageNumber" :key="item">
          <Button
            class="btn-pagination btn-default"
            :class="{ 'btn-primary': page === item }"
            @click="changePage(item)"
            >{{ item + 1 }}</Button
          >
        </li>

        <li class="pagination-item">
          <Button
            class="btn-pagination btn-forward btn-default"
            :class="[disabled ? 'btn-disabled' : 'btn-default']"
            :disabled="disabled"
            @click="nextPage"
            >Вперед</Button
          >
        </li>
      </ul>
    </div>

    <div class="pagination-right">
      <span class="pagination-text"
        >Показано {{ page === 0 ? "1" : page * limit + 1 }} -
        {{ (page + 1) * limit > total ? total : page * limit + limit }} из
        {{ total }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    limit: Number,
    total: Number,
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.limit);
    },
    disabled() {
      return (
        Math.floor(this.total / this.limit) < this.page + 1 ||
        this.total - (this.page + 1) * this.limit === 0
      );
    },
    pageNumber() {
      const pageNumber = [];

      for (let i = 0; i <= this.pageCount - 1; i++) {
        pageNumber.push(i);
      }
      return pageNumber;
    },
  },
  methods: {
    prevPage() {
      this.$emit("updatePage", this.page - 1);
    },
    nextPage() {
      this.$emit("updatePage", this.page + 1);
    },
    changePage(page) {
      this.$emit("updatePage", page);
    },
  },
};
</script>

<style>
@import "./paging.scss";
</style>