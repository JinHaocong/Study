<template>
  <div class="person">???</div>
</template>

<script lang="ts" name="Person" setup>
import { type PersonInter, type Persons } from '@/types'

let person: PersonInter = { id: 'jhc01', name: '张三', age: 60 }

let personList: Persons = [
  { id: 'jhc02', name: '张三', age: 60 },
  { id: 'jhc03', name: '李四', age: 18 },
  { id: 'jhc04', name: '王五', age: 5 }
]
console.log(person, personList)
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
