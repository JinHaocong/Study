<template>
  <div class="child">
    <h3>我是子组件</h3>
    <GrandChild />
  </div>
</template>

<script lang="ts" name="Child" setup>
import GrandChild from './GrandChild.vue'
// import { inject } from 'vue'
//
// let car = inject('car', { brand: '未知', price: 0 })
// console.log(car, 'car')
//
// let { money, updateMoney } = inject('moneyContext', {
//   money: 0,
//   updateMoney: (param: number) => {
//     console.log(param)
//   }
// })
// console.log(money, 'money')
// console.log(updateMoney, 'updateMoney')
</script>

<style scoped>
.child {
  margin-top: 20px;
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
