<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Category>
        <template v-slot:content>
          <ul>
            <li v-for="g in games" :key="g.id">{{ g.name }}</li>
          </ul>
        </template>
        <template v-slot:header>
          <h2>热门游戏列表</h2>
        </template>
      </Category>

      <Category>
        <template v-slot:content>
          <img :src="imgUrl" alt="" />
        </template>
        <template v-slot:header>
          <h2>今日美食城市</h2>
        </template>
      </Category>

      <Category>
        <template #content>
          <video :src="videoUrl" controls video></video>
        </template>
        <template #header>
          <h2>今日影视推荐</h2>
        </template>
      </Category>
    </div>
  </div>
</template>

<script lang="ts" name="Father" setup>
import Category from './Category.vue'
import { ref, reactive } from 'vue'

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
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}

.content {
  display: flex;
  justify-content: space-evenly;
}

img,
video {
  width: 100%;
}

h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
