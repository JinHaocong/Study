<template>
  <div class="father">
    <h3>父组件</h3>
    <h4 v-show="toy">子给的玩具：{{ toy }}</h4>
    <!-- 给子组件Child绑定事件 -->
    <Child @send-toy="saveToy" />
  </div>
</template>

<script lang="ts" name="Father" setup>
import Child from './Child.vue'
import { ref } from 'vue'
// 数据
let toy = ref('')

// 用于保存传递过来的玩具
function saveToy(value: string, event: Event) {
  console.log(event, 'eventFromChild')

  console.log('saveToy', value)
  toy.value = value
}
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}

.father button {
  margin-right: 5px;
}
</style>
