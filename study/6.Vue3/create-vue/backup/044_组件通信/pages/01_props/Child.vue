<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具：{{ toy }}</h4>
    <h4>父给的车：{{ car }}</h4>
    <button @click="sendToyFather">把玩具给父亲</button>
  </div>
</template>

<script lang="ts" name="Child" setup>
import { ref } from 'vue'
// 数据
let toy = ref('奥特曼')
// 声明接收props 父传给子的props时readonly 的
const { car, sendToy } = defineProps(['car', 'sendToy'])

function sendToyFather() {
  sendToy(toy.value)
}
</script>

<style scoped>
.child {
  background-color: skyblue;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
