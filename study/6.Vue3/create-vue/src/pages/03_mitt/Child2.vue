<template>
  <div class="child2">
    <h3>子组件2</h3>
    <h4>电脑：{{ computer }}</h4>
    <h4>哥哥给的玩具：{{ toy }}</h4>
  </div>
</template>

<script lang="ts" name="Child2" setup>
import { ref, onUnmounted } from 'vue'
import emitter from '@/utils/emitter'
// sign 数据
let computer = ref('联想')
let toy = ref('')

// sign 方法
function setToyValue(value: string) {
  toy.value = value
}

// 给emitter绑定send-toy事件
emitter.on('send-toy', setToyValue)

// 在组件卸载时解绑send-toy事件
onUnmounted(() => {
  emitter.off('send-toy')
})
</script>

<style scoped>
.child2 {
  margin-top: 50px;
  background-color: orange;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
