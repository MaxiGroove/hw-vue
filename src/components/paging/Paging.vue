<template>
  <div class="pagination">
    <div class="pagination-left">
      <ul class="pagination-items">
        <li class="pagination-item">
          <button class="pagination-btn btn-back btn-disabled">Назад</button>
        </li>

        <li class="pagination-item">
          <button class=" pagination-btn btn-primary">1</button>
        </li>

        <li class="pagination-item">
          <button class="pagination-btn btn-forward btn-default">Вперед</button>
        </li>
      </ul>
    </div>

    <div class="pagination-right">
      <span class="pagination-text">Показано 1 - 1 из 1</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "./paging.scss";
</style>