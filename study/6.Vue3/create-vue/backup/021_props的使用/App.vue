<template>
  <!-- 务必看懂下面这一行代码 -->
  <!--  <Person ref="qwe" :b="1 + 1" :d="x" a="1+1" c="x">测试</Person>-->

  <Person :list="personList" a="哈哈" />
</template>

<script lang="ts" name="App" setup>
import Person from './components/Person.vue'
import { reactive } from 'vue'
import { type Persons } from '@/types'

// let x = 9

let personList = reactive<Persons>([
  { id: '1', name: '张三', age: 18 },
  { id: '2', name: '李四', age: 20 },
  { id: '3', name: '王五', age: 22 }
])
</script>
