<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Game>
        <template v-slot="params: { gameList: GameI[] }">
          <ul>
            <li v-for="y in params.gameList" :key="y.id">
              {{ y.name }}
            </li>
          </ul>
        </template>
      </Game>

      <Game>
        <template v-slot="params: { gameList: GameI[] }">
          <ol>
            <li v-for="item in params.gameList" :key="item.id">
              {{ item.name }}
            </li>
          </ol>
        </template>
      </Game>

      <Game>
        <template #default="{ gameList }">
          <h3 v-for="g in gameList" :key="g.id">{{ g.name }}</h3>
        </template>
      </Game>
    </div>
  </div>
</template>

<script lang="ts" name="Father" setup>
interface GameI {
  id: string
  name: string
}

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

img,
video {
  width: 100%;
}
</style>
