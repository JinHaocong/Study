<template>
  <div class="child">
    <h2>我是Child组件</h2>
    <h3>当前求和为：{{ sum }}</h3>
    <h4 v-beauty="sum">好开心</h4>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let sum = ref(0)
</script>

<style scoped>
.child {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px;
}
</style>
