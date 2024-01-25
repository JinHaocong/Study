<template>
  <div class="category">
    <slot name="header">默认内容1</slot>
    <slot name="content">默认内容2</slot>
  </div>
</template>

<script lang="ts" name="Category" setup></script>

<style scoped>
.category {
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
  width: 200px;
  height: 300px;
}
</style>
