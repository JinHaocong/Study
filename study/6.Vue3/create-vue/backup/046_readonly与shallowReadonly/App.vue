<template>
  <div class="app">
    <h2>当前sum1为：{{ sum1 }}</h2>
    <h2>当前sum2为：{{ sum2 }}</h2>
    <h2>当前car1为：{{ car1 }}</h2>
    <h2>当前car2为：{{ car2 }}</h2>
    <button @click="changeSum1">点我sum1+1</button>
    <button @click="changeSum2">点我sum2+1</button>
    <button @click="changeBrand2">修改品牌(car2)</button>
    <button @click="changeColor2">修改颜色(car2)</button>
    <button @click="changePrice2">修改价格(car2)</button>
    <button @click="changeAll">修改整个car2</button>
  </div>
</template>

<script lang="ts" name="App" setup>
import { ref, reactive, readonly, shallowReadonly } from 'vue'

let sum1 = ref(0)
let sum2 = readonly(sum1)
let car1 = reactive({
  brand: '奔驰',
  options: {
    color: '红色',
    price: 100
  }
})
let car2 = shallowReadonly(car1)

function changeSum1() {
  sum1.value += 1
}

function changeSum2() {
  // error 尝试分配给常量或只读变量
  sum2.value += 1 //sum2是不能修改的
}

function changeBrand2() {
  // error 尝试分配给常量或只读变量
  car2.brand = '宝马'
}

function changeColor2() {
  car2.options.color = '绿色'
}

function changePrice2() {
  car2.options.price += 10
}

function changeAll() {
  const obj = {
    brand: '法拉利',
    options: {
      color: '蓝色',
      price: 10000000
    }
  }
  Object.assign(car2, obj)
}
</script>

<style scoped>
.app {
  background-color: #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}

button {
  margin: 0 5px;
}
</style>
