<template>
  <div>{{ a }}</div>
  <button @click="changeA">测试</button>
  <div class="person">
    <ul>
      <li v-for="p in list" :key="p.id">{{ p.name }} -- {{ p.age }}</li>
    </ul>
  </div>
</template>

<script lang="ts" name="Person" setup>
import { withDefaults } from 'vue'
import { type Persons } from '@/types'

// 只接收list
// defineProps(['list'])

// 接收list + 限制类型
// defineProps<{list:Persons}>()

//  接收list + 限制类型 + 限制必要性 + 指定默认值
let { a, list } = withDefaults(defineProps<{ list?: Persons; a: string }>(), {
  list: () => [{ id: '1', name: '康师傅·王麻子·特仑苏', age: 19 }],
  a: 'jhc'
})

console.log(a, 'a')
console.log(list[0].name, 'list')

// 接收list，同时将props保存起来
/* let x = defineProps(['list'])
console.log(x.list) */

function changeA() {
  console.log(a)
}
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
