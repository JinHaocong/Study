<template>
  <div class="game">
    <h2>游戏列表</h2>
    <slot :gameList="games" x="哈哈" y="你好"></slot>
  </div>
</template>

<script lang="ts" name="Game" setup>
import { reactive } from 'vue'

let games = reactive([
  { id: '1', name: '英雄联盟' },
  { id: '2', name: '王者农药' },
  { id: '3', name: '红色警戒' },
  { id: '4', name: '斗罗大陆' }
])
</script>

<style scoped>
.game {
  width: 200px;
  height: 300px;
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
