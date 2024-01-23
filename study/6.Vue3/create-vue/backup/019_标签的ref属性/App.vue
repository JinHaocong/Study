<template>
  <h2 ref="title2">你好</h2>
  <button @click="showLog">测试</button>
  <Person ref="person" />
</template>

<script lang="ts" name="App" setup>
import Person from './components/Person.vue'
import { ref } from 'vue'

let title2 = ref()
let person = ref()

function showLog() {
  // console.log(title2.value)
  console.log(person.value, 'person')
}
</script>
