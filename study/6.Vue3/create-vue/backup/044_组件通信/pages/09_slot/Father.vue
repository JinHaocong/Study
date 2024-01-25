<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Game>
        <template v-slot:content="params">
          <ul>
            <li v-for="y in params.gameList" :key="y.id">
              {{ y.name }}
            </li>
          </ul>
        </template>
        <template v-slot:header>
          <h2>热门游戏列表</h2>
        </template>
      </Game>

      <Game>
        <template v-slot:content="{ imgUrl }">
          <img :src="imgUrl" alt="" />
        </template>
        <template v-slot:header>
          <h2>今日美食城市</h2>
        </template>
      </Game>

      <Game>
        <template #content="{ videoUrl }">
          <video :src="videoUrl" controls></video>
        </template>
        <template v-slot:header>
          <h2>今日影视推荐</h2>
        </template>
      </Game>

      <Game>
        <template #content="{ x, y }">
          <h3>{{ x }}</h3>
          <h3>{{ y }}</h3>
        </template>
        <template v-slot:header>
          <h2>哈哈你好</h2>
        </template>
      </Game>
    </div>
  </div>
</template>

<script lang="ts" name="Father" setup>
import Game from './Game.vue'
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

h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}

img,
video {
  width: 100%;
}
</style>
