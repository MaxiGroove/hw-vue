<template>
  <div class="pagination">
    <div class="pagination-left">
      <ul class="pagination-items">
        <li class="pagination-item">
          <Button class="btn-pagination btn-back btn-disabled"
            >Назад</Button
          >
        </li>

        <li class="pagination-item">
          <Button
            class="btn-pagination btn-primary"
            >1</Button
          >
        </li>

        <li class="pagination-item">
          <Button
            class="btn-pagination btn-forward btn-default"
            >Вперед</Button
          >
        </li>
      </ul>
    </div>

    <div class="pagination-right">
      <span class="pagination-text">Показано 1 - 1 из 1</span>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
@import "./paging.scss";
</style>