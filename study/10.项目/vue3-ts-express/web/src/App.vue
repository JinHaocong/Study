<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>

<style></style>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = zhCn
</script>
