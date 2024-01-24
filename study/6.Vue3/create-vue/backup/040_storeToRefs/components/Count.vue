<template>
  <div class="count">
    <h2>当前求和为：{{ sum }}</h2>
    <h3>欢迎来到:{{ school }}，坐落于：{{ address }}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>

<script lang="ts" name="Count" setup>
import { ref, reactive, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
// 引入useCountStore
import { useCountStore } from '@/store/count'
// 使用useCountStore，得到一个专门保存count相关的store
const countStore = useCountStore()

// storeToRefs只会关注 store中数据，不会对方法进行ref包裹
const { sum, school, address } = storeToRefs(countStore)
console.log(storeToRefs(countStore), 'storeToRefs')
console.log(sum.value)

// toRefs 也可以 不过代价太大 会把store中所有的属性全变成响应式
// console.log(toRefs(countStore), 'toRefs')

// 数据
let n = ref(1) // 用户选择的数字
// 方法
function add() {
  countStore.increment(n.value)
}

function minus() {
  countStore.sum -= n.value
}
</script>

<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  margin: 0 5px;
  height: 25px;
}
</style>
