<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>b：{{ b }}</h4>
    <h4>c：{{ c }}</h4>
    <!--sign 两种写法都可以-->
    <GrandChild v-bind="$attrs" />
    <!--    <GrandChild :="$attrs" />-->
  </div>
</template>

<script lang="ts" name="Child" setup>
import GrandChild from './GrandChild.vue'
import { useAttrs } from 'vue'

defineProps(['b', 'c'])

// attrs 是指 父组件传来的 且没有在props中生命的属性 b , c已经声明了 所以attrs中不包含b，c
const attrs = useAttrs()
console.log(attrs, 'attrs')
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
