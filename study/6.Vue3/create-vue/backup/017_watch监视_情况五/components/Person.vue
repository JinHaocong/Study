<template>
  <div class="person">
    <h1>情况五：监视上述的多个数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" name="Person" setup>
import { reactive, watch } from 'vue'

interface Car {
  c1: string
  c2: string
}

interface Person {
  name: string
  age: number
  car: Car
}

// 数据
let person = reactive<Person>({
  name: '张三',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马'
  }
})

// 方法
function changeName(): void {
  person.name += '~'
}

function changeAge(): void {
  person.age += 1
}

function changeC1(): void {
  person.car.c1 = '奥迪'
}

function changeC2(): void {
  person.car.c2 = '大众'
}

function changeCar(): void {
  person.car = { c1: '雅迪', c2: '爱玛' }
}

// 监视，情况五：监视上述的多个数据
watch(
  [() => person.name, () => person.car],
  ([newName, newCar]: [string, Car], [oldName, oldCar]: [string, Car]) => {
    console.log('变化了', newName, oldName, newCar, oldCar)
  },
  { deep: true }
)
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}

li {
  font-size: 20px;
}
</style>
