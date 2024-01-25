<template>
  <div class="game">
    <slot name="header"></slot>
    <slot
      :gameList="games"
      :imgUrl="imgUrl"
      :videoUrl="videoUrl"
      name="content"
      x="哈哈"
      y="你好"
    ></slot>
  </div>
</template>

<script lang="ts" name="Game" setup>
import { reactive, ref } from 'vue'

let games = reactive([
  { id: '1', name: '英雄联盟' },
  { id: '2', name: '王者农药' },
  { id: '3', name: '红色警戒' },
  { id: '4', name: '斗罗大陆' }
])
let imgUrl = ref('https://z1.ax1x.com/2023/11/19/piNxLo4.jpg')
let videoUrl = ref('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')
</script>

<style scoped>
.game {
  width: 200px;
  height: 300px;
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
