<template>
  <div class="home">
    <img alt="" src="http://www.atguigu.com/images/index_new/logo.png" />
  </div>
</template>

<script lang="ts" name="Home" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* onMounted(()=>{
  setTimeout(()=>{
    router.push('/news')
  },3000)
}) */
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
