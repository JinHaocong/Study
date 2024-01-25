<template>
  <div class="child1">
    <h3>子组件1</h3>
    <h4>玩具：{{ toy }}</h4>
    <button @click="sendToyToBrother">玩具给弟弟</button>
  </div>
</template>

<script lang="ts" name="Child1" setup>
import { ref, getCurrentInstance } from 'vue'
import emitter from '@/utils/emitter'

// sign 数据
let toy = ref('奥特曼')
const { $emitter } = getCurrentInstance()!.appContext.config.globalProperties
console.log($emitter, '$emitter')
console.log(emitter, 'emitter')
console.log(getCurrentInstance().proxy.$emitter, 'getCurrentInstance()')

// sign 方法
function sendToyToBrother() {
  emitter.emit('send-toy', toy)
}
</script>

<style scoped>
.child1 {
  margin-top: 50px;
  background-color: skyblue;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}

.child1 button {
  margin-right: 10px;
}
</style>
